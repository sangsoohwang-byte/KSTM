#!/usr/bin/env python3
"""형상 명세(spec) JSON → SolidCraft 에이전트 채팅용 지시문(.txt). cadquery 불필요.

사용법:
    python3 make_prompt.py SPEC.json [SPEC2.json ...]

출력: spec 옆에 <part_no>_<name>_SolidCraft지시문.txt, 그리고 화면에 외곽 치수(검산용).
"""
import json
import sys
from pathlib import Path

AX = "XYZ"


def f(v):
    return f"{v:g}"


def rng(a, b):
    return f"{f(a)}~{f(b)}"


def expand(it):
    arr = it.get("array")
    if not arr:
        return [(0, 0, 0)]
    c = (list(arr["count"]) + [1, 1, 1])[:3]
    p = (list(arr["pitch"]) + [0, 0, 0])[:3]
    return [(i * p[0], j * p[1], k * p[2]) for i in range(c[0]) for j in range(c[1]) for k in range(c[2])]


def extent(it, d):
    """형상 하나의 [min,max] x3 (반복 위치 d 적용)."""
    t = it["type"]
    if t in ("box", "tube"):
        o, s = it["origin"], it["size"]
        return [(o[i] + d[i], o[i] + d[i] + s[i]) for i in range(3)]
    if t in ("cylinder", "hole"):
        c, r = it["center"], it["d"] / 2
        k = AX.index(it.get("axis", "Z"))
        h = it.get("h", it.get("depth", 0))
        out = [(c[i] + d[i] - r, c[i] + d[i] + r) for i in range(3)]
        out[k] = (c[k] + d[k], c[k] + d[k] + h)
        return out
    if t == "prism":
        a, b, n = {"XY": (0, 1, 2), "XZ": (0, 2, 1), "YZ": (1, 2, 0)}[it.get("plane", "XY")]
        pa = [p[0] for p in it["points"]]
        pb = [p[1] for p in it["points"]]
        off = it.get("offset", 0)
        out = [None] * 3
        out[a] = (min(pa) + d[a], max(pa) + d[a])
        out[b] = (min(pb) + d[b], max(pb) + d[b])
        out[n] = (off + d[n], off + d[n] + it["h"])
        return out
    raise ValueError(t)


def describe(it, d):
    t = it["type"]
    e = extent(it, d)
    pos = ", ".join(f"{AX[i]}={rng(*e[i])}" for i in range(3))
    if t == "box":
        return f"직육면체 {' x '.join(f(v) for v in it['size'])} → {pos}"
    if t == "tube":
        s = sorted(it["size"])
        return f"속이 빈 사각 파이프 {f(s[0])}x{f(s[1])}x{f(it['wall'])}t 길이 {f(s[2])} → {pos}"
    if t == "cylinder":
        kind = f"원형 파이프 Ø{f(it['d'])}x{f(it['wall'])}t" if it.get("wall") else f"원기둥 Ø{f(it['d'])}"
        c = [it["center"][i] + d[i] for i in range(3)]
        return f"{kind} 길이 {f(it['h'])}, {it.get('axis', 'Z')}축 방향, 시작면 중심 ({', '.join(f(v) for v in c)})"
    if t == "prism":
        pl = it.get("plane", "XY")
        n = {"XY": "Z", "XZ": "Y", "YZ": "X"}[pl]
        pts = " → ".join(f"({f(p[0] + d[AX.index(pl[0])])},{f(p[1] + d[AX.index(pl[1])])})" for p in it["points"])
        return f"{pl} 평면 다각형 {pts} 을 {n}방향 {rng(*e[AX.index(n)])} 로 돌출"
    if t == "hole":
        c = [it["center"][i] + d[i] for i in range(3)]
        depth = f"깊이 {f(it['depth'])}" if it.get("depth") else "관통"
        return f"구멍 Ø{f(it['d'])} {depth}, {it.get('axis', 'Z')}축 방향, 중심 ({', '.join(f(v) for v in c)})"
    raise ValueError(t)


def make(spec_path):
    sp = Path(spec_path)
    spec = json.loads(sp.read_text(encoding="utf-8"))
    lines = [f"{spec.get('material', '')} {spec['part_no']} {spec.get('name', '')} 을(를) 모델링해줘.".strip(),
             f"단위 mm. {spec.get('origin_note', '원점은 좌측-전면-바닥 모서리, X=길이 Y=깊이 Z=높이')}.",
             "아래 좌표는 각 형상의 최소~최대 범위야. 부품(body)마다 별도 바디로 만들어줘.", ""]
    lo, hi, n = [1e18] * 3, [-1e18] * 3, 1
    for body in spec["bodies"]:
        lines.append(f"[{body['name']}]")
        for it in body.get("items", []):
            ds = expand(it)
            note = f" ({it['note']})" if it.get("note") else ""
            lines.append(f"{n}) {len(ds)}개{note}:" if len(ds) > 1 else f"{n}){note}")
            for d in ds:
                lines.append(f"   - {describe(it, d)}")
                e = extent(it, d)
                lo = [min(lo[i], e[i][0]) for i in range(3)]
                hi = [max(hi[i], e[i][1]) for i in range(3)]
            n += 1
        cuts = body.get("cuts", [])
        if cuts:
            lines.append("   절삭:")
            for it in cuts:
                for d in expand(it):
                    lines.append(f"   - {describe(it, d)}")
        lines.append("")
    size = [hi[i] - lo[i] for i in range(3)]
    lines += [f"완성 후 전체 외곽이 {' x '.join(f(v) for v in size)} mm 인지 measure로 확인하고,",
              f"STEP 파일로 {spec['part_no']}_{spec.get('name', 'PART')}.step 이름으로 저장해줘."]
    out = sp.with_name(f"{spec['part_no']}_{spec.get('name', 'PART')}_SolidCraft지시문.txt".replace(" ", "_"))
    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    # 지시문만 모드일 때 make_index.py 가 읽을 요약 (전체 모드 요약이 있으면 덮어쓰지 않음)
    summ = sp.with_name(f"{spec['part_no']}_{spec.get('name', 'PART')}_summary.json".replace(" ", "_"))
    if not summ.exists():
        summ.write_text(json.dumps({"part_no": spec["part_no"], "name": spec.get("name"), "bbox_mm": size,
                                    "total_mass_kg": None, "valid": None, "mode": "지시문만",
                                    "files": [out.name]}, ensure_ascii=False, indent=2), encoding="utf-8")
    return out, size


if __name__ == "__main__":
    for p in sys.argv[1:]:
        try:
            out, size = make(p)
            print(json.dumps({"spec": p, "prompt": str(out), "bbox_mm": size}, ensure_ascii=False))
        except Exception as e:
            print(json.dumps({"spec": p, "error": f"{type(e).__name__}: {e}"}, ensure_ascii=False))
