---
name: drawing-to-3d
description: 2D 기계 도면 PDF(경성시험기 도면 양식 등)를 읽어 치수를 해석하고, 3D 모델(STEP/STL)과 미리보기 이미지, Obsidian 도면 해석 노트, SolidCraft 지시문을 만든다. 한 장은 물론 폴더 단위 대량(일괄) 처리도 한다. "도면을 3D로", "PDF 도면 모델링", "STEP 만들어줘", "도면 해석", "도면 일괄 변환", 도면 PDF 첨부와 함께 모델링을 요청할 때 사용.
---

# 도면 PDF → 3D 모델 (drawing-to-3d)

사용자는 문과 출신 영업 부서장이다. 결과 설명은 짧고 쉬운 한국어로, 확인이 필요한 부분은 분명히 표시한다.

## 0. 준비 (세션마다 1회)
```bash
python3 -c "import cadquery" 2>/dev/null || pip install -q cadquery
which pdftoppm   # 없으면: apt-get install -y poppler-utils
```
스크립트 경로: `SK=.claude/skills/drawing-to-3d/scripts` (저장소 루트 기준)

## 1. 도면 읽기
1. PDF를 Read로 연다. 글씨가 작아 치수가 애매하면 고해상도로 바꿔서 부분 확대해 읽는다:
   ```bash
   pdftoppm -r 300 -png 도면.pdf $SCRATCH/page
   python3 -c "from PIL import Image; im=Image.open('$SCRATCH/page-1.png'); w,h=im.size; im.crop((int(w*0.2),int(h*0.4),int(w*0.6),int(h*0.8))).save('$SCRATCH/crop.png')"
   ```
2. 표제란에서 도번·품명·재질·수량·처리·축척·프로젝트·고객·작성일을 뽑는다.
3. 부재표/부품표(예: "사각 파이프 75X75X3.2T 1310L:4EA")와 각 뷰의 치수를 모은다.
4. **치수 검산**: 부분 치수 합 = 전체 치수인지 확인한다(예: 75+1310+75=1460). 안 맞으면 다시 읽고, 그래도 안 맞으면 "확인 필요"로 남긴다.
5. 치수가 없는 부분은 지어내지 않는다. 합리적 가정을 하면 반드시 `assumptions`에 적는다.

## 2. 형상 명세(spec) JSON 작성
좌표계: 단위 mm, X=길이(정면도 가로), Y=깊이(측면도 가로), Z=높이. 원점은 보통 바닥 좌측-전면 모서리. 예시: `examples/A01000_FRAME.json`

```json
{
  "part_no": "A01000", "name": "FRAME", "material": "SS400", "density": 7850,
  "source_pdf": "A01000_FRAME.pdf",
  "origin_note": "원점 설명",
  "assumptions": ["가정 1", "..."],
  "bodies": [
    {"name": "부품명", "color": [0.6,0.62,0.66], "density": 2700,
     "items": [ ...형상... ], "cuts": [ ...절삭... ]}
  ]
}
```
형상 종류 (`items`, `cuts` 공통):
| type | 필드 | 설명 |
|---|---|---|
| `box` | origin[x,y,z], size[dx,dy,dz] | 직육면체 (origin=최소 모서리) |
| `tube` | origin, size, wall, (axis) | 사각/직사각 파이프. 가장 긴 변 방향으로 관통 |
| `cylinder` | center, d, h, axis(X/Y/Z), (wall) | 봉. wall 주면 원형 파이프. center=시작면 중심 |
| `prism` | plane(XY/XZ/YZ), points[[a,b]...], h, offset | 다각형 돌출. XY→Z방향, XZ→Y방향, YZ→X방향, offset=시작 위치 |
| `hole` | center, d, axis, (depth), (both_sides) | 절삭용 구멍. depth 생략 시 관통 |

반복 배치: 어느 형상에나 `"array": {"count":[nx,ny,nz], "pitch":[px,py,pz]}`.
`density`는 body별로 덮어쓸 수 있다(알루미늄 2700, SUS 7930, SS400/S45C 7850).

