# 경성시험기(주) 견적서+견적BOM 엑셀 자동 생성 스크립트 v2
# 판매단가=사입단가x1.4, 금액=수량x단가 를 모두 엑셀 수식으로 처리
import argparse, json, os
from datetime import date, datetime
from openpyxl import Workbook
from openpyxl.styles import Font, Alignment, PatternFill, Border, Side
from openpyxl.utils import get_column_letter

# ── 색상 팔레트 ─────────────────────────────────────────────
HEADER_FILL  = PatternFill("solid", fgColor="1F4E79")
SUBHDR_FILL  = PatternFill("solid", fgColor="BDD7EE")
SELL_HDR     = PatternFill("solid", fgColor="2E75B6")
BUY_HDR      = PatternFill("solid", fgColor="C55A11")
SELL_FILL    = PatternFill("solid", fgColor="DDEEFF")
BUY_FILL     = PatternFill("solid", fgColor="FFF0D0")
ODD_FILL     = PatternFill("solid", fgColor="FFFFFF")
EVEN_FILL    = PatternFill("solid", fgColor="F5F5F5")
TOTAL_FILL   = PatternFill("solid", fgColor="FFF2CC")
CAT_FILL     = PatternFill("solid", fgColor="D9E1F2")

THIN   = Side(style="thin")
MEDIUM = Side(style="medium")
def bd():  return Border(left=THIN,   right=THIN,   top=THIN,   bottom=THIN)
def bmd(): return Border(left=MEDIUM, right=MEDIUM, top=MEDIUM, bottom=MEDIUM)

NUM = '#,##0'
MG  = "맑은 고딕"


def num_to_kor(n: int) -> str:
    if n == 0: return "영원정"
    units  = ["", "만", "억", "조"]
    digits = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"]
    pos    = ["", "십", "백", "천"]
    result, unit_idx = "", 0
    while n > 0:
        chunk = n % 10000
        if chunk:
            s = ""
            for i, d in enumerate(str(chunk).zfill(4)):
                if int(d): s += digits[int(d)] + pos[3 - i]
            result = s + units[unit_idx] + result
        n //= 10000; unit_idx += 1
    return result + "원정"


