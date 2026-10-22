#!/usr/bin/env python3
"""일괄 작업 폴더의 *_summary.json 을 모아 Obsidian 색인 노트(.md)를 만든다.

사용법:
    python3 make_index.py BATCH_DIR [--title 제목] [--failed "도번: 사유" ...]
"""
import argparse
import datetime
import json
from pathlib import Path

ap = argparse.ArgumentParser()
ap.add_argument("batch_dir")
ap.add_argument("--title", default="도면 일괄 3D 모델링")
ap.add_argument("--failed", nargs="*", default=[], help='"도번: 사유" 형식')
a = ap.parse_args()

root = Path(a.batch_dir)
rows = []
for f in sorted(root.glob("**/*_summary.json")):
    s = json.loads(f.read_text(encoding="utf-8"))
    rel = f.parent.relative_to(root).as_posix()
    stem = f.name[: -len("_summary.json")]
    note = next(iter(sorted(f.parent.glob("*.md"))), None)
    link = f"[[{note.stem}]]" if note else "-"
    bb = " × ".join(f"{v:g}" for v in s["bbox_mm"])
    ok = "✔" if s.get("valid") else "⚠ 형상 오류"
    rows.append(f"| {s['part_no']} | {s.get('name', '')} | {bb} | {s['total_mass_kg']:g} | {ok} | "
                f"`{rel}/{stem}.step` | {link} |")

today = datetime.date.today().isoformat()
lines = [
    "---", f"date: {today}", "tags: [도면해석, 3D모델링, 일괄작업]", "---", "",
    f"# {a.title}", "",
    f"- 처리 완료: **{len(rows)}건**" + (f" / 실패: **{len(a.failed)}건**" if a.failed else ""), "",
    "| 도번 | 품명 | 외곽 (mm) | 중량 (kg) | 형상 | STEP | 노트 |",
    "|---|---|---|---|---|---|---|",
    *rows,
]
if a.failed:
    lines += ["", "## 실패 / 보류", *[f"- {x}" for x in a.failed]]
lines += ["", "> 중량은 모델 체적 × 밀도 계산값(탭·소형 구멍 생략)이며 참고용입니다.", ""]

out = root / f"{root.name}_색인.md"
out.write_text("\n".join(lines), encoding="utf-8")
print(out)
