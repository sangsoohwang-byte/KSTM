#!/usr/bin/env python3
"""JSON 형상 명세(spec) → STEP / STL / 미리보기 PNG / 요약 JSON.

사용법:
    python3 build_model.py SPEC.json [SPEC2.json ...] [--out DIR]

출력 (spec 파일과 같은 폴더, 또는 --out):
    <part_no>_<name>.step         부품(body)별 색상이 들어간 어셈블리
    <part_no>_<name>.stl          전체 합친 메쉬
    <part_no>_<name>_preview.png  등각도 / 정면도 / 평면도 / 측면도
    <part_no>_<name>_summary.json 외곽 치수, body별 체적·중량

명세 형식은 ../SKILL.md 의 "형상 명세(spec) 형식" 참고.
"""
import argparse
import json
import math
import sys
from pathlib import Path

try:
    import cadquery as cq
except ImportError:
    sys.exit("cadquery가 없습니다: pip install cadquery")

AXES = {"X": (1, 0, 0), "Y": (0, 1, 0), "Z": (0, 0, 1)}
DEFAULT_COLORS = [(0.6, 0.62, 0.66), (0.62, 0.72, 0.85), (0.3, 0.3, 0.3),
                  (0.85, 0.65, 0.4), (0.55, 0.75, 0.55), (0.8, 0.5, 0.5)]


def _box(origin, size):
    return cq.Workplane().box(*size, centered=False).translate(tuple(origin))


def _tube(it):
    """사각/직사각 파이프. 가장 긴 변(또는 axis) 방향으로 관통."""
    o, s, w = it["origin"], it["size"], it["wall"]
    ax = it.get("axis") or "XYZ"[max(range(3), key=lambda i: s[i])]
    k = "XYZ".index(ax)
    inner = [v - 2 * w for v in s]
    inner[k] = s[k]
    off = [w, w, w]
    off[k] = 0
    return _box(o, s).cut(_box([o[i] + off[i] for i in range(3)], inner))


def _cylinder(it):
    """원기둥(봉) 또는 원형 파이프(wall 지정). center = 시작면 중심."""
    ax = it.get("axis", "Z")
    c = it["center"]
    solid = cq.Solid.makeCylinder(it["d"] / 2, it["h"], cq.Vector(*c), cq.Vector(*AXES[ax]))
    wp = cq.Workplane().add(solid)
    if it.get("wall"):
        hole = cq.Solid.makeCylinder(it["d"] / 2 - it["wall"], it["h"], cq.Vector(*c), cq.Vector(*AXES[ax]))
        wp = wp.cut(cq.Workplane().add(hole))
    return wp


def _prism(it):
    """다각형 돌출. plane XY(높이 Z) / XZ(높이 Y) / YZ(높이 X). offset = 시작 위치."""
    plane = it.get("plane", "XY")
    pts = [tuple(p) for p in it["points"]]
    h = it["h"]
    off = it.get("offset", 0)
    if plane == "XY":
        return cq.Workplane("XY").workplane(offset=off).polyline(pts).close().extrude(h)
    if plane == "XZ":  # points=(x,z), Y 방향으로 off ~ off+h
        wp = cq.Workplane("XZ").workplane(offset=-off).polyline(pts).close().extrude(-h)
        return wp
    if plane == "YZ":  # points=(y,z), X 방향으로 off ~ off+h
        return cq.Workplane("YZ").workplane(offset=off).polyline(pts).close().extrude(h)
    raise ValueError(f"unknown plane {plane}")


def _hole(it):
    """관통/깊이 구멍(절삭용 원기둥). center = 구멍 시작면 중심, axis 방향으로 depth."""
    it = dict(it)
    it["h"] = it.get("depth", 10000)
    d = it["center"]
    if it.get("both_sides"):
        ax = it.get("axis", "Z")
        k = "XYZ".index(ax)
        d = list(d)
        d[k] -= it["h"] / 2
        it["center"] = d
    return _cylinder(it)


BUILDERS = {"box": lambda it: _box(it["origin"], it["size"]), "tube": _tube,
            "cylinder": _cylinder, "prism": _prism, "hole": _hole}


def _shift(it, dv):
    it = dict(it)
    for key in ("origin", "center"):
        if key in it:
            it[key] = [it[key][i] + dv[i] for i in range(3)]
    if it.get("type") == "prism":
        plane = it.get("plane", "XY")
        a, b, n = {"XY": (0, 1, 2), "XZ": (0, 2, 1), "YZ": (1, 2, 0)}[plane]
        it["points"] = [[p[0] + dv[a], p[1] + dv[b]] for p in it["points"]]
        it["offset"] = it.get("offset", 0) + dv[n]
    return it


def _expand(it):
    """array: {"count":[nx,ny,nz], "pitch":[px,py,pz]} 로 반복 배치."""
    arr = it.get("array")
    if not arr:
        return [it]
    cnt = (list(arr["count"]) + [1, 1, 1])[:3]
    pit = (list(arr["pitch"]) + [0, 0, 0])[:3]
    out = []
    for i in range(cnt[0]):
        for j in range(cnt[1]):
            for k in range(cnt[2]):
                out.append(_shift(it, [i * pit[0], j * pit[1], k * pit[2]]))
    return out


