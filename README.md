# 🎸 ChordMaster Pro

**ChordMaster Pro**는 웹 브라우저에서 기타 코드를 학습하고, 청음 실력을 기를 수 있는 크롬 확장 프로그램입니다.

## 주요 기능
- **Interactive Fretboard**: 6현 기타 지판을 시각적으로 구현하여 클릭 시 실제 기타 소리를 들을 수 있습니다.
- **Chord Library**: 다양한 메이저/마이너 코드의 운지법을 확인하고 스트럼 연주를 들어볼 수 있습니다.
- **Audio Quiz**: 들려주는 기타 코드 소리를 듣고 어떤 코드인지 맞추는 퀴즈 게임을 제공합니다.

## 설치 방법 (개발 모드)

1. 이 저장소를 로컬 컴퓨터에 다운로드하거나 클론합니다.
2. Chrome 브라우저를 열고 주소창에 `chrome://extensions`를 입력합니다.
3. 우측 상단의 **'개발자 모드'** 토글을 켭니다.
4. 좌측 상단의 **'압축해제된 확장 프로그램을 로드합니다'** 버튼을 클릭합니다.
5. 다운로드 받은 `ChordMaster Pro` 프로젝트 폴더를 선택합니다.
6. Chrome 툴바에 아이콘이 추가된 것을 확인합니다.

## 사용 방법

### Practice Mode (연습 모드)
- **Select a Chord**: 드롭다운 메뉴에서 코드를 선택하면 지판에 운지가 표시됩니다.
- **Play Chord**: 선택한 코드의 소리를 재생합니다.
- **Fretboard**: 지판의 아무 곳이나 클릭하면 해당 음을 개별적으로 들을 수 있습니다.

### Quiz Mode (퀴즈 모드)
- **Audio Quiz**: 'Audio Quiz' 탭을 클릭하여 시작합니다.
- **Listen**: 소리를 듣고 4개의 보기 중 정답을 선택하세요.
- **Hint**: 어렵다면 'Hint' 버튼을 눌러보세요. 잠시 정답 운지를 보여줍니다.

## 기술 스택
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Graphics**: SVG (Scalable Vector Graphics) for Fretboard
- **Audio**: Web Audio API (Oscillator synthesis)
- **Platform**: Chrome Extension Manifest V3

## 라이선스
MIT License
