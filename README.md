# 📖 재고 판매 웹 서비스, Stock2U

![mainPage](/public/svg/brand/logo-text.svg) <br>

<div align='center'>

[💻 사이트 바로가기](https://www.pastforward.link)
<br>

</div>
<br>

## 프로젝트 소개

- Stock2U는 재고 소진이 얼마 남지 않은 판매 상품을 할인한 가격으로 구매자에게 판매할 수 있는 웹서비스입니다.
- 주요 기능은 위치 기반 재고 상품 확인 기능, 채팅 기능, 상품 등록 및 상세페이지,프로필 설정 등이 있습니다.

<br>

## 팀원 구성

<div align="center">

|                                            Front-End                                             |                                           Front-End                                            |                                         Front-End                                          |
| :----------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: |
| <img src="https://github.com/bear-bear-bear.png?size=120" title="" alt="정민2.png" width="100%"> | <img src="https://github.com/heejung0413.png?size=120" title="" alt="임희정.png" width="100%"> | <img src="https://github.com/Ellsy23.png?size=120" title="" alt="이준현.png" width="100%"> |
|                                              김재준                                              |                                             임희정                                             |                                           이준현                                           |
|                       [@bear-bear-bear](https://github.com/bear-bear-bear)                       |                        [@bheejung0413](https://github.com/heejung0413)                         |                           [@Ellsy23](https://github.com/Ellsy23)                           |

</div>

<br>

## 1. 개발 환경

- Front : HTML, React, Chakra UI, Recoil, TypeScript, axios, vite, husky, prettier, ESLint, babel
- Back-end : 제공된 API 활용
- 버전 및 이슈관리 : Github, Confluence, Jira
- 협업 툴 : GatherTown, Notion, Slack
- 서비스 배포 환경 : Vercel
- 🎨 디자인 : [Figma](https://www.figma.com/design/0Qmoy4VGV5lesJ2GnHj8j7/%EB%A9%80%ED%8B%B0%EC%BA%A0%ED%8D%BC%EC%8A%A4-%ED%95%B4%EC%BB%A4%ED%86%A4-2023?node-id=0-1&t=r2f98qCZlpU9L7i1-1)
- 👩🏻‍💻 이슈 관리 : [Jira](https://geezers-io.atlassian.net/jira/software/projects/SU/boards/1/backlog?epics=visible)

  <br>

## 2. 채택한 개발 기술

### React, Typescript

- React
  - 컴포넌트화를 통해 추후 유지보수와 재사용성을 고려했습니다.
  - 유저 배너, 상단과 하단 배너 등 중복되어 사용되는 부분이 많아 컴포넌트화를 통해 리소스 절약이 가능했습니다.
- Typescript
  - 안정적인 개발과 높은 코드 수준의 코드 품질을 유지하려면 정적 타입 문법을 추가해 개발하는 것이 편리하다 생각했습니다.
  - 변수 타입을 지정하고 javascript로 컴파일되어 실행할 수 있습니다.
  - 컴파일 과정에서 타입을 지정함으로써, 에러 예방과 손쉬운 디버깅이 가능했습니다.

### Chakra UI

- Chakra UI
  - React 애플리케이션을 빌드하는데 필요한 블록을 간단하고 모듈적이며 접근 가능하게 만들 수 있는 UI 컴포넌트 라이브러리입니다.

### eslint, prettier

- 정해진 규칙에 따라 자동적으로 코드 스타일을 정리해 코드의 일관성을 유지하고자 했습니다.
- 코드 품질 관리는 eslint에, 코드 포맷팅은 prettier에 일임해 사용했습니다.
- airbnb의 코딩 컨벤션을 참고해 사용했고, 예외 규칙은 팀원들과 협의했습니다.
- 협업 시 매번 컨벤션을 신경 쓸 필요 없이 빠르게 개발하는 데에 목적을 두었습니다.

<br>

## 3. 역할 분담

### 🤩 김재준

- **UI**
  - 페이지 : 로그인/회원가입 페이지, 재고 상품 지도 페이지, 레이아웃
- **기능**
  - 인증 처리
  - 재고 상품 지도 기반 서비스 구현
  - 개발환경 구축 (vite 사용)

<br>
    
### 👻임희정
- **UI**
    - 페이지 : 상품 등록 페이지, 상품 상세 페이지, 프로필 페이지
    - 공통 컴포넌트 : 이미지 업로더 컴포넌트 구현

- **기능**
  - 상품 등록 기능 구현 (이미지 파일 업로드, 제목/상세설명/기간 지정)
  - 판매자 구독 기능
  - 프로필 설정

<br>

### 👩🏻‍💻 이준현

- **UI**

  - 페이지: 메인페이지, 프로필 페이지
  - 공통 컴포넌트, 이미지 캐러셀, 페이지네이션, 인피니티스크롤 컴포넌트 구현

- **기능**
  - 메인페이지 전체적인 기능 구현

<br>

<br>

## 4. 개발 기간 및 작업 관리

### 개발 기간

- 전체 개발 기간 : 2023.09.24 - 2023.01.09

<br>

### 작업 관리

- GitHub Projects로 백엔드와의 issue 상황을 파악하며 프로젝트를 진행하였습니다.
- issue 번호에 따라 브랜치 네임을 정하며 전략에 맞추어 브랜치를 생성하였습니다.

<br>

<br>
