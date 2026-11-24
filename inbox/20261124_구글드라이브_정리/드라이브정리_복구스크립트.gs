/**
 * 경성시험기 구글 드라이브 정리: 휴지통에 들어간 보존 파일 5개 되살리기 (2026-11-25)
 * 사용법: script.google.com > 새 프로젝트 > 기존 내용 지우고 붙여넣기 > 저장 > runRestore 실행
 * - 아래 5개 파일만 휴지통에서 꺼냅니다. 다른 파일은 건드리지 않습니다.
 * - 끝나면 이 스크립트 프로젝트 자신은 휴지통으로 보냅니다.
 */
const RESTORE = [
  ['1uyhov5stUlMy3P3hYNfKsTqzxX7uuKdVMrupN0_2DzQ', '2025-01_업무메모_남양넥스모·프라이맥스 (04_관리)'],
  ['1DsmzkU2BZy_i2KKZjnj9UulBYvfUkOWGHahamNUcCU0', '4축 스틱슬립 시험기 고장진단 가이드 (03_기술)'],
  ['1Nc3oZdrER8SOAzAqCr8m4c2CbG6VX1G4xDYciYRV8sY', 'BMW 스티어링 칼럼 방수시험 요구사항(영문) (_보관_2022이전/03_기술)'],
  ['162jaTVIi7O8vlSiHEaUpx5vhPBmcC2HupvfQRlwGDUs', '제목 없는 동영상 367MB (07_기타/빈파일_확인필요)'],
  ['1_5TQPp_mt_HhqaZBgybL2p_2aYK32yOo1R9nL5VEQm8', '제목 없는 동영상 600MB (07_기타/빈파일_확인필요)'],
];

function runRestore() {
  let ok = 0, fail = [];
  RESTORE.forEach(([id, name]) => {
    try { DriveApp.getFileById(id).setTrashed(false); Logger.log('복구: ' + name); ok++; }
    catch (e) { fail.push(name + ': ' + e.message); }
  });
  Logger.log('복구 ' + ok + ' / 실패 ' + fail.length + ' (전체 5)');
  fail.forEach(f => Logger.log('실패: ' + f));
  if (fail.length === 0) {
    DriveApp.getFileById(ScriptApp.getScriptId()).setTrashed(true);
    Logger.log('이 스크립트 프로젝트는 휴지통으로 보냈습니다.');
  }
}
