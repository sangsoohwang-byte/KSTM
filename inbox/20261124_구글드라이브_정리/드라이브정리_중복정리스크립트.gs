/**
 * 경성시험기 구글 드라이브 정리 3단계: 중복 파일 정리 (2026-11-25)
 * 사용법: script.google.com > 새 프로젝트 > 기존 내용 지우고 붙여넣기 > 저장 > runDedup 실행
 * - 내용을 비교해 확실한 중복만 휴지통으로 보냅니다 (30일 안에 복원 가능).
 * - 내용이 다른 같은 제목 파일은 지우지 않고 이름만 구분되게 바꿉니다.
 * - 끝나면 이 스크립트 프로젝트 자신은 휴지통으로 보냅니다.
 */

// 1) 휴지통: 남길 파일과 내용이 같거나, 남길 파일에 내용이 모두 들어 있는 사본
const TRASH = [
  ['1CCDfnaMa2RePoKWLpaczGRmBMO7kZykq', 'F00000_구동부 UNIT.dwg (같은 크기 사본 1)'],
  ['1KGZaPXchVZV2ZGQC2tc3euDotJTEOfwp', 'F00000_구동부 UNIT.dwg (같은 크기 사본 2)'],
  ['1bK0bK19jgMiZWo3HZ0UBufw0nTz4Pj3K', 'IEC 63026 ... (2).pdf (같은 크기 사본)'],
  ['1imPkUBXXc9NFE7TozkpOshsfg0BH6YQL', 'Specification of FUD01.pdf (같은 크기 사본)'],
  ['1tWXw2FBhcRx3QKbpDfBOX-Y4M6KJ3ez1tnV5uHMcdNA', '구글 AI 도구 비교 가이드 (같은 크기·시각 사본)'],
  ['1w-8mqiWaW6GjAYMknUTQlCunUE0gKsYb3eS2tLj2rK0', '다시 한 번 부탁할게 (내용 동일, 먼저 만든 것)'],
  ['1Nzttr0pZeODxXCfnJXDqXiGvDd_Mf0fIC6y8Fn4zFgA', '매출대비 경비 (2) (12월 매출 없는 이전 버전)'],
  ['1ge2KKtz0kSlfq4753ExOsACjAz726-IzUW6hs_NV8m0', '20200821_13551417_45048 (같은 쪽 OCR, 글자 깨진 쪽)'],
  ['1UmQnFzOJ1JupxxE27_iSx2Oh2f2w2dNjMhwbXH1o_58', '한글 계약서 초안을 영문으로 번역해 줘 (계약서 본문만, 다른 쪽에 모두 포함)'],
];

// 2) 이름 바꾸기: 남길 파일을 알아보기 쉽게, 내용이 다른 같은 제목은 구분되게
const RENAME = [
  ['14B48sTUKFd1gsa8Z0jmj_IeoNCt8qMW1URZiZ5GYQZc', '구매자재_HS코드_목록(2025-10~2026-01)'],
  ['1bC_OA5W-o1aR6fGkCEBoT2nsFrKYa0p5Bdc4XL1YJ0A', '2025_매출대비경비(12월포함)'],
  ['1PWopM4ZNr61YCUg8p0sdy91TNQXQitPA6HqSbnjdIeo', 'ISO 1893 내화물 하중연화점 시험방법(OCR)'],
  ['1NcawVR6FP3Uq9mlHCJg545PivstuSrb1ki7PDJvoEEk', '샤오싱진장_스틱슬립시험기_계약서_영문번역(251126)'],
  ['1TAChn7hWtglWm8S0VLJzCT1GJHcs5NuM4IMYrq2EogM', 'Letter to Northvolt 2020-05-13 (한국어 번역)'],
  ['1ouLeTG6jO2VKtjrKxO5OYGUqpSK_cesS53o71Gs3Ejo', 'Letter to Northvolt 2020-05-13 (일본어 번역)'],
  ['1w7f4PTnUetsI4P1uvjZpnCbTS4JbCp1IWbww8lrLJew', '유압 내구성 평가 장비 규격 및 제어기 사양 비교_0111(상세판)'],
  ['1WbDtoT9KuOcS18hGrah6QTZUdjxXZXLm4Zv4lrTPQ_A', '유압 내구성 평가 장비 규격 및 제어기 사양 비교_0113(수정판)'],
  ['1oX8kmsTWqnddyLCwi_vJHwbXnlMYIjIH', '2025영업실적_250806.xlsx'],
  ['1ajIcTDs-cYszqI16YQlfGhzfK9uNY4io', '2025영업실적_250903.xlsx'],
];

function runDedup() {
  let ok = 0, fail = [];
  TRASH.forEach(([id, name]) => {
    try { DriveApp.getFileById(id).setTrashed(true); Logger.log('휴지통: ' + name); ok++; }
    catch (e) { fail.push(name + ': ' + e.message); }
  });
  RENAME.forEach(([id, name]) => {
    try { DriveApp.getFileById(id).setName(name); Logger.log('이름 변경: ' + name); ok++; }
    catch (e) { fail.push(name + ': ' + e.message); }
  });
  Logger.log('완료 ' + ok + ' / 실패 ' + fail.length + ' (전체 19)');
  fail.forEach(f => Logger.log('실패: ' + f));
  if (fail.length === 0) {
    DriveApp.getFileById(ScriptApp.getScriptId()).setTrashed(true);
    Logger.log('이 스크립트 프로젝트는 휴지통으로 보냈습니다.');
  }
}