# ════════════════════════════════════════════════════════
# Sheet 1 : 견적서
# ════════════════════════════════════════════════════════
def make_quotation_sheet(ws, info: dict, total_ref: str):
    """
    total_ref : 견적BOM 시트의 판매 합계 셀 참조 (예: "='견적BOM'!I99")
    """
    ws.title = "견적서"
    for i, w in enumerate([4, 30, 6, 14, 14, 18, 16], 1):
        ws.column_dimensions[get_column_letter(i)].width = w

    def mc(r1, c1, r2, c2, val="", bold=False, size=10, ha="center",
           fill=None, color="000000", border=True, wrap=False, formula=False):
        ws.merge_cells(start_row=r1, start_column=c1, end_row=r2, end_column=c2)
        cell = ws.cell(row=r1, column=c1, value=val)
        cell.font = Font(bold=bold, size=size, name=MG, color=color)
        cell.alignment = Alignment(horizontal=ha, vertical="center", wrap_text=wrap)
        if fill: cell.fill = fill
        if border:
            b = bd()
            for r in range(r1, r2+1):
                for c in range(c1, c2+1):
                    ws.cell(r, c).border = b
        return cell

    # 타이틀
    mc(1,1,2,7, "見  積  書", bold=True, size=20, fill=HEADER_FILL, color="FFFFFF")
    ws.row_dimensions[1].height = 20; ws.row_dimensions[2].height = 20

    # 견적번호/날짜
    q_date = info.get("date", str(date.today()))
    try: d = datetime.strptime(q_date, "%Y-%m-%d")
    except: d = date.today()
    mc(3,1,3,3, f"견적번호 : {info.get('quote_no','')}", ha="left", bold=True, border=False)
    mc(4,1,4,3, f"{d.year}년  {d.month}월  {d.day}일", ha="center", bold=True, border=False)
    for r in [3,4]: ws.row_dimensions[r].height = 16

    # 수신
    ws.row_dimensions[6].height = 26
    mc(6,1,6,7, f"◈  수  신 :  {info.get('customer','')}  귀중",
       bold=True, size=12, ha="left", fill=SUBHDR_FILL)

    # 발신
    for r, txt in [(7,"경 성 시 험 기 (주)"), (8,"대표이사  황  치  일  (인)"),
                   (9,"경기도 안산시 단원구 별망로 269번길 57"),
                   (10,"TEL : (031) 433-8462/3   FAX : (031) 497-8047"),
                   (11,"E-mail : kstm@kstm.co.kr")]:
        ws.row_dimensions[r].height = 16
        bold = (r <= 8); sz = 10 if r <= 8 else 9
        mc(r,4,r,7, txt, bold=bold, size=sz, ha="center" if r<=8 else "left", border=False)
    mc(7,1,11,3, "아래와 같이 견적합니다.", ha="left", border=False, wrap=True)

    # 합계금액 (수식으로 연결)
    ws.row_dimensions[13].height = 26
    total_cell = mc(13,1,13,7, "", bold=True, size=12, ha="center",
                    fill=TOTAL_FILL, border=True)
    total_cell.value = f'="합계금액 : 금  "&TEXT({total_ref},"#,##0")&"원정  ( ₩ "&TEXT({total_ref},"#,##0")&" )   (부가가치세 별도)"'

    # 품목 헤더
    ws.row_dimensions[15].height = 20
    for c, h in enumerate(["번호","품   명  및   규   격","수량","단    가","금    액","비  고",""], 1):
        cell = ws.cell(15, c, h)
        cell.fill = HEADER_FILL
        cell.font = Font(bold=True, color="FFFFFF", size=10, name=MG)
        cell.alignment = Alignment(horizontal="center", vertical="center")
        cell.border = bd()

    # 장비 품목 1행
    ws.row_dimensions[16].height = 22
    device = info.get("device", "장비")
    delivery = info.get("delivery", "발주 후 14주 이내")
    for c in range(1,8):
        ws.cell(16,c).fill = EVEN_FILL; ws.cell(16,c).border = bd()
        ws.cell(16,c).font = Font(size=10, name=MG)
    ws.cell(16,1).value = 1
    ws.cell(16,1).alignment = Alignment(horizontal="center", vertical="center")
    ws.cell(16,2).value = device
    ws.cell(16,2).alignment = Alignment(horizontal="left", vertical="center")
    ws.cell(16,3).value = 1
    ws.cell(16,3).alignment = Alignment(horizontal="center", vertical="center")
    ws.cell(16,4).value = f"={total_ref}"
    ws.cell(16,4).number_format = NUM
    ws.cell(16,4).alignment = Alignment(horizontal="right", vertical="center")
    ws.cell(16,5).value = f"={total_ref}"
    ws.cell(16,5).number_format = NUM
    ws.cell(16,5).alignment = Alignment(horizontal="right", vertical="center")

    # 주석 행들
    notes = [
        f"※ 제외 사항(고객사급) : Hydraulic Cylinder, Torque Cell, 변위센서, DAQ 및 설치용 기계 부품",
        f"※ 시험 테이블(3100mm) : 배송 방법 협의 후 별도 결정",
        f"※ 납기 : {delivery}",
        "※ 설계 수명 Min. 1.0×10⁷ cycle 만족",
    ]
    for i, txt in enumerate(notes, 17):
        ws.row_dimensions[i].height = 16
        c = ws.cell(i, 2, txt)
        c.font = Font(size=9, name=MG, color="595959")
        c.alignment = Alignment(horizontal="left", vertical="center")
        for col in range(1,8): ws.cell(i, col).border = bd()

    # 하단 조건
    cr = 22
    for r in [cr, cr+1, cr+2]: ws.row_dimensions[r].height = 20
    담당자 = info.get("manager", "황 상 수 부장 (010-9121-9653)")
    conds = [
        (cr,   "납    기",   delivery,          "하자보증", "1 년"),
        (cr+1, "계  약  금", "30%",              "견적유효기간", "30일"),
        (cr+2, "지불조건",   "현금 (30:60:10)",  "담 당 자", 담당자),
    ]
    for r, k1, v1, k2, v2 in conds:
        mc(r,1,r,1, k1, bold=True, fill=SUBHDR_FILL)
        mc(r,2,r,3, v1)
        mc(r,4,r,4, k2, bold=True, fill=SUBHDR_FILL)
        mc(r,5,r,7, v2, ha="left")


