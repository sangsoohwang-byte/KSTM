/**
 * 경성시험기 구글 드라이브 정리 스크립트 (2026-11-24)
 * 사용법: script.google.com > 새 프로젝트 > 이 내용 전체 붙여넣기 > 저장 > 함수 runMoves 실행
 * - 처음 실행 시 권한 승인 창이 뜹니다 (본인 계정 드라이브 접근).
 * - 파일을 옮기기만 합니다. 삭제·휴지통 이동은 하지 않습니다.
 * - 5분이 지나면 멈추고 "다시 실행" 안내가 나옵니다. 다시 실행하면 이미 옮긴 파일은 건너뜁니다.
 * - 끝나면 [보기 > 실행 로그]에 결과(이동/건너뜀/실패)가 나옵니다.
 */
const MOVES = [
[
"157r6qrgz8Kcp21qj3FITZowEb3659kAA",
"1vLh8FGzzbDMwD5uZ4qHkPxnmXNspayUm",
"2026 Navigtors Diary.pdf"
],
[
"1EprPzqnQ15qQ6aKLMGqtUGLN5Hv0jJ7-",
"1vLh8FGzzbDMwD5uZ4qHkPxnmXNspayUm",
"IBK기업은행_20200705(문서열기암호_생년월일6자리).pdf"
],
[
"1vGEizBdY3FpQSs3jZR9sss86vMAD8tKkmey8pKB9pzU",
"1vLh8FGzzbDMwD5uZ4qHkPxnmXNspayUm",
"Tokyo family Tour schedules"
],
[
"1m5iT1r22UaYGGxhc-Zf9yO83Hn8j4iIF",
"1vLh8FGzzbDMwD5uZ4qHkPxnmXNspayUm",
"qr_서명.JPG"
],
[
"1LBcNqKU2pd9AoYR-LqcGsUGN0hp-LKEY",
"1vLh8FGzzbDMwD5uZ4qHkPxnmXNspayUm",
"北海道旅行.xlsx"
],
[
"128pSI8ds-sEo4Xfj3bGFBx-xBM7D111JjhN62ObbojI",
"1vLh8FGzzbDMwD5uZ4qHkPxnmXNspayUm",
"교토 가족여행 오후 일정 "
],
[
"1Wt3_GzGIU8k5NCVf8vNMjcGPr7HwM0gYFN4KXhUPMkE",
"1vLh8FGzzbDMwD5uZ4qHkPxnmXNspayUm",
"자동차 수리비 명세서 요약"
],
[
"1SnP2OuqpxNluLg7BWAb89DSmoro3gGBo8sTWkJ4-sXQ",
"1vLh8FGzzbDMwD5uZ4qHkPxnmXNspayUm",
"치과 치료"
],
[
"0B-LF8z4sjffeakdhS3hPdi13UGhDZEpXdkxYMHp0dGRTSHg4",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"0710_설비보전팀_미팅내용.pptx"
],
[
"1w6bW23VWKGGkmAHeDi83iGIskeiFtBi9DZG0PoqxMuM",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"1004_장비설치_고객 개선 요청 보고_대흥알앤티_방진고무 라인 특성 검"
],
[
"0B-LF8z4sjffeS1RQbHd5eDRpYU1SbEpzUnBZQVNMQWpLanJN",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"1004_장비설치_고객 개선 요청 보고_대흥알앤티_방진고무 라인 특성 검"
],
[
"1FaNvnguoGmseFCxyfjhTFXpUXMNACATs",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"1030_개선요청_현지대응.xlsx"
],
[
"1xzTTklEtAcd6FCkDWjjiOk919-Z5CcPDoon280i5suk",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"12715133_BRACE_TRANS_UPR_도면사양_번역필요"
],
[
"1Ug2YKm0hRr_ILT7GQKUcXUAV2cKi9CVG",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"12715133_BRACE_TRANS_UPR_도면사양_번역필요.docx"
],
[
"1WlLWqONx6926ok6DD6rICYkF_qqIUg5HwKE6P8v4mKQ",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"12715133_BRACE_TRANS_UPR_도면사양_번역필요의 번역된 "
],
[
"0B-LF8z4sjffeYlVDNVgwOUkxaHptNFg2RHpOYVJWT1pSUXI0",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"190530_대흥알앤티 _NEGO_5kN 방진고무 라인 검사기_정특성 및"
],
[
"1Oi9gEia1a4wh3TNwfUVyy1OUO8FLc5rL",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"191017_대흥알앤티_라인특성검사기 프로그램 수정 요청.pptx"
],
[
"1nuA986ieNn3EiiOsd9HxQx8kAqi4gn3H",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"2016 영업실적.xlsx"
],
[
"1_Z6NgtT2wSuHNVVfIA9PHliPugHfFC9F",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"2018 영업실적.xlsx"
],
[
"1PeksRB7fibVFc3kbYkCHecziUV8rKCJ2",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"2022영업실적.xlsx"
],
[
"0B-LF8z4sjffeSzItYXJtNjZIb0JtNXl3VEhCanZWVHNndjZZ",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"5kN 방진고무 동특성 검사기_견적 사양.pdf"
],
[
"0B-LF8z4sjffeTERSUEtJZWk4Q040V2E5aHpiUkI2TUY0UjJn",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"5kN 방진고무 정특성 검사기_견적 사양.pdf"
],
[
"1tX0QSpFIBfjZZeaboem6BvnkesKTqvWA",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"DL3 MQ4 ENG BKT-조립-LAYOUT-19.07.18 (1)-M"
],
[
"1-2dVrLym4mcMnE3OAXHFHHnmG3qO5fOY",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"DL3 MQ4 ENG INS 액중 조립기 LAYOUT-20190718 ("
],
[
"0B-LF8z4sjffecFZzMkdzc2ZyTkxtZ2piUHZkckcteEdKSTNN",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"IBJ OBJ 유격 토크시험기IV_PL_20190716(Rev).xls"
],
[
"1IxVYzlHgLua7zDWpunul1nMN0RfbDAiF",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"KTL 실하중 힘 교정기 및 유압식 힘 교정기 수리 및 개선 요청 사항 "
],
[
"1PecKGPyKEHfU-l3E64Jaz9AyNe0TThiSO2hjO5KU4j4",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"MQ4 ENG LINE 특성시험기 관련 회의록_191010"
],
[
"0B-LF8z4sjffeOEhRNTJPR0xlaGE1UXRVdGxSTUJPNFRKSHZJ",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"MQ4 ENG LINE 특성시험기 관련 회의록_191010.xls"
],
[
"1E1A5k42ovvSPydTDD5FpcozKvBODesAf",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"kick off 미팅(전기자동차 모터용 동특성 시험기 개발)_201901"
],
[
"1OO7zILdcVEJ-PuKvYBO8Ge74FJrWLFfgWD1XbARlOas",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"견적서 양식_복수페이지_test"
],
[
"0B-LF8z4sjffedUVRbTA2azM0X2tuZGN1MUtQTE85RlhvYmRn",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"대흥R&T R1(20160609).pdf"
],
[
"1POSU_vZpJlVRWndY98eWwY4ciyn7EvKd",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"대흥알앤티 자동운전 중 나오 이슈사항정리_191105.pdf"
],
[
"0B-LF8z4sjffea3FnRno3RzUxQ285bHFiTUcySkJFdFc5U2tZ",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"대흥알앤티_라인검사기_견적 검토 사양.pptx"
],
[
"0B-LF8z4sjffeYjlZZUY2ZUpQZVp0eDdyNmtYSVFFd2VCYXVN",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"방문 회의록_베어링아트_0515.pptx"
],
[
"1FsLioVovEs2tkbgR3YSqIoqCoIxXpx8PLvCDa5Yr9p8",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"사양서_CNC MM -300S"
],
[
"123h991AaYZOtu2HoBUnrm37dIBTRqAnb",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"사양서_CNC MM -300S.pdf"
],
[
"0B-LF8z4sjffeaUczVUJXY28yUlVNUFVOLW1tYzF0S05JNE0w",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"사양설명회_20190402.pptx"
],
[
"1kpYL6_S4G13SoswTCKoqIaHe8MHVey9N",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"송부_파열압 시험기.pptx"
],
[
"1YsdzMn5n3Oe0sEvMhp6QJayXcvxh2qka",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"신규 조립라인 진척현황 및 개선진행방향 회의록_191107.xls"
],
[
"0B-LF8z4sjffeb1dfMk9ZMHRVNE10dW5yN3FnUzk1YXhwSms0",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"장비발주 사양서_시험용 파워서플라이구매_190402.pptx"
],
[
"1aGEjmHt0bZO3v6tJwOwaflAcCKSAkMS76qNPPPXbyj8",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"장비설치_고객 개선 요청 보고_대흥알앤티_방진고무 라인 특성 검사기"
],
[
"0B-LF8z4sjffeREhTdkhXYndmaGJzQlFFSkRKOFJMVHRuekp3",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"장비설치_고객 개선 요청 보고_대흥알앤티_방진고무 라인 특성 검사기.pp"
],
[
"1WR4gNPY890Qa_YdQEwm3fZZlhBYX57dX",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"지그 검토 의뢰.pptx"
],
[
"15CSU6AgbTUgVHslHeqPdhMFyI4Sxa-jr",
"1cLTndgLrmORc0wM6BaZ1ytGNxMhR0_d1",
"출장보고_03.JPG"
],
[
"17-E1maQxltToErDW5Iu0EfRpob8MsiSS",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"#1_axial.bmp"
],
[
"1LJydbcq-QWcXWOi9lJmwWKUowMAWEeiJ",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"#1_axial.txt"
],
[
"14T8r8uEVZ0xD4-W_-qsMl8UxQa5Z2c6z",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"#1_radial.bmp"
],
[
"1bQ7uf2_mK3g5xS0y3QSSICsS4bQ8c8ky",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"1107_원현주 과장_노트북.PNG"
],
[
"1ASO6-jrelQ4HOHjnQf5SvtXG-e2ok0VGSnaCPxsh3Yc",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"12715133_번역_01"
],
[
"1qtkyVuCuhQ5fjzd7fTIAs66893fkHRmr",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"12715133_번역_01.jpg"
],
[
"1BSi9Rje-N-UBJ3fyjyLt6l8tanmdl0-sIID5m1uKRSM",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"12715133_번역_02"
],
[
"1Xd1HWGRTG4ebX1GkrhbgCma-8vDbzM14",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"12715133_번역_02.jpg"
],
[
"14HTAtmXP6DvwWuXYZLG_4hgYH7IONlw3hTfyFADahNw",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"12715133_번역_03"
],
[
"1mHaMd0b8gw2zTGWheTTfJ8zekLaUN4Ww",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"12715133_번역_03.jpg"
],
[
"19gOGGVY8Db7t4NGkVef5_T577ESn7wHC",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"180330_내구시험기 유압원 맨티넌스.xlsx"
],
[
"1jqJQ7-Vg1Vaxw4rlV-chobhontLz4Sox",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"180605_고하중 내구 시험기.pdf"
],
[
"15TVbKeP06HZ-dVBQDxAIneUF6mVcrDaT",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"191121_경성회신_191113_라인 특성검사기 추가 작업 내용1911"
],
[
"1drqR3YsFK1hJqQ697Y_zDQpKFbDHgDZa",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"2000N_ver3_Calc_LVP120146ba_40x10_Standa"
],
[
"1PWopM4ZNr61YCUg8p0sdy91TNQXQitPA6HqSbnjdIeo",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"20200821_13551417_45048"
],
[
"1ge2KKtz0kSlfq4753ExOsACjAz726-IzUW6hs_NV8m0",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"20200821_13551417_45048"
],
[
"1-6rnmoejwVZOB01vigqHFQb7uNBt6I1e",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"20200821_13551417_45048.jpg"
],
[
"1Y_yY5kIpe6tbTy4iW8Oarlf02OVSCX6c",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"20200821_13551417_45048.pdf"
],
[
"16nEjYCxjkogz0b5WG4qr83_MS0CmWbXrShwj2DjdyKI",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"2021_04_07-Completes-MTS-Acquisition"
],
[
"1AmxDJHQtrKHk4PnCpm8tcwU-ITo9p-xf",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"2021_04_07-Completes-MTS-Acquisition.pdf"
],
[
"0B-LF8z4sjffeUTZGUTRQOFJUU1AwX2V4U1hDTm05Y09mTEJB",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"45KW+550LT SUS304 .xls.pdf"
],
[
"1DnQHqNVFXbJlWeD_yVchXl2s9W7zp4ON",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"A000.Actuator Unit_20180511.pdf"
],
[
"16BJ1drr9wnenkl8ReQWkRav-FupoqSQh",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"A000_1.Actuator Unit_REAR_20180514.pdf"
],
[
"1Ot-CGtMoWCFpJNXAYq1lmSUnGabcsHiP",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"ASTM F519-13 Standard Test Method for Me"
],
[
"1R-MN0SFZuPtOqnRXt63udSqSce9QPDzcIErP_hq_tcY",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"ASTM-D6611"
],
[
"181Vd2yrZXfTTr9hHJ02xb2LP7yFr8MTE",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"ASTM-D6611.pdf"
],
[
"1-6gFiJBNhOaiotAyTnAamOkjSR3xeF0Q5pSEKMYhNIM",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"Adobe Scan 2022년 1월 11일"
],
[
"1mBlOBIpC1_VheoPVrkbuykvVgKj4um_c",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"Adobe Scan 2022년 1월 11일.pdf"
],
[
"1cZjRW45UP1Fva11P0bQ-6X4AN9Q95LlIVFMcPvyH0Dk",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"Adobe Scan 2022년 4월 29일"
],
[
"1X9v0rsfbechYuO4IoPF1pWH2rApZ2QM2",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"Adobe Scan 2022년 4월 29일.pdf"
],
[
"1xJzLqRra2eVOqnPm9NimpVT_IYrBCbDJ2nwGampq5Qs",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"Adobe Scan 2022년 1월 11일"
],
[
"1VbTpX1ivwytWS5ndcTxi02pO3FQky_B8",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"Adobe Scan 2022년 1월 11일.pdf"
],
[
"1hprwZDiiS1uA_CtZlN4vK70u89oS64ZgPEc37kHdrn8",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"Adobe Scan 2022년 1월 11일의 번역된 사본"
],
[
"1JUOVI_h3EJh4TTmmCwOEpEdE77NWULCE",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"B000.FRAME UNIT_20180514.pdf"
],
[
"1ESsO8iQ9F8d_Pu-wq6hKYWrR4c4QctZ6",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"BALL JOINT 관련 시험기 소개.pptx"
],
[
"1P6-Pkk_vfkV0jc0OFArB2np6YaG-PAJa",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"C000.JIG UNIT_20180514.pdf"
],
[
"1dfBB8GpmeSxgzlPKDvqYBSOxKd1aId5U",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"Contract 경성시험기 2018052903.pdf"
],
[
"1outNy3MrLLSALL-tDQxlflfezH0Bp-V2hpptsQHzzNo",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"Contract 경성시험기 2018052903.pdf"
],
[
"1REgv-X4pMTySlm3fXIB9pA3QX-QGX0jd",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"Controller Operation Manual(Basic versio"
],
[
"1jdnKH3LvTRfzVMd-8az0L4A87OD7U48l",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"Controller Operation Manual(Detail).pdf"
],
[
"1eGWOdfYjTesmMKOCvqfN8LFN06zuilDv",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"D000-1.CHAMBER_20180717.pdf"
],
[
"1MzToHAfrAGE3RH0V5E9bVoWYzF2GuaHf",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"DB DDU 2010-03-20 GB.pdf"
],
[
"1z69vHccosK96ZjWfWXj4NOz24fRprcdg7F7TGcexVvM",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"DB DDU 2010-03-20 GB.pdf"
],
[
"1nhq98V7zMZPVzAYl0xbnUOrg6H_NFQwV",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"DH 2WD_19.5.pdf"
],
[
"1CZeUXdqaKS4SVHwt8ue9VsT47ZHjKUSB",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"Damping Force Software Manual.pdf"
],
[
"1EXa9jP8OCzR4S1ZSL_AD1FsOeK0JSPw9bjZV2St2zKc",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"ESPEC열충격기특허(무제상)"
],
[
"1IvVHQth9_AVomTj16X1WpjTwZYBE6lYb",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"ESPEC열충격기특허(무제상).pdf"
],
[
"1-A2_J4m_5FruQubxgeHJM2ZRnShWtrbgOtE2Ak0K3ns",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"ETL_82183.100301"
],
[
"1d9UJc5dBUT-Q7lvF5WRKXkiPbx1UgpnP",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"ETL_82183.100301.pdf"
],
[
"1brgeGAIBJz1ECDpblcESCXu9f-k6WVKi",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"F000.RVS TEST UNIT_20180716.pdf"
],
[
"1pgqhk2pm7YQNHN6GLDbazNcCQDsdXHuY",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"GMV 18.8.pdf"
],
[
"14MQm5kxzkXSd1iEqCRx31z7RXGOZwxHo",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"H000.SUB TABLE_20180718.pdf"
],
[
"1DhxxeC1N0QnnovscaWrLtod_m5HE8t1N",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"HORIZONTAL TENSILE TESTER - Made with Cl"
],
[
"1P-UGKyLPy2HNjhQujU4C1KMAB4Jpwcxo",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"HR 28.5.pdf"
],
[
"160088ME8Nma-rCtZWT2uu28EPka3xRe29mhpTK55L2o",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"IEC 63026 Tensile bending test and tensi"
],
[
"1NvhxjVKfChGlTfTcy0MAO3-qPIJA4g4Lhqa5tCJrjPI",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"IEC 63026 Tensile bending test and tensi"
],
[
"1RyY_xR9d-D_m1ThG3Nbvm0ZtcUUfLEh4",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"IEC 63026 Tensile bending test and tensi"
],
[
"1bK0bK19jgMiZWo3HZ0UBufw0nTz4Pj3K",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"IEC 63026 Tensile bending test and tensi"
],
[
"1meVhFfn8f5Vc7cvC_8oNBfbgsrZm4Vc1",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"INS 동특성 검사기 후면커버 관련 및 누유부 사진.pptx"
],
[
"16lsFLxme_J1vPsp7pcrppMLqodzKBKpi",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"Instllation Manual.pdf"
],
[
"1mB9cCrryA42X_43ehyxn-A6avdYI-_RQLSeyL8D-Qu8",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"LMG D7-1507HS Specification"
],
[
"1wbooe0wI5biH-23w9Ye3IfWalREp84pS",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"LMG D7-1507HS Specification.pdf"
],
[
"1W065p3wFWs3KWlUjFqbjRwPeMYKIpTD4vGugxixeakw",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"LMG D7-1507HS Specification의 번역된 사본"
],
[
"1QIyVIGLhE69GZsrTW-PLr_u8R-nPys4T",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"MAINTENANCE REPORT.pdf"
],
[
"1ClbvSYWjR5CURJXbJZXq1zTZN82ZSNwL",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"Maintenance Manual.pdf"
],
[
"1F2FFDOWMcLL2mEWOYeEUTYGswGgySTmbelJBa6pS_AU",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"PUMP_CATALOGUE"
],
[
"104iJ78HoFAQbZV6u0-6HMOXp9kL6CcWk",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"PUMP_CATALOGUE.pdf"
],
[
"12W8sA7-miupXHoO9Z8JAu7HV9gDA0kL2",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"R곡선을 사용한 정형내화물의 파괴역학특성평가.pdf"
],
[
"1Nof8f5ihCxOGvjB13sEURDMGR-9dkUqsoGg73r3R00s",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"R곡선을 사용한 정형내화물의 파괴역학특성평가.pdf"
],
[
"1gcvGVztrmdHAEHlRO2MbWrqrmAIUDYFjt62_bJQomz0",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"SAE J2334 Laboratory Cyclic Corrosion Te"
],
[
"0B-LF8z4sjffeQ2stRkhCazNmS181X2s2ZFRNNWs4ZWdxTFlR",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"SAE J2334 Laboratory Cyclic Corrosion Te"
],
[
"1oGNjINH9VsTtt8aEJfrNQ3-jxuBJ7Eev",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"SERVO VALVE TEST BENCH 활용.pptx"
],
[
"1HJbqSgl2xbLdRrU4sFV3ggZ65wBHagGnkDbnPlYG5M0",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"SHORT TEST MACHINE (INTERLOCK DEVICE PL)"
],
[
"1G9pzoLJmxxqu0HN3ojXxvMi9BH08uTaB",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"SHORT TEST MACHINE (INTERLOCK DEVICE PL)"
],
[
"1yo7pNto3ffPEExPua3J5VeXFWeYh_7wg",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"SR-300,350,400_사용설명서 (3)"
],
[
"1ybBLxPZ2UM2IMYdje4U5IY5RtQ3ELaoF",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"STAR_550 MODEL.pdf"
],
[
"1FnPJ8GbAkirLl6nHc7VbDO6YeZzf_1_E",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"STAR_890 MODEL.pdf"
],
[
"1uKNDWDzk-yHpBDowvuzygZt58Q0hYeFQ",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"STAR_902HF MODEL.pdf"
],
[
"0B-LF8z4sjffeUVVJanZrVm5Da0dKMXBBUG9JaEhBNXZFdE53",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"STICK SLIP NOISE 시험기에 관하여.pdf"
],
[
"1wVLOd70EGmDdI-GvedhpTX0RoVYnhVZWEd_uZ50Gkyw",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"Sample - Global (United States European "
],
[
"1nFZhor6iEWnKNEeyHOAy4_WeLZVKVffv",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"Sample - Global (United States European "
],
[
"1eH2N04KUM5ioA79BX10didKPpOELfUWt",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"Self Levelizer Software Manual.pdf"
],
[
"1Nv1Csr-NAx3qMZ-6ftY_JVYwF1D8RoZ4",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"Shotcut 한국어.pdf"
],
[
"1dKmCEi9Bf1vApFKZe93ai4RylNU_ksx3",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"Specification of FUD01.pdf"
],
[
"1imPkUBXXc9NFE7TozkpOshsfg0BH6YQL",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"Specification of FUD01.pdf"
],
[
"1gYuqDddJsJhJqVN4f0o6Gpj_4cvnIzZI",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"System Operation Manual.pdf"
],
[
"1tRNIeRzBhMkkYw5DYVLcB2bmIcuWE4NH",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"TCF (BATTERY CRUSH TESTING MACHINE).pdf"
],
[
"1YGk4qZGJfDWj1jDh0K0X7rEaqpn0Jn4l",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"TEMI2500_Operation_Maunal(kor).pdf"
],
[
"1SqsXdTcATo81waSK49kCczK0o3O9hMGb",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"TEST.xlsx"
],
[
"1xDknIv5EzlDaCcBaDggkxFRGrkjGAify",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"TEST_02.xlsx"
],
[
"1m51VTzJbI-IPeFosGQow93HTaOytCVUlyyZNcLRWScc",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"Translated copy of 20200821_13551417_450"
],
[
"0B-LF8z4sjffeWVdkRmNJa1ZuNUN2dnVWQ0VlM25xd2x3c25z",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"V30D.pdf"
],
[
"0B-LF8z4sjffeYmlrS3hYZHBDTE1LU29Xc01UbGZhOXlfOVp3",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"X00.정특성 검사기_20190529.PDF"
],
[
"0B-LF8z4sjffeOS1TT2k2RzhOUFRvZDVVVG1fVXI1WUhVWTJV",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"X000.동특성검사기ASS'Y_20190529.PDF"
],
[
"1X7GYPg6lCrVd0tu0nH2oKQxPLV7my4s8-3wLyuUeYR0",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"tp-210-09a_tag"
],
[
"1jHwk5kVweOtXMfdRysy98IFJG8VqehU7",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"tp-210-09a_tag.pdf"
],
[
"1G-lcoLCYTNkTgJfWwi-wVzBRsYsTrTrdMkfYFHA06vQ",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"tp-210-09a_tag의 번역된 사본"
],
[
"1FsIxh_6Im_uAdTRXEhBCHm61uUUxCdmDkkrAscpSEFw",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"tuvsud-designing-abuse-tests"
],
[
"17TWmaAlinwXkprXxayMKxhSGXKr21FNZ",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"tuvsud-designing-abuse-tests.pdf"
],
[
"1iCEuKjSqrspOslufEU8NESJZcqwcvncK",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"경성_1st stage_필터.jpg"
],
[
"0B-LF8z4sjffeMU1wUVR4Wm9iZ3BTWUNXSWQ0V0FseHNtTTdv",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"니들베어링 시험기_20150321.dwg"
],
[
"1-CIcCBY7C8Ghd87CXm3U5n4ALgD8Qxqq",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"레이저얼라이먼트"
],
[
"13sEaXi9iMfNGRfA-8XW1qdiXGa6ZnruC9LPnEa7sW7c",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"모터.JPG"
],
[
"1MYXlQun-aghck6st4sdNND1IEecCsC1q",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"모터.JPG"
],
[
"1il4EW35RnR_eo6qBKBnv-mxBBjoZPUTJ",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"방진고무 시험방법.pdf"
],
[
"1Opjq3D76S5cVPbKDfbm7IVymT9PtJh79",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"번역_Standard Test Method for Wet and Dry "
],
[
"13qceWJ9MJVcWVl7CAlIK2V_foBBrRKM6K7Pg8FmqfQo",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"번역_교정방법"
],
[
"1dR77j416MkcwBaJ7eBhavB63ZS9IaNKc",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"번역_교정방법.docx"
],
[
"1gQEH7lh_CySHOyLDeQg8FETrCVIOgnzUuJQk-0R3tXE",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"번역_교정방법의 번역된 사본"
],
[
"1i-0B8ttxPHvAuubm05q71DU1bdUOegE6HO7o3j3f4fs",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"번역필요_1029"
],
[
"1CphPrECynrKMvo4PEtDmxk2xl9VCUlWj",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"번역필요_1029.jpg"
],
[
"1oXvTHgXe2NdgSxs9QNidDoe4IYrvMws_",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"번역필요_ASTM F519-13 Standard Test Method f"
],
[
"1eT-au0LVucdOYchkVy-AvMWSenSPuwTN",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"복합환경회전내구시험기.pdf"
],
[
"0B-LF8z4sjffeRGVmdHBObDRfZE5iZFYxektMaGFPdG5WamFV",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"비틀림 파괴 시험기_경성 지그.PNG"
],
[
"1IYXKuIvZY1H3-wwkIyX4015q94IjnM7A",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"서한워너터보.JPG"
],
[
"1hBoci639l_wH3v9VYiPGrR1WAl5BGO1DlFGltzbMBNg",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"서한워너터보.JPG"
],
[
"1lSuTwjQ-q75wjGOlWUQJN5uez7MaqXic",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"세트 스크류 연결타입.JPG"
],
[
"1l6eZQhS945rlbexTdfg0K2GaZ3INSMBJ",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"시험방법.png"
],
[
"1x_v-f11SWMAAbFtSh4JvxrUEYLZpI0aMwBR4cNN9ESQ",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"에스펙 열충격기 특허"
],
[
"1lqKm_MbxWSiKbQN3s82eCEv-ZT20lCo0HGaR8NJO77c",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"에스펙 열충격기 특허의 번역된 사본"
],
[
"1PSBAU28SpSfukw6lWvB5Xo4_aNy4W3Aapot1VbDkYIk",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"엔진마운트의 진동해석"
],
[
"1xqNF8Dh1feSyMDZH8saX26-Xzyd5QvVa",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"엔진마운트의 진동해석.pdf"
],
[
"1ygJvod2F52ylVE2ZyV4YEaAfMmCPPKRi",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"용도설명.jpg"
],
[
"1sD2cT08_r30jgJal7xxbDO2lsiAvcw5k",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"원본_오리엔스 금속 메뉴얼_02.pdf"
],
[
"1lyTrguqNNUTX-pjt1VXmLUFyT0r2-7PXc1Sg2xFV0YQ",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"일시 : 2019 / 11 / 01 10:00 am ~ 12:00"
],
[
"1DW0VJN1MKt4ndcygOE7ktECJbCLd-h1c",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"전체 화면.PNG"
],
[
"1ZduX3zQ0UAg-wggwTgW8umFkJ21BKULJ",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"조건설정화면.PNG"
],
[
"1eAa05-zFimGUyg7Jdukq4zSQEMqv9FfHiIXFI6C0vpU",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"진동시험기 문의_요구사양"
],
[
"15Z_BFhpt57kpwkYY9TjWqmWfNphP9vmk",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"진동시험기 문의_요구사양.pdf"
],
[
"1pZwTGVEEgOv08UkllApaQO1Q48sdQVQw",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"파워트레인 교육자료.pdf"
],
[
"1s_HNc7xUzjBUZkN5g4VJaRNZqU_Zoldk",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"프레젠테이션3.pdf"
],
[
"1shrJHcQP4bX3EHVMlKlKVytVc7Kktcs5h8iV1OycC_o",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"한국신양통상_사이트맵"
],
[
"1lHsxs0qBm6AJUkRo6zudkVswuG_7F69-",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"항온항습 챔버(이동형) - 200403.xlsx"
],
[
"1lLJ8PrWiW2lRHYxbC7n1xKUkNd6NmBf2",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"회신_리니어모터선정Sheet.ppt"
],
[
"0B-LF8z4sjffeZ213SWdXbkdaaGFEOENwdThia1ZIVS1PZXpJ",
"1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA",
"회전유격_강성시험 데이타.zip"
],
[
"0B-LF8z4sjffeV1NzZzEzRTdmMi1ULVpJZ3dpX3ctWE0zdk9R",
"18mRofjLsQP9LJFRTPji9yGtnyZVm4Iwt",
"3._KC02-117_경성시험기(주)_인정범위(국문)_20190502.p"
],
[
"13U6R7VuRYJ0dqCUsi2a6UzQuO8x4Ehvj",
"18mRofjLsQP9LJFRTPji9yGtnyZVm4Iwt",
"9.경성시험기 상조회 2014년 회칙.pdf"
],
[
"1CGt186EImvuxd1pHkBAt5zLlc_9Xa8CqM0rxTeG6Ck0",
"18mRofjLsQP9LJFRTPji9yGtnyZVm4Iwt",
"AS 접수 및 처리"
],
[
"1oS2oAcTPDleq1mdJhHNnp5jr9d3PALy1KOCeKIeOL_o",
"18mRofjLsQP9LJFRTPji9yGtnyZVm4Iwt",
"KS Q ISO-IEC 17025 2017 (1)"
],
[
"11FhW5PY-B5PQoxFsl6J6TMbkaiHUFLS8",
"18mRofjLsQP9LJFRTPji9yGtnyZVm4Iwt",
"KS Q ISO-IEC 17025 2017 (1).pdf"
],
[
"0B-LF8z4sjffedC03ampQaFRJZXIwaDZ4Q013Z1VnVkxzNmlR",
"18mRofjLsQP9LJFRTPji9yGtnyZVm4Iwt",
"경성시험기(주)_사업자등록증.pdf"
],
[
"1Z85PF-wB99P3AFl0aLRUWNfrf4w0d0b2",
"18mRofjLsQP9LJFRTPji9yGtnyZVm4Iwt",
"규격적합조사표(경성시험기)_200608.pdf"
],
[
"1iAJYIhdPzwOhAxi-owZhIoX1i0AIHbZk",
"18mRofjLsQP9LJFRTPji9yGtnyZVm4Iwt",
"비상연락망(20190710).pdf"
],
[
"1wQ1uhGYyqMbibz1mPJBytw240M_9O5ks",
"18mRofjLsQP9LJFRTPji9yGtnyZVm4Iwt",
"윤성은 부장_업무인수인계 프린트 3장.pdf"
],
[
"1L4Hcbay7t83OVyAT7cc1pfu49ANbDsug",
"18mRofjLsQP9LJFRTPji9yGtnyZVm4Iwt",
"취업규칙사규_경성시험기.pdf"
],
[
"0B-LF8z4sjffeRzZmY0NkekhqZnFTM3BPT29lUmJMNl9wUFhn",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"161020_Purchase Order_FEMAC CO.,Ltd.pdf"
],
[
"1X9Jkmqmqri_JitLLRvMaxuxyenQPlPuwLAMrKkaPY04",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"Calibration in Japanese 1"
],
[
"1fxB8Agcz_VH0reugJHQIhSrKu5K25yjy",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"Calibration in Japanese 1.pdf"
],
[
"1dIGM5oH2unNhrtpt7HHeXhgettOdSRMq",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"Calibration in Japanese 2.pdf"
],
[
"1o1j2AcmvCzXFI-BIc1vUTIwcpKzL1M2wCCrqLC6AWZA",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"Calibration in Japanese 3"
],
[
"1n7rZD-jPgPhhepeCEjGpCo0TjkEBmb3G",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"Calibration in Japanese 3.pdf"
],
[
"1yzu6-FNHKCZgTnAIi0qKmsy5s4gkQPAi",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"IMS 관련 시험장비 리스트(EN).pptx"
],
[
"1NxQAeVWMDmVcS-uBFUDbBy6IYhzStlZCnF-Gx483nzM",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"InterBattery_2022_Exhibitor_List"
],
[
"1bNNBGa13q_vVgG5kEK9-O0uLbdaVllW-",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"InterBattery_2022_Exhibitor_List.pdf"
],
[
"1UShScekysoUlXfIxUYk6xhIRFo4Aq-xQ",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"KSTM_HS-CODE CLARIFICATION (FOR VENDOR)."
],
[
"1kY8y85KoFYUIPY8rkVZLLJ7sVuF9CtelN_cFpu6YxUY",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"Letter to Northvolt, 2020-05-13 (200526)"
],
[
"1PRW6dKvj18SRN01Q1p5-17oad8IDoGfm",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"Letter to Northvolt, 2020-05-13 (200526)"
],
[
"1IyOonjsruuSSRkOszF5MpXTsKb5zl32n",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"NV_CE_Checklist Electrical and mechanica"
],
[
"1ld3nCKqs5m3Y1nLx4aVu7izAo7-v3C8C",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"NV_FAT_KSTM_Machine Functionality Checkl"
],
[
"1qbBFqH8u1vXfWSeuCkttFMaRGy6gBlxC",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"NV_FAT_Technical Documentation Checklist"
],
[
"0B-LF8z4sjffedWZkR1pUQnFVTWdNWkFnX1cyV0ZTM3kyckZR",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"PROJECT進捗確認表.ods"
],
[
"1Poo70ft2SJLUJAqkAlw4IPvHAEcJIzbuwHjb16e7OfM",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"Purchase order"
],
[
"1b3gOrMDDP91R2q93e1ATg8hP63LPa-vA",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"S0182_トルク検出器 TQR-200ND8M3_見積書.pdf"
],
[
"1kFzUHf_GFZOYJJQuJd_YOfiVAIhfB8pk",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"SHOCK ABSORBER用試験機LINE UP.ppt"
],
[
"11B9tUWS4jb4p8S9OONaWinzUnPams3mp",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"TQRD8M3-100(日計) 外観図.pdf"
],
[
"1TAChn7hWtglWm8S0VLJzCT1GJHcs5NuM4IMYrq2EogM",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"Translated copy of Letter to Northvolt, "
],
[
"1ouLeTG6jO2VKtjrKxO5OYGUqpSK_cesS53o71Gs3Ejo",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"Translated copy of Letter to Northvolt, "
],
[
"10paC_5CB-ZY-hWIiCbNuLupw2hzJXbRjtmoE1kbfOr0",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"trw pt1004"
],
[
"1RVCn3WcGwydifWNvybVIWnZoWxsJAVMzixKU1kQnicI",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"trw pt1004"
],
[
"1pKh-j6mAHYpxg66pFydzad9V2HRoS2RSmoWnyAQ1U3w",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"trw pt1004"
],
[
"1WgM8F4Fb0FXaBjWgktEANVP6uyVacN4G",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"trw pt1004.docx"
],
[
"1x-C45tN3CzDSUB7ecxTr88--wjxs1hVN",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"trw pt1004.pdf"
],
[
"114BZyPeS8swvhI3QJ4CWLJ38T5gMLWXPbchOiGg57Sk",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"trw pt1004의 번역된 사본"
],
[
"1AZTP2fR7q8xMYYB-LbfNYA16yKn19-KP00yeHOkqnCI",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"trw pt1004의 번역된 사본"
],
[
"1uqZDSXnRydnPIawmL6WhX4yxyXXmQ65XHR30abtRdyw",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"trw pt1004의 번역된 사본"
],
[
"1wCpb7cNLVWxB4HcjKy5b7vab_m8sz-Az8eF5vTLvM58",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"trw pt1004의 번역된 사본"
],
[
"1sp12RX9ToUdn3SluKm8HmTsboj7HqNaYKfcOpnwxUkY",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"trw pt1004의 번역된 사본의 번역된 사본"
],
[
"1NS8pjxll7UXaHVjuNqhGidTLpOy4kWZra0BKWzQuXfs",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"ТЗ Technical and Commercial Assignment U"
],
[
"1Vhe1pezL3PeNcToiIMflvQ9bMra-mU8l",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"ТЗ Technical and Commercial Assignment U"
],
[
"193d2JJFnsJqbdkShjr9ww62z4sndezSCaaX0fUC0dak",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"ТЗ Technical and Commercial Assignment U"
],
[
"1ZGkCPo8r1ooQCl7OeyuQXShP1oGhUMMUl42jsNy2DcY",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"恒温槽見積仕様"
],
[
"0B-LF8z4sjffeODFlZDA0ZGItOGEyNy00OGE3LThmNzctMTYyNzYxZDQ2MjQ5",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"板橋_恒温槽韓国内製作.pdf"
],
[
"1dLjWvvcp8ZRGpgCsqfNiGA-bWcDAn9QuNHY6fIQes_4",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"계약서.pdf"
],
[
"1zE3ew14m1kISNi4ZNpxDDUkkmMzayfzJ",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"계약서.pdf"
],
[
"1WZVIEn5PEnRrzNE3AeTaQUyCaAIzTXFU",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"안산 연구소 영문주소.docx"
],
[
"1iA04Bxw9tfMJM0KmFnx5gLCsHOqEnzq_j9ZVMsyr63o",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"지그 관련 영문 자료"
],
[
"1l-0DszWGbSwwQ_gKenwn74Ioyz1nH2s0",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"지그 관련 영문 자료.docx"
],
[
"1-EB-PzuyrtuxkjMbEqI69u80zW_o-encddoj6ar1cMw",
"1mt-ihEC0ZVVdtPaFFfxBEORj5V9WT6AQ",
"지그 관련 영문 자료의 번역된 사본"
],
[
"1ruF08sOm47IuoGfUnQduJAWtlOk7PueL",
"1IkanlYtLGj0Cw_uYZDght0p9Q6wCta4Q",
"한국신양통상 서울사무소 — 기존 사이트 도구의 첨부 파일"
],
[
"16UsNbHvWpyj653w06LFI7ZEioaEIjhfv",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"2018_경성시험기(주)_제출용 전자카탈로그"
],
[
"1TSNNDX8cLZiQ9USqoHmvdhz5iiZFgCZmHr0T6ocmBmE",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"2025 Sales & R&D Strategy Final"
],
[
"1IK4Iac5KEjOAoMqTdgLYbACP5tatETEDJ_jUUsDk_XQ",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"2026 Sales Strategy Final"
],
[
"1w0KWRB3JatrnoN4wEtRz3XfiKZx5cDO9EVbndzHLyQA",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"2026 Sales Strategy Final"
],
[
"1jhcoejm1rzuzliOJrza4omzfcUlZwrrb",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"221215_NNM_회전방향유격시험기_견적사양_EN.docx"
],
[
"1I6syKX9zUPDb-VD1WAkWf0xgW4oBabpK",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"240220_R2_서진오토모티브_드라이브 플레이트 전수검사기.pdf"
],
[
"1Qc8FQduE8qSqJ9uLJAgH9Espb5Oi8sAT",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"240315 FORD CE1_P736 제작일정.pptx"
],
[
"11GL4VlEcGkygekyZtX7Vg-Xt_ZbKhdcn",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"240315_서진오토모티브_댐퍼 비틀림 토크 시험기 견적 사양서.pdf"
],
[
"1dgokdvPNzyzzgWhLHztFTnN22I1yKPhC",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"241203_해해제_평화산업 동특성시험기 사양서 (고사양)_v1.xls"
],
[
"10hJpb-FTT15IGWHaj2-Z3XtvOmELh5oq",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"3MN_수평인장시험기_소개영상.mp4"
],
[
"1zLAjxVJTCwKvakBoriH80N5TH03AFDRwX1-EKplcwPs",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"Actuator 기어 구성품 종합 시험 계획서_A6"
],
[
"1RJP2FvQx3EHi7cEWOKg8a1FBm3n8Uqkl_bwJz5VdQeo",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"Arc Spring Tester Proposal"
],
[
"1NG7bLiCDcCQg-g_w_YCI7d_hiuLk9FHC",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"DCF_머드구동시험기_고객제출자료_20261117"
],
[
"1_C1nKtI09thPoH1itRZq3W9vuu4gvu0V",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"KCL_자료검토용.pptx"
],
[
"14jvycs35dFYJORoEvfzFZ8JoO8s5D4E9",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"RLE Laser Encoder System 소개자료.PDF"
],
[
"1u_Rsv5oT-yFkzyMgHvAGdYuX3xCt_TPW",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"ROOP NAMYANG(758,759).xlsx"
],
[
"15K5scYfx-FPGSzqN-4DbozJD4AfwTOHy",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"SUM_세명기업_도면_방진고무 동특성 검사기.pdf"
],
[
"1J2wKIzj6TgsOoLdcoBb47EJytb2TpyC-m6xmy7GV_d0",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"SUM_세명기업_보수점검요령서_방진고무 동특성 검사기"
],
[
"1O_ECr77PfGzOUgOQ4Ut0NFoagCl67tKS",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"SUM_세명기업_보수점검요령서_방진고무 동특성 검사기.pdf"
],
[
"1LB1q5QDMwHxbzy8xE0Hbh9GmfmkwtvpM",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"SUM_세명기업_취급설명서_방진고무 동특성 검사기.docx"
],
[
"1NNvptuwAjhHFeJZSyRAEgm3NmWTShnSZ",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"SUM_세명기업_취급설명서_방진고무 동특성 검사기.pdf"
],
[
"1sPlEFJ2A_37coUP2qjLh_CBHJ4Mmd6Hy",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"SUM_세명기업_컨트롤러 설정_방진고무 동특성 검사기.pdf"
],
[
"1RSD1bBZBixFzKM72IT47ASCpoYoQN8bl",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"SUM_세명기업_프로그램 취급설명서_방진고무 동특성 검사기.pdf"
],
[
"1mDmNJiZUwafh3AR-M1DBdYBZgjkSx9QtOUgY55MbYb8",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"UL 인증 확장 BOM 검토 및 제안"
],
[
"1V4kZjbiWAzyM7uy_G6KE_5Wxqhh_LhEH_3MjRv5LmFQ",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"개발 기획안: 유압 시스템 이원화 제안"
],
[
"1C0mnZzZAW4LBHOIgpfTLYKJcSGD9BTwE",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"견적 검토_문의사항의 복사본.xlsx"
],
[
"1Ln3IVVAfDUZCk7qVrK_t0zwdWOyFnkrv2hrHmy0LBi0",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"견적사양서_스티어링 침수 내구시험기_남양넥스모_20260109_Rev1"
],
[
"1T5zrs4ZB_QbMEjrTxsEiWu3ibm7RxtBCTkiDrRuXNaI",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"견적사양서_스티어링_침수시험기_남양넥스모_Rev1_20260109"
],
[
"1PLuVSky8IEXw9nAZHFnXN_FWq6gpBKap",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"견적서.pdf"
],
[
"1tnfKj3AzjFAzDo9huNVibl413EZzrH0GeZITbtJvN4w",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"경성시험기 회사 소개 업데이트 제안"
],
[
"1szBsbVuplo2A-ctczY4c7xM9bL2XHRGa",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"경성시험기_견적서_타츠타코리아_20240405.pdf"
],
[
"1VrT_1jHZzGaKSKHpioXn45Efupuw4Acj",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"경성시험기_제작의뢰_미디어자료_250813.pptx"
],
[
"1QoePLTLuP-yzu7BEvqjQ3CodejNvM7ly",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"경성시험기견적서-250305.xlsx"
],
[
"1lnrSHMXzULX5jViIHLWvxFcGBuvLdLFz6ta0IJgPRnE",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"기술사양서_스티어링 침수 내구시험기_남양넥스모_20260109"
],
[
"1iRlKTRLFFhTUKcXZji1wawBjOJocqxFM",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"베어링아트 베어링 강성 시험기.dwg"
],
[
"1ynTTTZ3Frs9QbyrTq1udDJAR5xVPuzcc",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"복합환경성능시험기 MQ4 시험평가 HKMC 2종.pptx"
],
[
"1A-nJ4VuHzA4KN-FLlx_4yGe_4eyaupzfDwrD_GPnvMo",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"세명기업 귀하 방진고무 검사 솔루션 제안서"
],
[
"1CdJbm8IbIzP64njfytadFQRY1yUOPlio",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"세명기업_CAC호스 내구시험기"
],
[
"195OUIoA4jZGjoBk6JUnvPSWlIbh8G8n_",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"소개자료_초안.docx"
],
[
"1FYGSi-NhWRLcxlz9RKb2dy_ZuWRfbgIJ",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"스티어링 기어 침수시험 제작사양_검토.pptx"
],
[
"1Y9Vt3mBw4tshd5dX9o7nauG34bDHql6BM0Ry5TkPN6k",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"신규 시험기 사양 검토 및 제언"
],
[
"1DfBlgxk9pn7e97TEzbuQAok2uAz6THR1",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"지반경사계(지표변위계(지점식)) 제안내용.pdf"
],
[
"10mT-6PYqAFDn1wrjMUBvLJ5UcVpLmKQC",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"지반경사계_교정장비_BOM_v4.xlsx"
],
[
"1LhcushoDmn0KtPf8x0Wvkahl9kyqAenzlJB3vIoykP0",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"침수시험기 견적 검토"
],
[
"1zB-I0fqk2RQF2c_LIkPvCvp9y5IcrjEVsl4CGZz-_i8",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"카탈로그_내화물"
],
[
"1Nu7igVLEArCJ-7UJqpDJL7sDCP9AK4MW",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"카탈로그_내화물.pptx"
],
[
"1o1szJSOA81PgK4t0mw8Pm0T4dqPH5FG2",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"파워티엠_견적_250124B_경성시험기(USP-80VDC12000W, A"
],
[
"18QJjBVx2e9u1B0cujA0wcXBkDI3J_VsZ",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"하중 이슈_지그차이점 정리.pptx"
],
[
"1NMAFTqROjE3XQAQ8TXN39qQvyGf1wyFZ",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"회사소개_2025_경성시험기.pptx"
],
[
"1TZO1zpPePoob2W_JYrAj86B_C0uogoxR",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"회사소개_2025_경성시험기_롤러 및 아이들러.pptx"
],
[
"1FGmtjgBiHRcLB1-jRIWwkd_qWtwS3LST",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"회사소개서_2026_v1_통합.pdf"
],
[
"1-x0hrIBgUNhSBbsM1NkaUZMV9SQm_CCQQgr5wSLqSCc",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"회사소개서_경성시험기"
],
[
"1DJXzzQ60prKeasaN4qZZKV_wipnr8dP08ifZhSGsud4",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"회사소개서_경성시험기"
],
[
"11EwIb5bwWarTCT2Msp_DtxpLbsia5LaQ",
"17a-u131JlXujxGscicKzmFSLrRS41Bhu",
"2017 영업실적.xlsx"
],
[
"13shXSP1o570af0Q1XbFw3WYzpTbxCvDp",
"17a-u131JlXujxGscicKzmFSLrRS41Bhu",
"2019영업실적.xlsx"
],
[
"1p0SWcL0xfWOeUfLjyouO8fxu94qeQinmLFbEcgLUb70",
"17a-u131JlXujxGscicKzmFSLrRS41Bhu",
"2020영업실적"
],
[
"18g_aRyLrNgexenEm9qs0N-ceIf5Jwyep",
"17a-u131JlXujxGscicKzmFSLrRS41Bhu",
"2020영업실적.xlsx"
],
[
"17Nw__9AV7aReJhyFTxfHbzUOfEx1W6izB8-d1C-ck8c",
"17a-u131JlXujxGscicKzmFSLrRS41Bhu",
"2021영업실적"
],
[
"1il1czN74pDZcxUy-RIOK1jmwFZargYTx",
"17a-u131JlXujxGscicKzmFSLrRS41Bhu",
"2021영업실적.xlsx"
],
[
"1YYF_Qghj3HsMXqw2lF7c9xSLjR4mLOffGR9l_68bsic",
"17a-u131JlXujxGscicKzmFSLrRS41Bhu",
"2022영업실적"
],
[
"1wV-4pZ-BoRNCD7AIcDKhhISnfKJmYojb3vLr-3yORL4",
"17a-u131JlXujxGscicKzmFSLrRS41Bhu",
"2023영업실적"
],
[
"1hjQKTW1iIaqsQEP3M2K3lTf1VJTJqQl2",
"17a-u131JlXujxGscicKzmFSLrRS41Bhu",
"2023영업실적.xlsx"
],
[
"1q74alrQij4mAsEYOWGc7F0e3QaI-mqGDQmViM_5aam4",
"17a-u131JlXujxGscicKzmFSLrRS41Bhu",
"2024 영업부 실적 및 계획"
],
[
"1KIwmCuhLMUY5-SEuo2cJeclpn3IfV6ZN",
"17a-u131JlXujxGscicKzmFSLrRS41Bhu",
"2024 영업부 실적 및 계획.pptx"
],
[
"1UHbCMKoFQjvL3kzltYzZQrRyyYrOJwvA24rtHCtTHpY",
"17a-u131JlXujxGscicKzmFSLrRS41Bhu",
"2024영업실적"
],
[
"1P1NApIb80CQpENzZXRgWS1g3Yne7gMCg",
"17a-u131JlXujxGscicKzmFSLrRS41Bhu",
"2024영업실적.xlsx"
],
[
"1Y5zA18FRqoXgRCGEWskLY-guf7qD1a64okGYMsqKrAU",
"17a-u131JlXujxGscicKzmFSLrRS41Bhu",
"2025 Sales Performance & Plan (Final wit"
],
[
"1-m51IhbLMDOzoh-lvOXgVguEMS-yTVeDlLE0gexD5Go",
"17a-u131JlXujxGscicKzmFSLrRS41Bhu",
"2025년 수주실적"
],
[
"1vDFep5gZVYYYEeqJdesHHXdzoikEAkyi",
"17a-u131JlXujxGscicKzmFSLrRS41Bhu",
"2025영업실적 (1).xlsx"
],
[
"1JmhIdA0BUKowAeAMSvCgcnHDCfGMYQC7XrDvNutpyiQ",
"17a-u131JlXujxGscicKzmFSLrRS41Bhu",
"2025영업실적 (2)"
],
[
"1dfaTfhohfWHuU-jNoW1JmlWSigKRC-Cg",
"17a-u131JlXujxGscicKzmFSLrRS41Bhu",
"2025영업실적 (2).xlsx"
],
[
"1ajIcTDs-cYszqI16YQlfGhzfK9uNY4io",
"17a-u131JlXujxGscicKzmFSLrRS41Bhu",
"2025영업실적.xlsx"
],
[
"1oX8kmsTWqnddyLCwi_vJHwbXnlMYIjIH",
"17a-u131JlXujxGscicKzmFSLrRS41Bhu",
"2025영업실적.xlsx"
],
[
"1VBwBGC82dmH2iWaAMqimU-ib2L6Ey9tD",
"17a-u131JlXujxGscicKzmFSLrRS41Bhu",
"24년 매출.xls"
],
[
"1vVu2dWbDxyOh8ltyM3FpOYcdv3GQ1MFFFQE25U2Q9uI",
"17a-u131JlXujxGscicKzmFSLrRS41Bhu",
"25년 매출실적"
],
[
"1p56qArMwRah4vEAoFdi5uBwHsQrzFgGD",
"17a-u131JlXujxGscicKzmFSLrRS41Bhu",
"25년 매출실적.xlsx"
],
[
"1Nzttr0pZeODxXCfnJXDqXiGvDd_Mf0fIC6y8Fn4zFgA",
"17a-u131JlXujxGscicKzmFSLrRS41Bhu",
"매출대비 경비 (2)"
],
[
"1bC_OA5W-o1aR6fGkCEBoT2nsFrKYa0p5Bdc4XL1YJ0A",
"17a-u131JlXujxGscicKzmFSLrRS41Bhu",
"매출대비 경비 (2)"
],
[
"1RFHIBAb04RiZI9jdKUIopmk-kmYwaFoX",
"17a-u131JlXujxGscicKzmFSLrRS41Bhu",
"매출대비 경비 (2).xlsx"
],
[
"1g7S4dZEUcf63WMaBuXSm68wNpB1evEgDLXqGIVbhOUc",
"17a-u131JlXujxGscicKzmFSLrRS41Bhu",
"사장님 포함 영업 견적서 목록"
],
[
"126BPKbAFjwCKfH16Bk1h6Ovhs088ZYSQ",
"17a-u131JlXujxGscicKzmFSLrRS41Bhu",
"사장님 포함 영업 견적서 목록.xlsx"
],
[
"1_d47W9hRKN-7Ni6yZKmnnwTDODt02c6L",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"(TIPASCOPE-01)_딥테크_챌린지_프로젝ᄐ"
],
[
"1SJzjaAOtvXEhR9SJv9x7ceK1yMpqW2ob",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"(주)세미코_기울기센서 도면.pdf"
],
[
"1GVxjpzMd57RsKXrwm7h0OJRLwD7WUBZc",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"02_IDS_User_Manual_v1.7.9.pdf"
],
[
"1qXu2w9UPCjRbG-QM2FOvPyh4-W8dU5Hq",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"03_IDS_Interface_Manual_v1.7.9.pdf"
],
[
"1UZk72LJJ2bV3OvGMH5vC524HA_eEkjX7",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"04_IDS_Wave_Manual_v1.3.pdf"
],
[
"1JjxuE88BDeEtc3CaY-Lq3g-QGGzP1dD6",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"1000FR-DS-1.pdf"
],
[
"1Faxw32t3-h87ApIrE_m8kK6f9BHZw_Q6",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"2408035_R1_대영씨앤티_산업용 컴퓨터 교체.pdf"
],
[
"1fwqf-YKJkA0R1BJptc9WYMEGFZq5bRkx",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"241008_2nd.zip"
],
[
"1NIhzmnZEn8kNYVXNUUXMRbM-9ld5z2Ys",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"2605096_성일기공_유압원 오버홀_필터엘리멘트 교체.pdf"
],
[
"1dcovGG_6KLSY8xT7xrSnc3u-83CStL7_",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"4WIS_SBW_4WS_EMB.pdf"
],
[
"1Pb2qRC30F1FCk-epEoJKFYzRvKVxyJ-E",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"70kw 로터샤프트_SR _ 관련 자료.pptx"
],
[
"1gsea5Jqj3EOF0Vujq7h1qPmIK5x2dWjfeGBf7-d2HIA",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"Cell External Short Tester_Manual의 번역된 사"
],
[
"1XZA2rHHwXaIEF1cC-0zQWczQnj9lXmRj36TtpkWvJlg",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"Cell External Short Tester_Software Manu"
],
[
"1cdml2bKsJbwvebFB6lQIOYLj-BENV-OowB8Nf16hX_I",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"Crush Test Machine의 번역된 사본"
],
[
"1e6fdFuVx9DpfIt_CHvr8XapZ8Xb4jHnw_SrxSRaMDQM",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"Damping Force Software Manual"
],
[
"1QuqprhjICaoQb1l4IYhhYcWR934frVLETvMrbXDStcc",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"Damping Force Software Manual의 번역된 사본"
],
[
"15ukTc7LGkirUCSU-GRyYIAQdSBpjCCoi",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"Downloads.zip"
],
[
"1iRl6BAPksJRhy1y15aiSzGGSy96FDQvw",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"F00000_IDLER_구동부 UNIT.dwg"
],
[
"134IG3Y_BXkhg10Rxwo9Cg7DtBSmpaAxX",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"F00000_구동부 UNIT.dwg"
],
[
"1CCDfnaMa2RePoKWLpaczGRmBMO7kZykq",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"F00000_구동부 UNIT.dwg"
],
[
"1KGZaPXchVZV2ZGQC2tc3euDotJTEOfwp",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"F00000_구동부 UNIT.dwg"
],
[
"1B_lN92u6MlNm6Lr7-7tzKmTsEDqAOyUl",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"FMB2.xlsx"
],
[
"1aNBQ8afIvV7feOM6Th4McZwAEUl3OOWVa0E1u7zK8Qs",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"Glass Bead Machine 시장 규모 "
],
[
"16V6otsDNGmqOjrCCleTFze_hWxhTHiGo",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"IP시험기 자료.hwp"
],
[
"1t3f9p3qiQzL2vyIEW4fwqP-VwD4pU4ALFuzDK3JxMoA",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"Impact Test Machine의 번역된 사본"
],
[
"1824gedKnY0WAtC9UpcXBxkcJZ6o78jxmOLu2GzKcg6I",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"Internal Short Circuit Test Machine의 번역된"
],
[
"1B4klWiC7HFwRe15UpQB8c6i6n8fYihnE",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"LMG 2205 부정형 상온길이측정기 설명자료240327.pptx"
],
[
"1Oide_cXpmuNXCCd832m4uVK-HGaaosoT",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"LMG D7-607HS-J-메뉴엘.pdf"
],
[
"1vrlCPiS0xQKX0yy8bTFwWWSzwkuCCETHhk9zd985hYg",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"LX3_XP9577-22000_SHAFT PINION ASS'Y(최신도면"
],
[
"1xzRwnJJbXa7X9O99PAwGvyKm9jgUsXYQ",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"LX3_XP9577-22000_SHAFT PINION ASS'Y(최신도면"
],
[
"1XB34PBTcFHJ_4NcBUlidVvR4QpCQ8pvm",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"LX3_XP9577-23000_SHAFT INPUT (최신도면)_23-1"
],
[
"1g2UNx67Unr1OCSHwcIdwAikC4ggXihoa",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"Laser Interometer sensor_IDS3010_SMF.pdf"
],
[
"1EnGp0f_VNkxI-TU0mth7pQxzyS3lPV6a",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"MANUAL_CUT & CHIP TESTER.docx"
],
[
"1fRphPfLDPApGJPBhgRAb3fmijnYxZp_qTaMR8Mt5o_8",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"MOOG G761 SERVO VALVE"
],
[
"184yR4FjWAVo_lmFHwWrBq4cVT13dqDma",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"NTN_TR86_pp50-55_한글번역_그림포함_공작기계주축용센서내장베어"
],
[
"18SJ-kaHs1KEPbGhhQ74tKU11FkxsQAqz",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"NTN_TR86_pp50-55_한글번역_원본도판수록_공작기계주축용센서내장"
],
[
"1tywzAZboHkt75dHRruGlYHI1O15JwKXu",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"NTN_TechnicalReview_86_p50-55_한글번역_공작기계주"
],
[
"1zMBWcnc3y3jSIJalt-JfSFStPenRphGkl7YmXgpY0fU",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"Nail Test Machine의 번역된 사본"
],
[
"1_yvTMOoegSxe4vkt7VGjUNbAG8oMVe3twcfXYTW75dA",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"PULSE WIDTH MODULATION 부품의 시험에 필요한 것은?"
],
[
"1fBipFpY5r_Ef98cGdwna099zdwEYRDWB",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"Package.zip"
],
[
"1C2hPy57crX_BBq9F2UdZ6PK51cbX5uLj",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"Pedal 내구시험장비 자료_20240528.xlsx"
],
[
"1sw305whI8qBYgH5uPamOLXWBxWgaAYn6",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"QuillRate program manual.pdf"
],
[
"16bcLLH3-qPE1Qu2O7J1EYMugxlgyOd9A",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"RENISHAW RLE_fibre_optic_laser_encoder_i"
],
[
"1Jz7aoqe9SUInQsROeLLxjJgD3z1WzAdE",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"RLE_system_performance_data_sheet_.pdf"
],
[
"1uF15F87ZNC95eLZMh1tlVB5LXFaVVRRz",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"S-170F2.pdf"
],
[
"1Xxor48N1Yix9D_zv-YZxHG-hKIJy-Wjg",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"SY-Q2605183_Kyoung Sung_260520.pdf"
],
[
"1af5Sq46N8KGcxbfLtid8fK0g2fmrBVi19DML2LlH1MI",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"Vascat MAC-QI 서보모터 정보 요청"
],
[
"1FXbLBZJsO3MCfVscEUueP6q_YaHma2Ny",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"X00000_커넥터 삽발 내구시험기.STEP"
],
[
"1fAJKBSVVMxoj7HfqqTyLx0l3RStErs9-",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"lmg7D.pdf"
],
[
"1iOJAT0rtinU3RTlkJo1IjbPLbitNUNJO",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"경성시험기 20240919 XL-80 Linear systems.pdf"
],
[
"1fJ4TpERE-jJ3sbROsVTB-jVttiLJxs0e2bLoF4aMv6s",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"고온 내화물 탄성율 측정의 광학적 정밀도와 오차 분석"
],
[
"1I3cRd3POgjEsK2eEdq86B0W3yJFVi165",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"규격.xlsx"
],
[
"1mKgmb7ci-DQwaFKYwV4NvIiz1sbj7wvw",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"금속실리콘에대하여.pptx"
],
[
"1cUy_Cvu56r8NxbHiDw_4lTdMHJSDhPAG_tvXA_8kyiI",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"내화물 고온 탄성율 측정용 레이저 초음파 정밀 분석 장비"
],
[
"1MfBbpQHbQ6pbTgpU1GYPxmXFiBBCv1g-7cXVx2Xbthk",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"내화물 분석 진동밀 장비 조사"
],
[
"1wPjvhqpoDZWgQa3dDoC5x_bgDc2n0EtS0oZHMY2RppY",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"내화물 유지관리를 위한 비접촉 레이저 초음파 절대 응력 측정 시험기 구현"
],
[
"19Mvb0EYXi1_3eBoygNZyp0mLTFvGB24SMN7ut2Yv2fI",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"레이저 초음파 기반 고온 내화물 탄성율 측정 공정"
],
[
"1mDBfxkMySzVMPA2EeJIcy3TqUE4rye2-p7aR--pKov8",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"로봇 유성감속기 최대 회전속도 조사"
],
[
"1iGcheYhAUvnZYNmyuCKXFSzkD2lvyf3I",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"매뉴얼_코어쉘2존챔버(이노벡스).docx"
],
[
"1D5YT9hz_C9T-2DQySnCOc6X_vywZy32G",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"메뉴얼_오존열화시험기.zip"
],
[
"1A0hkFaLFzxgLWVB40NDCeDnpCyhKP9Kz",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"박재현과장_DAS20260519142934.pdf"
],
[
"1A4O_ug6PonqK-mGXrl50cnAT7_M-hvF4",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"박재현과장_DAS_260519_1429.m4a"
],
[
"1SkUJcxpK5YAC9zccYdCZAv5SRiO9XqlE",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"비례릴리프RZMO.pdf"
],
[
"1O2yVW-M58hS67bW-CWhCJ2v7VFn9zVrJxxCCPrHNzx8",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"비접촉 레이저 초음파 기술의 원리와 이점"
],
[
"1fhg_KuK3cDtyL-ZfppiuM-asUseFntZl0uVpxCIt8eI",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"스틱슬립시험기"
],
[
"1S0E8MNzuTiD_4yMbxz5-kGhEMcxhkGkyAxHcTKqZU98",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"실시예_기어시험지그_한글합성"
],
[
"17vpcmJvqTz7VlAlWmGsNcLU-dOw5muY0i-q5A5a2RJI",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"열노출 챔버의 번역된 사본"
],
[
"1aLMSoSwiKq4aGUEiBOhpnTNTy1DPXqzE",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"외형.pdf"
],
[
"1WbDtoT9KuOcS18hGrah6QTZUdjxXZXLm4Zv4lrTPQ_A",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"유압 내구성 평가 장비 규격 및 제어기 사양 비교"
],
[
"1w7f4PTnUetsI4P1uvjZpnCbTS4JbCp1IWbww8lrLJew",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"유압 내구성 평가 장비 규격 및 제어기 사양 비교"
],
[
"13f7q4J0LS8kSGoeia25RNcAWAiaIHSyoTpdm0KnRsyk",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"유압식 로터리 액추에이터 장단점 비교"
],
[
"1PWMr7RimnNFmO23WDY24z8EGnFyM5rcV",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"첨부 #2. 치,공구 집계표(시작품).xls"
],
[
"1y7ZVhtjBJZuVmOuFzy59hW4C679fPWsG",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"칩컷 시편 만드는 방법.pdf"
],
[
"1M7qB8cMb1FbCP_zfaUVX_IhyKhbiuI_VQgNdhovxGOg",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"펌프 유량 LPM 단위 변환"
],
[
"11Qj5dZab6K1ZRjoUjT7YFfosClJaMOC314r4KdceH30",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"펌프 토출량 계산 시트"
],
[
"1RZqNN6W-cOIX_tkjB8mvktdjatot67_j",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"프로그램매뉴얼(KStester10.0).pdf"
],
[
"1gIShjkw0RRnf_cdNjstVhUJXh_B_ZxJT-yOcoGgvoiw",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"한글_KSRTC-V1 단축 디지털 컨트롤러"
],
[
"1cWzuOxugUb_P7rvk2M3MkO0PjD79oh1SASaK_LJD3NE",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"형광 X선 시료 전처리 "
],
[
"1oac7HWD6COyHNnh6qZhmZT5oxr2ok2ySLxIXvX88zQ0",
"17H388fZld_LbRjrzEIScS8dTG2BgSnD8",
"힘교정기를 도입하는데 있어서 기대할 수 있는 활용방안과 효과를 A4지 한"
],
[
"1zBS0Z1elAHtGd0Pt6Zzphn8dgZnvVXf-",
"1AECMyBsalrNvonGE_qvSqo70QaMRl3bN",
"1.업무매뉴얼 및 업무절차서 제 개정 마스터플랜_20250107.xlsx"
],
[
"1Jo5KxA9rtmLFlu0V5Rn_yheuWPXGkv_H",
"1AECMyBsalrNvonGE_qvSqo70QaMRl3bN",
"2.업무절차서 목록_발굴 확정.xlsx"
],
[
"11Kvvynh3mB54OrI7f1MG6KECfsRXNZnp",
"1AECMyBsalrNvonGE_qvSqo70QaMRl3bN",
"2026년 계산서 발행·미청구 현황 (11 15 기준)_양길모 수정완료."
],
[
"1G1fxPdVYyB4aHhCEVRqmm1bB2aBHD0l9",
"1AECMyBsalrNvonGE_qvSqo70QaMRl3bN",
"K0813 (1).xlsx"
],
[
"1m1MCbZdl1hKr3cqUgaol16H4IMkVX_6m",
"1AECMyBsalrNvonGE_qvSqo70QaMRl3bN",
"TBM양식지 (1).xlsx"
],
[
"1cEtFVD7h0HpPZ1CWAFHUBeP4IYbYeAYR",
"1AECMyBsalrNvonGE_qvSqo70QaMRl3bN",
"개인연대보증에 관한 약정서_경성시험기.docx"
],
[
"1jYCFfIhetVmb1ScQO8-CNihfnRF6WySk",
"1AECMyBsalrNvonGE_qvSqo70QaMRl3bN",
"경성시험건설기계 작업계획서.pdf"
],
[
"1ufZqqeXwmB1s6RDhrgGzQffPQBmJUpqw",
"1AECMyBsalrNvonGE_qvSqo70QaMRl3bN",
"경성시험기_A급 일반작업 안전대책서 (1).pptx"
],
[
"1QXWUJSLRdqn5qbCes3K-JlkIb59YyF1t",
"1AECMyBsalrNvonGE_qvSqo70QaMRl3bN",
"경성시험기_메일점검"
],
[
"1vH70D5FAxJJ6DoZvCLCSySJz1KC6uJ5L",
"1AECMyBsalrNvonGE_qvSqo70QaMRl3bN",
"경성시험기_중량물취급작업계획서 (1).pdf"
],
[
"1b5dgaoleuHzkdhBvvBMmZLPgk1rTxdS3",
"1AECMyBsalrNvonGE_qvSqo70QaMRl3bN",
"교육일지(업체용) (1).xlsx"
],
[
"11V2AxrMPiC1weC8BB0G9RPZgAZwL91Jt",
"1AECMyBsalrNvonGE_qvSqo70QaMRl3bN",
"문의_개인연대보증에 관한 약정서_경성시험기.docx의 사본.docx"
],
[
"1fyFFCRO7l0rFiEFN9FogztZgjmbHrFK7",
"1AECMyBsalrNvonGE_qvSqo70QaMRl3bN",
"불확도추정보고서-양식-30개 260123.xlsx"
],
[
"1B64XfW2bcI9CjcHb3y3Sg4IyL8TZUnUr",
"1AECMyBsalrNvonGE_qvSqo70QaMRl3bN",
"안전작업허가서.xlsx"
],
[
"1IjN3dPACL8AVxP_OmQF9Hja73TLPQ0Z4prNj1aI-Uz4",
"1AECMyBsalrNvonGE_qvSqo70QaMRl3bN",
"업무 flow chart 작성사례"
],
[
"1UvmBT1XM_rwwd57ZcIGYoFBWApVA0yBa",
"1AECMyBsalrNvonGE_qvSqo70QaMRl3bN",
"업무 flow chart 작성사례.pptx"
],
[
"1IxVpiv9hyHCO6sQ6LB3ekgDuANki5L_53r4aiTW_m3c",
"1AECMyBsalrNvonGE_qvSqo70QaMRl3bN",
"영업_스페셜리스트_업무_표준_매뉴얼_Ver1.0.md"
],
[
"17MODGGtYRi3ZQHhKQcaaVkpIdLtSQ_Gy",
"1AECMyBsalrNvonGE_qvSqo70QaMRl3bN",
"영업부 매뉴얼 _검토안.docx"
],
[
"1W3XdBgpPBWRLkK3GbENf_Sa0D615t8bs3LM7sV2iM5U",
"1AECMyBsalrNvonGE_qvSqo70QaMRl3bN",
"영업부_연초 부서발표"
],
[
"1VmyrpRJBnPhzrfDMijvCFV761rNhksk1aQGWIBCxksY",
"1AECMyBsalrNvonGE_qvSqo70QaMRl3bN",
"주간 일정 및 업무보고"
],
[
"1zNEfJ8gmQelDtrCdqmOH5o9tgoUHwsGR",
"1AECMyBsalrNvonGE_qvSqo70QaMRl3bN",
"주간 일정 및 업무보고.xlsx"
],
[
"1eAeLMu8pZhVNLRDEj_b1PrPCi1GOgXrS",
"1AECMyBsalrNvonGE_qvSqo70QaMRl3bN",
"첨부1. 공사안전감독자 교육신청 매뉴얼.pdf"
],
[
"1A0CV4peHethxdZxVNYFwknOTlCieKwcR",
"1AECMyBsalrNvonGE_qvSqo70QaMRl3bN",
"첨부2. 연구소 공사안전관리 가이드북 (1).pdf"
],
[
"1EySrEkmGX4syXhOjjKAXhFAa2FqdC5q6",
"1AECMyBsalrNvonGE_qvSqo70QaMRl3bN",
"첨부4. 모바일 공사안전관리시스템 매뉴얼 (3).pdf"
],
[
"1ga1IliIa-auoE1mppW-Tq7Z_aOIrP6ec",
"1AECMyBsalrNvonGE_qvSqo70QaMRl3bN",
"통장사본.pdf"
],
[
"1prVohbBkHqqskSH2jOccP-A2qHXoxF1v",
"1AECMyBsalrNvonGE_qvSqo70QaMRl3bN",
"투자기업 동의서_남양넥스모.pdf"
],
[
"14GEio_4WJoE-zJ0oFK5JTRplJRlmWqFgnSBVsBXVOBE",
"1s86oVUsuRErGBUD-KioFixAXUbATdA3E",
"구글 AI 도구 비교 가이드"
],
[
"1tWXw2FBhcRx3QKbpDfBOX-Y4M6KJ3ez1tnV5uHMcdNA",
"1s86oVUsuRErGBUD-KioFixAXUbATdA3E",
"구글 AI 도구 비교 가이드"
],
[
"1J5LjqLl55SAcwJE5QZUwf3OigirJINzpKJItMeJa_Ow",
"1s86oVUsuRErGBUD-KioFixAXUbATdA3E",
"컴퓨터 폴더를 프로젝트처럼 활용하는 방법"
],
[
"1RSdTUQxzUGbJolvo0XKkmOdLJyF2kUA2",
"1Frurl2LZkbXwH4pJ5lKqjpkJlgC_UpH1",
"AWB#779969950411.pdf"
],
[
"1h7as4oUWtUc1OKtq4QBUCsSMxCJSDSzIDlOE8VnTlvs",
"1Frurl2LZkbXwH4pJ5lKqjpkJlgC_UpH1",
"CUT & CHIP TESTER Manual (English Transl"
],
[
"1g5l71922wsGE06YIF5Ud1jWP0pIcOd4K",
"1Frurl2LZkbXwH4pJ5lKqjpkJlgC_UpH1",
"Commercial Invoice MJ23120701_20231205_0"
],
[
"14JVGZBELkDLO8Sta2WqiapyJMnMC6EXZ",
"1Frurl2LZkbXwH4pJ5lKqjpkJlgC_UpH1",
"Commercial Invoice MJ23120702_20231205_0"
],
[
"16i1TY7-zAXMSLSPNrxTN2_hBrCyMNQWJ",
"1Frurl2LZkbXwH4pJ5lKqjpkJlgC_UpH1",
"DEBIT NOTE_KSTM-26-01-01.pdf"
],
[
"1kkOdynP9KijsJplm7b0G1RfH3-Mczzzp",
"1Frurl2LZkbXwH4pJ5lKqjpkJlgC_UpH1",
"DEBIT NOTE_KSTM-26-01-01_1.pdf"
],
[
"1Civc3Uhl6FrsNaP2eUl7or-9ZiW8LqLL",
"1Frurl2LZkbXwH4pJ5lKqjpkJlgC_UpH1",
"Debit Note_KSTM-26-01-01.xlsx"
],
[
"1wC5bJ7N_NcCqvJHgB_3PPhDimmjPDBXv",
"1Frurl2LZkbXwH4pJ5lKqjpkJlgC_UpH1",
"EMS EN289894665JP_20231207_0001.pdf"
],
[
"19VxZN2nKtUPLtSM4GIp0zlmIlIikNmwp",
"1Frurl2LZkbXwH4pJ5lKqjpkJlgC_UpH1",
"EX772511075280.PDF"
],
[
"1p19yytTWx8naHlqfRXHGjEd27vD57bhJWFjYgO2yyhw",
"1Frurl2LZkbXwH4pJ5lKqjpkJlgC_UpH1",
"KSRTC-V1 Hardware Manual (English Transl"
],
[
"1ytmuDJVbRDemBgoqE2rgLt5L9EqgQj7LclUnYlQhdo8",
"1Frurl2LZkbXwH4pJ5lKqjpkJlgC_UpH1",
"KSRTC-V1 Hardware Manual (English Transl"
],
[
"1qIifbKrEpY9XL790ZFlKUBSJplc7V3YuXZYyk-DNh38",
"1Frurl2LZkbXwH4pJ5lKqjpkJlgC_UpH1",
"KSRTC-V1 Software Manual R2.15 (English "
],
[
"14Vn8dvSNimgLld9oxi2WOpL760ffFEnN",
"1Frurl2LZkbXwH4pJ5lKqjpkJlgC_UpH1",
"KStester_Thai_Manual.pdf"
],
[
"1pUqIhFqBEHu8rBCXGxnF2STxrPni5zLb",
"1Frurl2LZkbXwH4pJ5lKqjpkJlgC_UpH1",
"MgO 원료_정리본_中文.pptx"
],
[
"1Kl6Tg16ge-w4rc_zBns0Za9Oj98AXrli",
"1Frurl2LZkbXwH4pJ5lKqjpkJlgC_UpH1",
"NILGS2410006_CEPA CO(ORIGINAL).pdf"
],
[
"1TIPmZEGgWT6QemaB6zenfNOYs2C1T15H",
"1Frurl2LZkbXwH4pJ5lKqjpkJlgC_UpH1",
"Packing List_Sample.xlsx"
],
[
"1r5u99Sm7zr70Mmw2dNkJZLTASTw39mvz",
"1Frurl2LZkbXwH4pJ5lKqjpkJlgC_UpH1",
"RNI Vendor declaration.docx"
],
[
"1qy57T1Nmi2E0KnxBd4rVQRqIhkHBdssR",
"1Frurl2LZkbXwH4pJ5lKqjpkJlgC_UpH1",
"SiC 원재료_정리본_中文.pptx"
],
[
"1dTax2o6tnz1zwrzVB-09LXjXGukIpJh4",
"1Frurl2LZkbXwH4pJ5lKqjpkJlgC_UpH1",
"Universal Testing Machine 프로그램 사용설명서_베바스"
],
[
"1ugJ1aFTR-Byk-pXXGA4bnfXFOQpj6Qa8GWLbXV6YHIw",
"1Frurl2LZkbXwH4pJ5lKqjpkJlgC_UpH1",
"대리점계약서_AI"
],
[
"1KpCETP9zs4FBfciIDON7ZpFfqEOnJ604Y8NY98aO_3U",
"1Frurl2LZkbXwH4pJ5lKqjpkJlgC_UpH1",
"인도 출장 우버 영수증 정리 (2026-04)"
],
[
"114X8AXL6aAJBKJVg2e6j2TGsU9l2M7dM",
"1Frurl2LZkbXwH4pJ5lKqjpkJlgC_UpH1",
"전체_이메일_교신현황.docx"
],
[
"1YKQPJTDU9W8xCXbzndNZAvBqpbP-dySzlAYf7QTQtX4",
"1Frurl2LZkbXwH4pJ5lKqjpkJlgC_UpH1",
"중국 조향 및 현가장치 시험기 영업 타겟 리스트"
],
[
"1OO-BAqEj-cWNCJzv4QZWUKGBShTOW_Js57TIwCPQl-E",
"1Frurl2LZkbXwH4pJ5lKqjpkJlgC_UpH1",
"프로그램매뉴얼(KStester10.0)-영문"
],
[
"1eeMGIJWZK0-5fbipTqhWihKBSd1VY_pg",
"1Frurl2LZkbXwH4pJ5lKqjpkJlgC_UpH1",
"프로그램매뉴얼(KStester10.0)-영문.pdf"
],
[
"1T9Oyfatrk6Sq8NoTFFW4c2K-8y9KIN8v",
"1Frurl2LZkbXwH4pJ5lKqjpkJlgC_UpH1",
"현대북미 JV 선적서류_fv_시운전자재 Code 변경_경성시험기_2504"
],
[
"1oJpVxToc-ZefiHvCJLRRLDyS5-CtoOodAsWPLw9TvLY",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"1.  The test setup is shown in Figure 31"
],
[
"1lYP8RC_cZK4ePaAAWnBkKO_IRSzMWvurgFO44Caqcx0",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"DACELL의 TRC-2K 모델, 2kgf.m 의 사양을 알려줘"
],
[
"1OVJWwMqlFLspEbbn358A1xMjGAeUg2Ol4e5YYkN37CM",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"HC-RP353 서보모터 사양을 알려줘"
],
[
"1DEmmAVpE--xpaEZvy9yv1pV5fDM6fQolvZWQiFXFErU",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"HF-SP702 서보모터의 사양도 알려줘"
],
[
"1xKHVpJBwQ7rSPZp9BsPagnQmPmtYHgG5O2g6GMxG3H0",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"HSM에 대한 정보를 알려줘"
],
[
"1Cd54IadGoTtUSmi8VJjzuPwP58FFG23udN7_BdIAfSw",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"I.A.1        Shaft Rotational Torque Var"
],
[
"1sypX5I4a-Nq1vFrnphzfyFlCxlee5rp6fR8bcORKgjk",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"TMNR-2KNM-S 의 사양을 알려줘"
],
[
"14aDkNUhxqL01Nhj4OMD2YNktacMnVjEa20c7m2Nh4ag",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"VASCAT사의 MAC-QI-250모델을 적용해 볼까 하는데 어떨까?"
],
[
"1WvjPw6T3irya1ljxP8Gqd2t_DS4073d8S2w6ZpKRe20",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"adl 이 표로 나온 자료가 있을까?"
],
[
"1XhDazYqRjx9we9pbE_zLD2_NKjthQNxJZ9qwU9dHSIk",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"±1deg @ 20 hz 의 조건은 몇 rpm으로 계산 하지?"
],
[
"1MykUhMmSTqatMfUMxzPec68qs5XWRV01gqw_304lh-c",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"가정을 한다. 사인파 구동에서 최저점 위치, 즉 사인파의 위상 -90도 "
],
[
"1W6ZDCWi-XVuTRSxtmksBL3Jyvzy0zxhe_T7z2eysNq8",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"검토_01"
],
[
"1iHvJvH6ceSjsoo8aeGe_PiG2lCNaIceJnSljtYDCf-8",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"그래"
],
[
"14B48sTUKFd1gsa8Z0jmj_IeoNCt8qMW1URZiZ5GYQZc",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"다시 한 번 부탁할게"
],
[
"1w-8mqiWaW6GjAYMknUTQlCunUE0gKsYb3eS2tLj2rK0",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"다시 한 번 부탁할게"
],
[
"1lnGt_HFtQ3KQKVlOo99Qnuz4bocAyo36LHgFYaoObD0",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"도면에서의 시험조건 추출 (Opal App)"
],
[
"1IKj6kvaunHzox-G95yvzxNqNJSgdRff3vPYLokaFrtc",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"도면에서의 시험조건 추출 Remix (Opal App)"
],
[
"1KX9XmWFC5-PqK6y5vk97xcEO1A1Q_RMfs-IYO4Q0hes",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"번호공고명 공고번호지역 공고기관기초금액 추정가격입력일 입찰일시참가신청마감"
],
[
"1fkEo_7RlAI-HO98fNxi6S7__m3XaAkBXQDOJKytP-Ms",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"시료는 커플링이고, 고정형 토크셀을 통한 토크제어를 할 건데도 1200 "
],
[
"17CJKy_9-j5ZKuluy6Hypr0SmoctPn1RkD2AHbROrAvQ",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"시료는 커플링이야."
],
[
"10n71l_H5g4Ta2wiHTB7c9HLyJXQ1EyyIUfPMcjaD0kU",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"시험방법에 대한 문서를 만들어줘"
],
[
"1POCuspbJu5aY6pfs9n5Dnj2J5GjTSAfieXkRDpY6x4g",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"아.. 이 파일의 약정서를 참조해서 \"을\"이 어떠한 경우에도 채권 행사를"
],
[
"1vcyst__kGPbdP78DvvNCz1kK5IZPuhxWyGlVfMqzgGQ",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"아니..이걸로 오늘 아침의 입찰공고를 다시 분석해 줘"
],
[
"1UnXw3DcEXMc4PllzIEflPI-YWoPmA7qa26Wgmcq6pG0",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"엑셀로 부탁해"
],
[
"12bcGcOjbpMP6bSQsY99TYhq0Ak8BjBm1TaLR0Qoqw6M",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"엑셀로 정리하고 싶은데..."
],
[
"1vc9S2ezfNg4rmXWmyNoedKnjj8FFi0KsJvLMgXZREPA",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"연구 시작"
],
[
"1g2WY47ZSJhfa7aj9L1Ix9RzQ-jwJ69WQVWYBsczbnnc",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"영문으로 번역한 계약서인데, 중국어 간체자로 번역해 줘"
],
[
"1xG2tJYA7bc499ZDxP8hQCAJF4oD9i7Nwi7__ZAmym3U",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"영어로 번역해 줘"
],
[
"109l-7kitx7t1ewasPZXSIDU_g3zem6wlSlSSk6j9gPg",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"유압원의 정보를 정리해 줘"
],
[
"1Jnh3e12EDUsDXGhkLezG1PmwKuZ9ejliU9ecPLfVqAA",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"이 때 발생시킬 토크는 최대 2000 Nm 인데 가능할까?"
],
[
"13Qbq_KwHoe11fFzXufwThuSrRCronf6cCRZcc-dRr-0",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"이 알람은 원인이 뭐지?"
],
[
"1AWH3G8oJFEUbs1Fed7O1_2s9QI60JJkYekQ_PjfGqAU",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"이 중, 신규장비건은 몇 건씩 있지?"
],
[
"1wPKJ7mRrW-PocbuhrbpGGUV1HURIQqNH_mAhSLdqztE",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"이 파일로는 안되나?"
],
[
"1pgEHI6p5stBJN4QXylHU2Q8va9kt9had_KQfbw_EvZg",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"자.. 이제 파일들을 많이 넣을 거야. 이걸 다시 정리 해 줘.."
],
[
"1xIlk6p9qglfp9fBw_Hx-Cmdp-rQyVR4YCWybDCH7B_g",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"장비 녹색 계열로 채색"
],
[
"1IHvJrvFBF0CS0eRVc-oU-Ei2uVBuiI1ycIFPgLkC8Og",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"전자 부하장치의 부하 모드를 알려줘. CC 나 CR 같은"
],
[
"16K6fxdSDqQyyUwN8Sn1svZgPxrD4GYbSd1agroCIlKQ",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"중국어 간체자로 번역해 줘"
],
[
"1gJY68HovXh1z0mxkSX0P6NWMqjxLxowo7g3sSccCVGo",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"최대 용량 200 N.m를 내기위한 ac servo모터와 감속기를 제안해"
],
[
"1NcawVR6FP3Uq9mlHCJg545PivstuSrb1ki7PDJvoEEk",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"한글 계약서 초안을 영문으로 번역해 줘"
],
[
"1UmQnFzOJ1JupxxE27_iSx2Oh2f2w2dNjMhwbXH1o_58",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"한글 계약서 초안을 영문으로 번역해 줘"
],
[
"1IY1dMgQQClbpsXr6RfvufrwvSpapWS6aceJ-rCl-Tc4",
"1k-70-9NapGRFhzoq5RDq1_7of8egnUaW",
"📄 A4 현장 비치용 볼트 조임 토크 시트 (2장) 📌 A4 1페이지: "
],
[
"1uyhov5stUlMy3P3hYNfKsTqzxX7uuKdVMrupN0_2DzQ",
"1HTsKaNBVH5-mlmqwhLcFNYlhXf3IgdFc",
"Google Keep 문서"
],
[
"1DsmzkU2BZy_i2KKZjnj9UulBYvfUkOWGHahamNUcCU0",
"1HTsKaNBVH5-mlmqwhLcFNYlhXf3IgdFc",
"Untitled"
],
[
"162jaTVIi7O8vlSiHEaUpx5vhPBmcC2HupvfQRlwGDUs",
"1HTsKaNBVH5-mlmqwhLcFNYlhXf3IgdFc",
"제목 없는 동영상"
],
[
"1_5TQPp_mt_HhqaZBgybL2p_2aYK32yOo1R9nL5VEQm8",
"1HTsKaNBVH5-mlmqwhLcFNYlhXf3IgdFc",
"제목 없는 동영상"
],
[
"1-ZiQ2xCl0WxY39p8p9ok67LrKA1WMibLNFv0DsUMjEY",
"1HTsKaNBVH5-mlmqwhLcFNYlhXf3IgdFc",
"제목 없는 문서"
],
[
"1EZ47yIBPqC4QShaFRXyjOePAtcOzwHbKbZUpCGBCdBA",
"1HTsKaNBVH5-mlmqwhLcFNYlhXf3IgdFc",
"제목 없는 문서"
],
[
"1W_-7oSd57qQvc8iSJ-3mOfMb83-LSgxVZE7TXKhlJdY",
"1HTsKaNBVH5-mlmqwhLcFNYlhXf3IgdFc",
"제목 없는 문서"
],
[
"1F88JrngiKF0dX_UYBTGfqJg62RnMQKEBFha3TdIqXwM",
"1HTsKaNBVH5-mlmqwhLcFNYlhXf3IgdFc",
"제목 없는 프레젠테이션"
],
[
"1HyZnYwMAfsNymEfBgrvx9cWM2aCNTU8UT4PGg5gbfzE",
"1HTsKaNBVH5-mlmqwhLcFNYlhXf3IgdFc",
"제목 없는 프레젠테이션"
],
[
"1Nc3oZdrER8SOAzAqCr8m4c2CbG6VX1G4xDYciYRV8sY",
"1HTsKaNBVH5-mlmqwhLcFNYlhXf3IgdFc",
"프레젠테이션3"
],
[
"1cyfpOyi-jx3Pk6xe6nDbchwF2VbNI_uL",
"1aeoSVa6qa-yiLoLyY6T1dDe8BlHvQ7E6",
"111.JPG"
],
[
"1l4lDH3IaYEsP-B70Fdrvq9QiXnBM5xYY0faO_3aMK84",
"1aeoSVa6qa-yiLoLyY6T1dDe8BlHvQ7E6",
"111.JPG"
],
[
"1uqS6ljSkQdQuMnt0glzqeBv8lO-bUb37",
"1aeoSVa6qa-yiLoLyY6T1dDe8BlHvQ7E6",
"2018-10-12 11.19.50.jpg"
],
[
"1v6dPtbivSqVh3wWs_d-sFkAH_vWF2WzF",
"1aeoSVa6qa-yiLoLyY6T1dDe8BlHvQ7E6",
"2018-12-27 13.44.02.jpg"
],
[
"1MjEjt6EkojOATAYpeeiTnDmkkfGcAW03",
"1aeoSVa6qa-yiLoLyY6T1dDe8BlHvQ7E6",
"2018-12-27 13.44.19.jpg"
],
[
"10HPUBJDVdMgvNo46uXrJXmBnQ1cd8893",
"1aeoSVa6qa-yiLoLyY6T1dDe8BlHvQ7E6",
"2018-12-27 13.44.39.jpg"
],
[
"1SRUhZ9jPicUMe3oY13CLC8S6PajbVM0n",
"1aeoSVa6qa-yiLoLyY6T1dDe8BlHvQ7E6",
"2018-12-27 13.46.03.jpg"
],
[
"1mOdunXY0UkhLANpP2vUGP8lEJJ8xtSZ-",
"1aeoSVa6qa-yiLoLyY6T1dDe8BlHvQ7E6",
"2018-12-27 13.46.19.jpg"
],
[
"1e4b4ymLAVAu1L-cwVLVUdxakdJWsu1TH",
"1aeoSVa6qa-yiLoLyY6T1dDe8BlHvQ7E6",
"2019-02-13 17.15.51.mov"
],
[
"1w2vH30RnqAz_u0x8AQIxa6lu6gj-Aitp",
"1aeoSVa6qa-yiLoLyY6T1dDe8BlHvQ7E6",
"2019-06-03 13.18.07.jpg"
],
[
"1YOskzhLLpewo7WFmbFXvl-SXAohOsfc_",
"1aeoSVa6qa-yiLoLyY6T1dDe8BlHvQ7E6",
"2019-06-03 13.24.17.jpg"
],
[
"1OiWNnUMxpcPlMBLFJiS47w8tlVjnvBYU",
"1aeoSVa6qa-yiLoLyY6T1dDe8BlHvQ7E6",
"2019-06-03 13.31.42.jpg"
],
[
"1BqCUK-AdiV9zQ0NQ97IyDhK8qsnA7D6-",
"1aeoSVa6qa-yiLoLyY6T1dDe8BlHvQ7E6",
"2019-06-03 13.35.26.jpg"
],
[
"1JIHN_poxoUzls_N3vwFyAy1D5vCOCjVK",
"1aeoSVa6qa-yiLoLyY6T1dDe8BlHvQ7E6",
"IMG_5446.PNG"
],
[
"1Z71btUBgzMP_fyCnFo53Zjcy1Q1-sWIgKFfcrwk2bmo",
"1aeoSVa6qa-yiLoLyY6T1dDe8BlHvQ7E6",
"KakaoTalk_20200911_134554926"
],
[
"1eYvQHHG4mnDYmleEt1jJ0pUO51isHaQI",
"1aeoSVa6qa-yiLoLyY6T1dDe8BlHvQ7E6",
"KakaoTalk_20200911_134554926.jpg"
],
[
"1RF-z3eCTjJw6LgfgYc12XAECb4l8hSSA",
"1aeoSVa6qa-yiLoLyY6T1dDe8BlHvQ7E6",
"clipboardImage.jpeg"
],
[
"0B-LF8z4sjffebEtmZmg3aHdIQVYxaHNuZ1R6eWwwMGZSRnk0",
"1aeoSVa6qa-yiLoLyY6T1dDe8BlHvQ7E6",
"photo_2018-11-29_16-35-02 (2).jpg"
],
[
"1LMGRlBBmJ70iRUSftjKjAXPJzPDH5mNe",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"[볼트] 영업/일진글로벌 노트"
],
[
"1QSg7d-qABJzARULsJqCDMnyVErA7A3Sd",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"[볼트] 영업/현대자동차 노트"
],
[
"1dASQ1NuxikozczcQ5bu5QA4zZ71dQZQz",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"[볼트] 영업/현대엘리베이터 노트"
],
[
"19tq9GPvdfmBjmZUyROnVdJlU2lLyMf8h",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"[볼트] Claude outputs/남양넥스모 1"
],
[
"1H_4L0-qYJ_MM9tg50Exvbq3uqwA9vVX-",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"[볼트] Claude outputs/남양넥스모 2"
],
[
"1KhEZfSTlfm-3kLMmLa9szXh7jKxgoqSg",
"1zagubm3QXVdoZJ7HrshqqbqDioZIm4hA",
"[볼트] Claude outputs/남양넥스모 3"
],
[
"1bEHpWiV4nE9QhMSXncivxVF1mNk22MOE",
"1Frurl2LZkbXwH4pJ5lKqjpkJlgC_UpH1",
"[볼트] 해외고객사 폴더"
],
[
"1YuaLUSgz7XgvzfwkzewSHe2tulNoQ6Sg",
"184HJdQ_oiHeH37mAm0d0z0z9BepETG0l",
"[볼트] UTM_C#전환 폴더"
]
];

function runMoves() {
  const start = Date.now();
  let moved = 0, skipped = 0, failed = [];
  for (let i = 0; i < MOVES.length; i++) {
    if (Date.now() - start > 5 * 60 * 1000) {
      Logger.log('시간 제한: ' + i + '/' + MOVES.length + '에서 멈춤. runMoves를 한 번 더 실행하세요.');
      break;
    }
    const [id, dest, name] = MOVES[i];
    try {
      let item;
      try { item = DriveApp.getFileById(id); } catch (e) { item = DriveApp.getFolderById(id); }
      const parents = item.getParents();
      if (parents.hasNext() && parents.next().getId() === dest) { skipped++; continue; }
      item.moveTo(DriveApp.getFolderById(dest));
      moved++;
    } catch (e) {
      failed.push(name + ' (' + id + '): ' + e.message);
    }
  }
  Logger.log('이동 ' + moved + ' / 건너뜀(이미 이동됨) ' + skipped + ' / 실패 ' + failed.length + ' / 전체 ' + MOVES.length);
  failed.forEach(f => Logger.log('실패: ' + f));
}
