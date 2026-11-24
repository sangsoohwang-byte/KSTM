/**
 * 경성시험기 구글 드라이브 정리 4단계: Obsidian-Vault/프로젝트 → 06_Projects 합치기 (2026-11-25)
 * 사용법: script.google.com > 새 프로젝트 > 기존 내용 지우고 붙여넣기 > 저장 > runMerge 실행
 * - 프로젝트 폴더 2개를 폴더째 06_Projects로 옮깁니다 (안의 파일은 그대로 따라감).
 * - 그 뒤 비게 된 `프로젝트`, `Obsidian-Vault` 폴더는 비어 있을 때만 휴지통으로 보냅니다 (30일 안에 복원 가능).
 * - 끝나면 이 스크립트 프로젝트 자신은 휴지통으로 보냅니다.
 */
const DEST_06_PROJECTS = '184HJdQ_oiHeH37mAm0d0z0z9BepETG0l';

const MOVE_FOLDERS = [
  ['1xzU6ffKvN81R7yWDzOb1or2tEEEiA0s_', 'NNI 투자계획 (러프견적 xlsx + 검토 노트)'],
  ['16oVtd-LN_lZm7biordM-h7_mdZmD5Ovc', '지반경사계 (프로젝트 진행현황 노트)'],
];

// 안쪽부터 순서대로: 프로젝트 → Obsidian-Vault
const TRASH_IF_EMPTY = [
  ['1M7SIAI3Aqg5kbqFImkJ_ys8ha7ZHRgwv', '볼트/Obsidian-Vault/프로젝트 (빈 폴더)'],
  ['10G2QYkyarhJYVatKd5UEGvEHlbaLMAAU', '볼트/Obsidian-Vault (빈 폴더)'],
];

function runMerge() {
  let ok = 0, fail = [];
  const dest = DriveApp.getFolderById(DEST_06_PROJECTS);
  MOVE_FOLDERS.forEach(([id, name]) => {
    try { DriveApp.getFolderById(id).moveTo(dest); Logger.log('이동 → 06_Projects: ' + name); ok++; }
    catch (e) { fail.push(name + ': ' + e.message); }
  });
  TRASH_IF_EMPTY.forEach(([id, name]) => {
    try {
      const d = DriveApp.getFolderById(id);
      if (d.getFiles().hasNext() || d.getFolders().hasNext()) { fail.push(name + ': 비어 있지 않아 건너뜀'); return; }
      d.setTrashed(true); Logger.log('휴지통: ' + name); ok++;
    } catch (e) { fail.push(name + ': ' + e.message); }
  });
  Logger.log('완료 ' + ok + ' / 실패·건너뜀 ' + fail.length + ' (전체 4)');
  fail.forEach(f => Logger.log('실패: ' + f));
  if (fail.length === 0) {
    DriveApp.getFileById(ScriptApp.getScriptId()).setTrashed(true);
    Logger.log('이 스크립트 프로젝트는 휴지통으로 보냈습니다.');
  }
}