# ════════════════════════════════════════════════════════
# Sheet 2 : 견적BOM
# 컬럼: A=No B=분류 C=대분류 D=품명 E=규격 F=수량 G=단위
#        H=판매단가(=J*1.4)  I=판매금액(=F*H)
#        J=사입단가(입력)     K=사입금액(=F*J)  L=비고
# ════════════════════════════════════════════════════════
def make_bom_sheet(ws, info: dict, bom_rows: list):
    ws.title = "견적BOM"

    for i, w in enumerate([5,10,10,28,36,5,5,13,13,13,13,18], 1):
        ws.column_dimensions[get_column_letter(i)].width = w

    # 타이틀
    ws.merge_cells("A1:L1")
    t = ws["A1"]
    t.value = f"{info.get('device','장비명')} 제작 견적서 (BOM)"
    t.font = Font(bold=True, size=14, name=MG, color="FFFFFF")
    t.fill = HEADER_FILL
    t.alignment = Alignment(horizontal="center", vertical="center")
    ws.row_dimensions[1].height = 28
    ws.row_dimensions[2].height = 6

    # 헤더
    hdrs = ["No","분류","대분류","품명 / 항목","규격 / 사양","수량","단위",
            "판매단가(원)","판매금액(원)","사입단가(원)","사입금액(원)","비고"]
    hfills = [HEADER_FILL]*7 + [SELL_HDR,SELL_HDR,BUY_HDR,BUY_HDR,HEADER_FILL]
    for c, (h, f) in enumerate(zip(hdrs, hfills), 1):
        cell = ws.cell(3, c, h)
        cell.fill = f
        cell.font = Font(bold=True, color="FFFFFF", size=10, name=MG)
        cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
        cell.border = bd()
    ws.row_dimensions[3].height = 22

    row = 4
    prev_cat = None
    cat_start = 4          # 현재 분류 시작 행
    sell_rows = []         # 판매금액 행 번호 목록 (소계용)
    buy_rows  = []         # 사입금액 행 번호 목록
    subtotal_cells_sell = []  # (분류, 소계행번호) 수집 → 총합계 SUM용
    subtotal_cells_buy  = []

    # 소계 레이블 매핑: 인건비 분류는 "인건비_xxx"로 표시
    SUBTOTAL_LABELS = {
        '기구부': '인건비_기구부',
        '제어부': '인건비_제어부',
        '시운전': '인건비_시운전',
    }

    def write_subtotal(r, cat, s_rows, b_rows, orig_cat=None):
        label = SUBTOTAL_LABELS.get(orig_cat or cat, cat)
        ws.merge_cells(start_row=r, start_column=1, end_row=r, end_column=7)
        cell = ws.cell(r, 1, f"◀ {label} 소계")
        cell.font = Font(bold=True, size=10, name=MG)
        cell.fill = CAT_FILL
        cell.alignment = Alignment(horizontal="right", vertical="center")
        cell.border = bd()
        for c in range(2, 8):
            ws.cell(r, c).fill = CAT_FILL; ws.cell(r, c).border = bd()
        # 판매 소계 (I열 = 판매금액)
        ws.cell(r, 8).fill = CAT_FILL; ws.cell(r, 8).border = bd()
        sc = ws.cell(r, 9)
        sc.value = "=SUM(" + ",".join(f"I{x}" for x in s_rows) + ")"
        sc.number_format = NUM
        sc.font = Font(bold=True, size=10, name=MG)
        sc.fill = SELL_FILL; sc.alignment = Alignment(horizontal="right", vertical="center")
        sc.border = bd()
        # 사입 소계 (K열 = 사입금액)
        ws.cell(r, 10).fill = CAT_FILL; ws.cell(r, 10).border = bd()
        bc = ws.cell(r, 11)
        bc.value = "=SUM(" + ",".join(f"K{x}" for x in b_rows) + ")"
        bc.number_format = NUM
        bc.font = Font(bold=True, size=10, name=MG, color="8B4513")
        bc.fill = BUY_FILL; bc.alignment = Alignment(horizontal="right", vertical="center")
        bc.border = bd()
        ws.cell(r, 12).fill = CAT_FILL; ws.cell(r, 12).border = bd()
        ws.row_dimensions[r].height = 20
        subtotal_cells_sell.append(r)
        subtotal_cells_buy.append(r)

    for idx, it in enumerate(bom_rows):
        cat = it.get("분류", "")

        # 분류 바뀌면 소계 삽입
        if prev_cat and cat != prev_cat:
            write_subtotal(row, prev_cat, sell_rows, buy_rows, prev_cat)
            sell_rows = []; buy_rows = []
            row += 1
            ws.row_dimensions[row].height = 5
            row += 1

        fill = ODD_FILL if idx % 2 == 0 else EVEN_FILL
        for c in range(1, 13):
            ws.cell(row, c).fill = fill
            ws.cell(row, c).border = bd()
            ws.cell(row, c).font = Font(size=10, name=MG)

        qty      = it.get("수량", 0) or 0
        saip_u   = it.get("사입단가", it.get("단가", 0)) or 0
        # 판매단가가 명시된 경우 역산, 아니면 사입*1.4
        # JSON에 "단가"는 판매단가로 간주, "사입단가" 키가 있으면 우선 사용
        if "사입단가" in it:
            saip_u = it["사입단가"]
        elif "단가" in it:
            # 판매단가로 들어온 경우 사입 = 판매/1.4
            saip_u = round(it["단가"] / 1.4)

        # 기본 데이터 (수식 없는 열)
        base = [(1,it.get("No",idx+1),"center"),
                (2,cat,"center"),
                (3,it.get("대분류",""),"center"),
                (4,it.get("품명",""),"left"),
                (5,it.get("규격",""),"left"),
                (6,qty,"center"),
                (7,it.get("단위",""),"center")]
        for c, val, al in base:
            ws.cell(row, c).value = val
            ws.cell(row, c).alignment = Alignment(horizontal=al, vertical="center",
                                                   wrap_text=(c in [4,5]))

        # J열: 사입단가 (입력값, 파란 글씨)
        cj = ws.cell(row, 10, saip_u)
        cj.number_format = NUM
        cj.alignment = Alignment(horizontal="right", vertical="center")
        cj.fill = BUY_FILL
        cj.font = Font(size=10, name=MG, color="0000CC")   # 파란색 = 입력값
        cj.border = bd()

        # H열: 판매단가
        #   부품·자재 → 사입단가 × 1.4
        #   인건비(기구부/제어부/시운전) → 사입단가와 동일 (마진 없음)
        is_labor = cat in ('기구부', '제어부', '시운전')
        h_formula = f"=J{row}" if is_labor else f"=J{row}*1.4"
        ch = ws.cell(row, 8, h_formula)
        ch.number_format = NUM
        ch.alignment = Alignment(horizontal="right", vertical="center")
        ch.fill = SELL_FILL; ch.border = bd()

        # I열: 판매금액 = 수량 × 판매단가 (수식)
        ci = ws.cell(row, 9, f"=F{row}*H{row}")
        ci.number_format = NUM
        ci.alignment = Alignment(horizontal="right", vertical="center")
        ci.fill = SELL_FILL; ci.border = bd()

        # K열: 사입금액 = 수량 × 사입단가 (수식)
        ck = ws.cell(row, 11, f"=F{row}*J{row}")
        ck.number_format = NUM
        ck.alignment = Alignment(horizontal="right", vertical="center")
        ck.fill = BUY_FILL; ck.border = bd()

        # L열: 비고
        cl = ws.cell(row, 12, it.get("비고",""))
        cl.alignment = Alignment(horizontal="left", vertical="center", wrap_text=True)
        cl.font = Font(size=9, name=MG, color="7F0000")
        if it.get("비고"):
            cl.fill = PatternFill("solid", fgColor="FFEB9C")
        cl.border = bd()

        ws.row_dimensions[row].height = 18
        sell_rows.append(row); buy_rows.append(row)
        prev_cat = cat
        row += 1

    # 마지막 분류 소계
    if prev_cat:
        write_subtotal(row, prev_cat, sell_rows, buy_rows, prev_cat)
        row += 1

    # 총합계 행
    row += 1
    total_row = row
    ws.merge_cells(start_row=row, start_column=1, end_row=row, end_column=7)
    tc = ws.cell(row, 1, "총  합  계  (부품·자재 + 설계·가공·조립·시운전)")
    tc.font = Font(bold=True, size=11, name=MG, color="FFFFFF")
    tc.fill = HEADER_FILL
    tc.alignment = Alignment(horizontal="right", vertical="center")
    tc.border = bd()
    for c in range(2, 8):
        ws.cell(row, c).fill = HEADER_FILL; ws.cell(row, c).border = bd()

    # 판매 합계 (I열 소계들의 SUM)
    ws.cell(row, 8).fill = SELL_HDR; ws.cell(row, 8).border = bd()
    ga = ws.cell(row, 9)
    ga.value = "=SUM(" + ",".join(f"I{r}" for r in subtotal_cells_sell) + ")"
    ga.number_format = NUM
    ga.font = Font(bold=True, size=12, name=MG, color="FFFFFF")
    ga.fill = SELL_HDR; ga.alignment = Alignment(horizontal="right", vertical="center")
    ga.border = bd()

    # 사입 합계 (K열 소계들의 SUM)
    ws.cell(row, 10).fill = BUY_HDR; ws.cell(row, 10).border = bd()
    gb = ws.cell(row, 11)
    gb.value = "=SUM(" + ",".join(f"K{r}" for r in subtotal_cells_buy) + ")"
    gb.number_format = NUM
    gb.font = Font(bold=True, size=12, name=MG, color="FFFFFF")
    gb.fill = BUY_HDR; gb.alignment = Alignment(horizontal="right", vertical="center")
    gb.border = bd()

    nc = ws.cell(row, 12, "부가세 별도")
    nc.fill = HEADER_FILL; nc.font = Font(size=9, name=MG, color="FFFFFF"); nc.border = bd()
    ws.row_dimensions[row].height = 26

    row += 2
    note = ws.cell(row, 1,
        "※ 사입단가(파란색)만 수정하면 판매단가(×1.4)·금액·합계가 자동 갱신됩니다.")
    note.font = Font(size=9, color="C00000", name=MG)

    return f"'견적BOM'!I{total_row}"   # 견적서 참조용 셀 주소 반환