모델링 원칙:
- 전체 형상, 주요 판·프레임·관통 구멍까지 반영한다. M6 이하 탭, 모따기, 용접 비드, 캐스터 같은 구매품은 생략하고 노트에 적는다.
- 별도 도번이 붙은 부품(예: A01100 상판)은 외곽 형상만 넣고 body 이름에 도번을 붙인다.

## 3. 모델 생성 및 자체 검증
```bash
python3 -B $SK/build_model.py 출력폴더/<도번>.json            # 한 건
python3 -B $SK/build_model.py 폴더/*/*.json                    # 여러 건 (한 건 실패해도 계속 진행)
```
출력: `<도번>_<품명>.step / .stl / _preview.png / _summary.json`

검증 (반드시 수행):
1. summary의 `bbox_mm`이 도면 외곽 치수와 같은지, `valid`가 true인지 본다.
2. `_preview.png`(등각·정면·평면·측면)를 Read로 열어 도면의 각 뷰와 비교한다. 다르면 spec을 고쳐 다시 만든다.
3. 중량은 참고값으로만 쓴다(구멍·탭 생략).

## 4. 결과물 저장
저장소 관례: `inbox/YYYYMMDD_<주제>/` (사용자는 이 폴더들을 Obsidian `경성시험기` 볼트로 옮겨 관리)
- 한 건: `inbox/YYYYMMDD_<도번>_3D모델링/`
- 일괄: `inbox/YYYYMMDD_도면일괄_3D모델링/<도번>/` + 폴더 색인 노트

각 도번 폴더에: spec JSON, STEP, STL, 미리보기 PNG, summary JSON, 그리고 해석 노트 `YYYYMMDD_<도번>_도면해석.md`.
해석 노트 구성 (예시: `inbox/20261022_A01000_FRAME_3D모델링/` 의 노트):
1. YAML 머리말 (date, project, customer, drawing, tags)
2. `![[미리보기.png]]`
3. 도면 기본 정보 표 → 외곽 치수 표 → 부재/부품표 + 치수 검산 결과
4. 모델에 반영하지 않은 가공 (탭, 공차, 별도 도번)
5. **모델 가정 사항 (설계 확인 필요)** — 번호 목록
6. 파일 목록과 용도 (STEP=설계·고객 전달, STL=3D 프린팅/뷰어)
7. **SolidCraft 에이전트 채팅용 지시문** — 좌표가 들어간 번호 목록 문장. 사용자가 SolidCraft 채팅창에 그대로 붙여넣는다.

## 5. 대량(일괄) 작업 절차
1. 대상 PDF 목록을 먼저 보여주고 건수를 확인한다(`ls *.pdf`, `pdfinfo`로 페이지 수). PDF 한 파일에 여러 장이면 장마다 도번 하나로 본다.
2. 조립도(부품표가 있고 여러 도번을 참조)와 부품도를 구분한다. 부품도를 먼저, 조립도는 마지막에 한다.
3. 한 건씩 1~3단계를 수행하고 진행 상황을 짧게 알린다("3/12 A01200 완료"). 한 건이 막히면 "보류" 사유를 적고 다음으로 넘어간다.
4. 모두 끝나면 색인 노트를 만든다:
   ```bash
   python3 -B $SK/make_index.py inbox/YYYYMMDD_도면일괄_3D모델링 --failed "A01500: 단면도 판독 불가"
   ```
5. 커밋·푸시하고, 사용자에게 처리 건수, 보류 건과 사유, 확인이 필요한 가정만 요약해서 보고한다.
6. 20건이 넘으면 사용자에게 먼저 알리고, 사용자가 원하면 하위 에이전트로 나눠 병렬 처리한다.

## 주의
- 도면은 회사·고객 자료다. 외부 서비스에 올리지 않는다.
- 판독이 불확실한 치수는 노트에 "확인 필요"로 표시하고, 추측값을 확정값처럼 쓰지 않는다.
- 결과 보고 끝에 "설계 담당자 검토 후 사용" 문구를 넣는다.
