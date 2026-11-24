/**
 * 경성시험기 구글 드라이브 정리 5단계: 볼트 코드 파일 정리 (2026-11-25)
 * 사용법: script.google.com > 새 프로젝트 > 기존 내용 지우고 붙여넣기 > 저장 > runCodeCleanup 실행
 * - generate_bom.py, .claude 폴더는 PC에서 쓰고 있어서 그대로 둡니다.
 *   (원본 사본은 GitHub 저장소 .claude/skills/견적서BOM/ 에 보관)
 * - 끝나면 이 스크립트 프로젝트 자신은 휴지통으로 보냅니다.
 */
const TRASH_FOLDER = ['1rfB9in15_a4LiXOkNBcTKXX8MpAZ05vu', '볼트/__pycache__ (파이썬 실행 때 자동 생성되는 임시 파일)'];
const MOVE = ['1diLf1pESZxPKiLpq8PPm7Jk74kGIgR5T', '견적서BOM_SKILL_update.md', '1s86oVUsuRErGBUD-KioFixAXUbATdA3E']; // → 04_관리/AI도입

function runCodeCleanup() {
  let ok = 0, fail = [];
  try { DriveApp.getFolderById(TRASH_FOLDER[0]).setTrashed(true); Logger.log('휴지통: ' + TRASH_FOLDER[1]); ok++; }
  catch (e) { fail.push(TRASH_FOLDER[1] + ': ' + e.message); }
  try { DriveApp.getFileById(MOVE[0]).moveTo(DriveApp.getFolderById(MOVE[2])); Logger.log('이동 → 04_관리/AI도입: ' + MOVE[1]); ok++; }
  catch (e) { fail.push(MOVE[1] + ': ' + e.message); }
  Logger.log('완료 ' + ok + ' / 실패 ' + fail.length + ' (전체 2)');
  fail.forEach(f => Logger.log('실패: ' + f));
  if (fail.length === 0) {
    DriveApp.getFileById(ScriptApp.getScriptId()).setTrashed(true);
    Logger.log('이 스크립트 프로젝트는 휴지통으로 보냈습니다.');
  }
}
