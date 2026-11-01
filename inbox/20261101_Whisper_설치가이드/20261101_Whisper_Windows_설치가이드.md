# OpenAI Whisper – Windows 노트북 설치 가이드

날짜: 2026-11-01
태그: #업무도구 #AI #음성인식 #회의록 #영어공부

---

> **Whisper란?** 녹음 파일을 텍스트로 바꿔 주는 무료 AI 프로그램입니다(MIT 라이선스).
> 모든 처리를 **내 노트북 안에서** 하므로 고객과의 통화 내용이 외부 서버로 나가지 않습니다.
> 출처: https://github.com/openai/whisper

## 전체 흐름 (약 20~30분)
1. Python 설치
2. FFmpeg 설치 (음성 파일을 읽을 때 필요한 도구)
3. Whisper 설치
4. 첫 변환 테스트
5. (선택) 드래그 앤 드롭으로 변환하는 바로가기 만들기

---

## 1단계. Python 설치
1. https://www.python.org/downloads/windows/ 에서 **Python 3.11.x**의 "Windows installer (64-bit)"를 내려받습니다.
   - 가장 최신 버전보다 3.11이 Whisper와 함께 쓸 때 가장 안정적입니다.
2. 설치 첫 화면 아래쪽에 있는 **☑ Add python.exe to PATH**를 **반드시 체크**한 뒤 "Install Now"를 누릅니다.
3. 설치가 잘 됐는지 확인합니다.
   - `Windows 키` → `cmd` 입력 → **명령 프롬프트** 실행
   - 아래 명령을 입력합니다.
   ```
   python --version
   ```
   - `Python 3.11.x`가 나오면 성공입니다.

## 2단계. FFmpeg 설치
명령 프롬프트에 아래 명령을 입력합니다(Windows 10/11에 기본으로 들어 있는 winget 사용).
```
winget install ffmpeg
```
- 설치가 끝나면 **명령 프롬프트를 닫았다가 다시 엽니다** (그래야 새 프로그램이 인식됩니다).
- 확인:
```
ffmpeg -version
```
- 버전 정보가 여러 줄 나오면 성공입니다.

## 3단계. Whisper 설치
```
pip install -U openai-whisper
```
- 몇 분이 걸립니다. 마지막에 `Successfully installed ...`가 나오면 성공입니다.
- 확인:
```
whisper --help
```

### (선택) NVIDIA 그래픽카드가 있는 경우 → 속도 5~10배 향상
1. 그래픽카드가 있는지 확인합니다: `nvidia-smi` (표가 나오면 있는 것이고, 오류가 나면 없는 것이니 이 부분을 건너뜁니다)
2. 그래픽카드용 계산 도구로 바꿔 설치합니다.
```
pip uninstall -y torch
pip install torch --index-url https://download.pytorch.org/whl/cu121
```

---

## 4단계. 첫 변환 테스트
1. 녹음 파일(예: `D:\녹음\미팅.m4a`)을 준비합니다.
2. 명령 프롬프트에서 실행합니다.
```
whisper "D:\녹음\미팅.m4a" --model small --language ko --output_format txt --output_dir "D:\녹음"
```
3. 처음 실행할 때는 AI 모델을 내려받으므로 시간이 조금 더 걸립니다(모델은 `C:\Users\joju2\.cache\whisper`에 저장됩니다).
4. 같은 폴더에 `미팅.txt`가 생기면 성공입니다.

### 자주 쓰는 명령 모음
| 목적 | 명령 |
|---|---|
| 한국어 회의 → 텍스트 | `whisper "파일" --model small --language ko` |
| 영어 통화 → 영어 텍스트 | `whisper "파일" --model small --language en` |
| 일본어 → 일본어 텍스트 | `whisper "파일" --model small --language ja` |
| 한국어·일본어 → **영어로 번역** | `whisper "파일" --model medium --task translate` |
| 자막 파일(.srt)만 만들기 | 뒤에 `--output_format srt` 추가 |

> `--output_format`을 지정하지 않으면 txt·srt·vtt·tsv·json 다섯 종류가 모두 만들어집니다.

### 모델 선택 기준
| 모델 | 정확도 | 속도 | 권장 상황 |
|---|---|---|---|
| tiny / base | 낮음 | 매우 빠름 | 테스트용 |
| **small** | 보통 | 빠름 | **그래픽카드 없는 노트북 기본값** |
| medium | 높음 | 느림 | 중요한 회의, 번역 |
| turbo | 높음 | 그래픽카드가 있으면 빠름 | 그래픽카드가 있는 PC (번역은 지원하지 않음) |
| large | 가장 높음 | 매우 느림 | 그래픽카드가 있는 PC, 최고 품질이 필요할 때 |

> 참고: 그래픽카드가 없는 노트북에서는 1시간짜리 녹음을 small 모델로 변환하는 데 대략 30분~1시간 이상 걸릴 수 있습니다(노트북 성능에 따라 다름).

---

## 5단계. (선택) 드래그 앤 드롭 변환 바로가기
매번 명령어를 입력하지 않도록, 파일을 끌어다 놓기만 하면 변환되게 만듭니다.

1. 메모장을 열고 아래 내용을 그대로 붙여 넣습니다.
```bat
@echo off
chcp 65001 > nul
for %%F in (%*) do (
  echo [변환 중] %%~nxF
  whisper "%%~fF" --model small --language ko --output_format txt --output_dir "%%~dpF"
)
echo.
echo 완료! 원본 파일과 같은 폴더에 txt 파일이 만들어졌습니다.
pause
```
2. **파일 → 다른 이름으로 저장**
   - 파일 이름: `whisper_변환.bat`
   - 파일 형식: **모든 파일**
   - 인코딩: **UTF-8**
   - 저장 위치: 바탕화면
3. 바탕화면의 `whisper_변환.bat` 아이콘 위로 녹음 파일을 끌어다 놓으면 변환이 시작됩니다(여러 파일을 한꺼번에 놓아도 됩니다).
- 영어 녹음용 바로가기를 따로 만들려면, 복사본을 만들고 `ko`를 `en`으로 바꿔 저장합니다.

---

## 문제 해결
| 증상 | 원인 | 해결 |
|---|---|---|
| `'python'은(는) 내부 또는 외부 명령...이 아닙니다` | PATH를 체크하지 않음 | Python을 다시 설치하면서 "Add python.exe to PATH"를 체크 |
| `'whisper'은(는) 내부 또는 외부 명령...` | 실행 경로를 찾지 못함 | `python -m whisper "파일" ...`로 실행 |
| `FileNotFoundError: [WinError 2]` | FFmpeg가 없거나 인식되지 않음 | 2단계를 다시 하고 명령 프롬프트를 새로 열기 |
| `FP16 is not supported on CPU` 경고 | 그래픽카드가 없음 | 무시해도 됩니다(정상 동작) |
| 텍스트에 같은 문장이 반복됨 | 무음 구간이 긴 경우 | 더 큰 모델을 쓰거나 녹음 앞뒤의 무음 부분을 잘라내기 |
| 전문용어가 틀리게 나옴 | 업계 용어를 모름 | `--initial_prompt "만능재료시험기, 로드셀, 감쇠력, 인장시험"`처럼 용어 힌트 추가 |

---

## 다음 단계
- [ ] 노트북에 설치하고 테스트 파일 1개 변환해 보기
- [ ] 변환된 txt 파일을 Claude에게 보내 회의록으로 요약 → Obsidian에 저장 (활용법 A)
- [ ] 영어 공부용 스크립트 만들기 (활용법 C)
