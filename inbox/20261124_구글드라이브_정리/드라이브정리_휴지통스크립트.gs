/**
 * 경성시험기 구글 드라이브 정리 2단계: 휴지통 정리 (2026-11-25)
 * 사용법: 이동할 때 쓴 script.google.com 프로젝트를 열고, 기존 내용을 모두 지운 뒤 붙여넣기 > 저장 > runCleanup 실행
 * - 휴지통으로 보낸 파일은 30일 동안 드라이브 [휴지통]에서 되살릴 수 있습니다.
 * - 폴더는 비어 있을 때만 휴지통으로 보냅니다.
 * - 마지막에 이 스크립트 프로젝트 자신도 휴지통으로 보냅니다.
 */

// 1) 내용이 있어 보존할 파일: 이름 바꾸고 제자리로 이동
const KEEP = [
  ['1uyhov5stUlMy3P3hYNfKsTqzxX7uuKdVMrupN0_2DzQ', '2025-01_업무메모_남양넥스모·프라이맥스', '1AECMyBsalrNvonGE_qvSqo70QaMRl3bN'], // 경성시험기/04_관리
  ['1DsmzkU2BZy_i2KKZjnj9UulBYvfUkOWGHahamNUcCU0', '4축 스틱슬립 시험기 고장진단 가이드', '17H388fZld_LbRjrzEIScS8dTG2BgSnD8'],   // 경성시험기/03_기술
  ['1Nc3oZdrER8SOAzAqCr8m4c2CbG6VX1G4xDYciYRV8sY', 'BMW 스티어링 칼럼 방수시험 요구사항(영문)', '1IxFNfzVOxR0SvUz27g5Bei4vmEOlU0aA'], // _보관_2022이전/03_기술
];

// 2) 휴지통으로 보낼 것
const TRASH = [
  ['1-ZiQ2xCl0WxY39p8p9ok67LrKA1WMibLNFv0DsUMjEY', '제목 없는 문서 (2021, 수식 한 줄)'],
  ['1EZ47yIBPqC4QShaFRXyjOePAtcOzwHbKbZUpCGBCdBA', '제목 없는 문서 (2021, 수식 한 줄)'],
  ['1W_-7oSd57qQvc8iSJ-3mOfMb83-LSgxVZE7TXKhlJdY', '제목 없는 문서 (2023, 빈 문서)'],
  ['1F88JrngiKF0dX_UYBTGfqJg62RnMQKEBFha3TdIqXwM', '제목 없는 프레젠테이션 (빈 문서)'],
  ['1HyZnYwMAfsNymEfBgrvx9cWM2aCNTU8UT4PGg5gbfzE', '제목 없는 프레젠테이션 (빈 문서)'],
  ['1vAnVwHp3T0_iWSVMR9i5OtC9JWU4SJVj', '볼트/무제.canvas (빈 파일)'],
  ['1SYk7qKKvWkaspYhrQoZ0ALKCeIndJQ47', '볼트/무제 1.canvas (빈 파일)'],
  ['1FH7-3MeXqyqmGdzR3_d5vWcaTlOxWF-w', '볼트/무제.base (빈 파일)'],
  ['1W_Wv-Daxh03isRaCkZ59NoyOtgv6yjfv', '볼트/무제 1.base (빈 파일)'],
];
const TRASH_FOLDERS_IF_EMPTY = [
  ['1w-XA0pgC_BcsAxI4OPfwbRWRu2xTApZy', '볼트/영업 (빈 폴더)'],
  ['1gv9SijpWf4zWehUsglu0sTeZ1XVvDXfW', '볼트/Claude outputs (빈 폴더)'],
];

function runCleanup() {
  let ok = 0, fail = [];
  KEEP.forEach(([id, name, dest]) => {
    try {
      const f = DriveApp.getFileById(id);
      f.setName(name);
      f.moveTo(DriveApp.getFolderById(dest));
      Logger.log('보존·이동: ' + name); ok++;
    } catch (e) { fail.push(name + ': ' + e.message); }
  });
  TRASH.forEach(([id, name]) => {
    try { DriveApp.getFileById(id).setTrashed(true); Logger.log('휴지통: ' + name); ok++; }
    catch (e) { fail.push(name + ': ' + e.message); }
  });
  TRASH_FOLDERS_IF_EMPTY.forEach(([id, name]) => {
    try {
      const d = DriveApp.getFolderById(id);
      if (d.getFiles().hasNext() || d.getFolders().hasNext()) { fail.push(name + ': 비어 있지 않아 건너뜀'); return; }
      d.setTrashed(true); Logger.log('휴지통: ' + name); ok++;
    } catch (e) { fail.push(name + ': ' + e.message); }
  });
  Logger.log('완료 ' + ok + ' / 실패·건너뜀 ' + fail.length + ' (전체 14)');
  fail.forEach(f => Logger.log('실패: ' + f));
  if (fail.length === 0) {
    DriveApp.getFileById(ScriptApp.getScriptId()).setTrashed(true);
    Logger.log('이 스크립트 프로젝트도 휴지통으로 보냈습니다.');
  }
}