def build_body(body):
    shape = None
    for raw in body.get("items", []):
        for it in _expand(raw):
            s = BUILDERS[it["type"]](it)
            shape = s if shape is None else shape.union(s)
    if shape is None:
        raise ValueError(f"body {body.get('name')} has no items")
    for raw in body.get("cuts", []):
        for it in _expand(raw):
            shape = shape.cut(BUILDERS[it["type"]](it))
    return shape


def _shade(P, col, light=(-0.4, -0.6, 0.7)):
    """삼각형 법선과 광원 방향으로 면 밝기 계산 (형상 판독용 단순 음영)."""
    import numpy as np
    T = np.asarray(P, dtype=float)
    n = np.cross(T[:, 1] - T[:, 0], T[:, 2] - T[:, 0])
    n /= np.linalg.norm(n, axis=1, keepdims=True) + 1e-12
    L = np.asarray(light) / np.linalg.norm(light)
    k = 0.45 + 0.55 * np.abs(n @ L)
    return np.clip(np.outer(k, col), 0, 1)


def render(bodies, path, title):
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    from mpl_toolkits.mplot3d.art3d import Poly3DCollection

    meshes = []
    lo, hi = [math.inf] * 3, [-math.inf] * 3
    for (name, shp, col) in bodies:
        verts, tris = shp.val().tessellate(0.5, 0.3)
        P = [[(verts[a].x, verts[a].y, verts[a].z) for a in t] for t in tris]
        meshes.append((P, col))
        bb = shp.val().BoundingBox()
        lo = [min(lo[0], bb.xmin), min(lo[1], bb.ymin), min(lo[2], bb.zmin)]
        hi = [max(hi[0], bb.xmax), max(hi[1], bb.ymax), max(hi[2], bb.zmax)]
    span = [max(hi[i] - lo[i], 1e-3) for i in range(3)]
    views = [("ISO", 25, -55), ("FRONT (X-Z)", 0, -90), ("TOP (X-Y)", 90, -90), ("SIDE (Y-Z)", 0, 0)]
    fig = plt.figure(figsize=(14, 10))
    for n, (vt, el, az) in enumerate(views):
        ax = fig.add_subplot(2, 2, n + 1, projection="3d", proj_type="ortho" if n else "persp")
        for P, col in meshes:
            ax.add_collection3d(Poly3DCollection(P, facecolors=_shade(P, col), edgecolors="none"))
        ax.set_xlim(lo[0], hi[0]); ax.set_ylim(lo[1], hi[1]); ax.set_zlim(lo[2], hi[2])
        ax.set_box_aspect(span)
        ax.view_init(el, az)
        ax.set_axis_off()
        ax.set_title(vt, fontsize=11)
    fig.suptitle(f"{title}   {span[0]:.1f} x {span[1]:.1f} x {span[2]:.1f} mm", fontsize=13)
    plt.tight_layout()
    plt.savefig(path, dpi=100)
    plt.close(fig)


def build(spec_path, out_dir=None):
    spec = json.loads(Path(spec_path).read_text(encoding="utf-8"))
    out = Path(out_dir or Path(spec_path).parent)
    out.mkdir(parents=True, exist_ok=True)
    stem = f"{spec['part_no']}_{spec.get('name', 'PART')}".replace(" ", "_")
    density = spec.get("density", 7850)  # kg/m3

    asm = cq.Assembly(name=stem)
    rendered, summary_bodies, total = [], [], None
    for i, body in enumerate(spec["bodies"]):
        shp = build_body(body)
        col = tuple(body.get("color") or DEFAULT_COLORS[i % len(DEFAULT_COLORS)])
        asm.add(shp, name=body["name"], color=cq.Color(*col))
        rendered.append((body["name"], shp, col))
        vol = shp.val().Volume()
        rho = body.get("density", density)
        summary_bodies.append({"name": body["name"], "volume_mm3": round(vol, 1),
                               "mass_kg": round(vol * 1e-9 * rho, 2)})
        total = shp if total is None else total.union(shp)

    asm.export(str(out / f"{stem}.step"))
    cq.exporters.export(total, str(out / f"{stem}.stl"))
    render(rendered, out / f"{stem}_preview.png", stem)

    bb = total.val().BoundingBox()
    summary = {"part_no": spec["part_no"], "name": spec.get("name"),
               "bbox_mm": [round(bb.xlen, 2), round(bb.ylen, 2), round(bb.zlen, 2)],
               "bodies": summary_bodies,
               "total_mass_kg": round(sum(b["mass_kg"] for b in summary_bodies), 2),
               "valid": bool(total.val().isValid()),
               "files": [f"{stem}.step", f"{stem}.stl", f"{stem}_preview.png"]}
    (out / f"{stem}_summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
    return summary


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("specs", nargs="+")
    ap.add_argument("--out")
    a = ap.parse_args()
    failed = 0
    for sp in a.specs:
        try:
            print(json.dumps(build(sp, a.out), ensure_ascii=False))
        except Exception as e:  # 일괄 처리 중 한 건 실패가 전체를 멈추지 않도록
            failed += 1
            print(json.dumps({"spec": sp, "error": f"{type(e).__name__}: {e}"}, ensure_ascii=False))
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
