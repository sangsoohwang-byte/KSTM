# A01000 FRAME (커넥터 삽발 내구시험기, K0797) - 단순화 3D 모델
# 단위 mm, 원점: 프레임 좌측-전면-바닥, X=길이(1460) Y=깊이(560) Z=높이
import cadquery as cq

T = 75.0        # 사각 파이프 75x75
WALL = 3.2      # 두께 3.2t
L, D = 1460.0, 560.0
FOOT = 12.0     # A01300 받침판 두께
LEG = 548.0     # 다리 길이
TOP_T = 40.0    # A01100 상판 두께
TOP_L, TOP_D = 1500.0, 600.0
FOOT_W = T + 20 # 받침판 95x95 (도면에서 외측 10mm 돌출, 내측은 가정)

def tube(x0, y0, z0, dx, dy, dz):
    """축 방향(가장 긴 변)으로 뚫린 75x75x3.2t 사각 파이프"""
    outer = cq.Workplane().box(dx, dy, dz, centered=False)
    ax = max((dx, "X"), (dy, "Y"), (dz, "Z"))[1]
    i = 2 * WALL
    idim = {"X": (dx, dy - i, dz - i), "Y": (dx - i, dy, dz - i), "Z": (dx - i, dy - i, dz)}[ax]
    off = {"X": (0, WALL, WALL), "Y": (WALL, 0, WALL), "Z": (WALL, WALL, 0)}[ax]
    inner = cq.Workplane().box(*idim, centered=False).translate(off)
    return outer.cut(inner).translate((x0, y0, z0))

z_bot = FOOT
z_top = FOOT + LEG
xs_end = [0.0, L - T]
ys_side = [0.0, D - T]
x_mid = (L - T) / 2  # 617.5 + 75 = 692.5

parts = []
# 다리 548L x4
for x in xs_end:
    for y in ys_side:
        parts.append(tube(x, y, z_bot, T, T, LEG))
# 길이방향 레일 1310L x4 (상/하, 전/후)
for y in ys_side:
    for z in (z_bot, z_top - T):
        parts.append(tube(T, y, z, L - 2 * T, T, T))
# 깊이방향 레일 410L x6 (양끝 상/하 4 + 중앙 상/하 2)
for x in xs_end + [x_mid]:
    for z in (z_bot, z_top - T):
        parts.append(tube(x, T, z, T, D - 2 * T, T))
# 중앙 기둥 398L x2 (전/후)
for y in ys_side:
    parts.append(tube(x_mid, y, z_bot + T, T, T, LEG - 2 * T))

frame = parts[0]
for p in parts[1:]:
    frame = frame.union(p)

# A01300 받침판 x4
feet = None
for x in xs_end:
    for y in ys_side:
        f = cq.Workplane().box(FOOT_W, FOOT_W, FOOT, centered=False).translate((x - 10, y - 10, 0))
        feet = f if feet is None else feet.union(f)

# A01100 상판 (구멍 생략, 별도 도면)
top = cq.Workplane().box(TOP_L, TOP_D, TOP_T, centered=False).translate(
    (-(TOP_L - L) / 2, -(TOP_D - D) / 2, z_top))

asm = cq.Assembly(name="A01000_FRAME")
asm.add(frame, name="FRAME_SQ75x75x3.2", color=cq.Color(0.55, 0.55, 0.55))
asm.add(feet, name="A01300_FOOT_PLATE", color=cq.Color(0.3, 0.3, 0.3))
asm.add(top, name="A01100_TOP_PLATE", color=cq.Color(0.7, 0.78, 0.87))

if __name__ == "__main__":
    import sys
    out = sys.argv[1] if len(sys.argv) > 1 else "."
    asm.export(f"{out}/A01000_FRAME.step")
    cq.exporters.export(frame.union(feet).union(top), f"{out}/A01000_FRAME.stl")
    bb = frame.union(feet).union(top).val().BoundingBox()
    print(f"외곽 {bb.xlen:.1f} x {bb.ylen:.1f} x {bb.zlen:.1f} mm")
    print(f"파이프 중량 {frame.val().Volume()/1e9*7850:.1f} kg (SS400 7850kg/m3, 상판/받침판 제외)")