# ════════════════════════════════════════════════════════
# main
# ════════════════════════════════════════════════════════
def main():
    parser = argparse.ArgumentParser(description="경성시험기 견적BOM 생성")
    parser.add_argument("--json", required=True, help="JSON 파일 경로 또는 문자열")
    parser.add_argument("--out",  required=True, help="저장 경로 (.xlsx)")
    args = parser.parse_args()

    raw = args.json
    if os.path.isfile(raw):
        with open(raw, encoding="utf-8") as f:
            data = json.load(f)
    else:
        data = json.loads(raw)

    info     = data.get("info", {})
    bom_rows = data.get("bom", [])

    wb  = Workbook()
    ws2 = wb.active
    ws2.title = "견적BOM_temp"
    ws1 = wb.create_sheet("견적서_temp", 0)

    # BOM 시트 먼저 만들어 총합계 셀 주소 확보
    ws2 = wb.create_sheet("견적BOM")
    total_ref = make_bom_sheet(ws2, info, bom_rows)

    # 견적서 시트
    ws1 = wb.create_sheet('견적서', 0)
    make_quotation_sheet(ws1, info, total_ref)

    # 임시 시트 제거
    for name in ['견적BOM_temp', '견적서_temp']:
        if name in wb.sheetnames:
            del wb[name]

    os.makedirs(os.path.dirname(args.out) if os.path.dirname(args.out) else '.', exist_ok=True)
    wb.save(args.out)
    print(f'[OK] 저장 완료: {args.out}')
    print(f'     수식 포함 - 사입단가(J열, 파란색) 수정 시 전체 자동 반영')
    print(f'     인건비(기구부/제어부/시운전): 판매단가=사입단가 (마진 없음)')


if __name__ == '__main__':
    main()
