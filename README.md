# 여행 공유 서비스 FootPrint
![image](https://github.com/dogfoot-birdfoot/footprint-front/assets/86706630/ef38d98a-b016-4993-87eb-575d4b45b9ab)

## 프로젝트 소개

### 2024.03 ~ 2024.04 [배포 사이트](https://ke4f765103c24a.user-app.krampoline.com/)

- 여행에 관심있거나 좋아하는 사람들이 일정과 리뷰를 공유할 수 있는 서비스입니다.
- 처음 여행을 가는 지역이라도, 다른 사람의 여행 후기를 보고 즐겨찾기를 통해 일정을 그대로 따라갈 수 있습니다.
- 카카오맵 API를 활용해, 동선을 한눈에 볼 수 있으며 리뷰와 연동할 수 있습니다.
- 여행을 다니는 사람들이 자신만의 일정/리뷰를 관리할 수 있으며 공개 여부를 설정핳 수 있습니다.
- 일정과 리뷰에 좋아요/즐겨찾기를 할 수 있으며, 인기 있는 일정과 리뷰를 모아서 볼 수 있습니다.

<br/>

## 팀원 구성
<div align="center">
     
프론트엔드
| **김주원** | **김은솔** |
| :------: |  :------: |
| [<img src="https://avatars.githubusercontent.com/u/86706630?v=4" height=150 width=150> <br/> @juwonk1018](https://github.com/juwonk1018) | [<img src="https://avatars.githubusercontent.com/u/148325314?v=4" height=150 width=150> <br/> @Rungjinuna](https://github.com/Rungjinuna) |


백엔드
| **강원빈** | **강화석** | **손승기** | **신서연** |
| :------: |  :------: | :------: |  :------: |
| [<img src="https://avatars.githubusercontent.com/u/151418023?v=4" height=150 width=150> <br/> @dev-len](https://github.com/dev-len) | [<img src="https://avatars.githubusercontent.com/u/93701776?v=4" height=150 width=150> <br/> @Tomorrow-hero](https://github.com/Tomorrow-hero) | [<img src="https://avatars.githubusercontent.com/u/124570553?v=4" height=150 width=150> <br/> @polar7bear](https://github.com/polar7bear) | [<img src="https://avatars.githubusercontent.com/u/47629804?v=4" height=150 width=150> <br/> @yeon-brown](https://github.com/yeon-brown) |

</div>

## 1. 개발 환경 및 작업 관리

#### Front-end : React, Typescript, React-query, Recoil, styled-components
#### 협업 도구 : Confluence, Jira, Github
#### 디자인 : [Figma](https://www.figma.com/file/1vW1WGiyRi3QVP5RfYi8PT/%EC%97%AC%ED%96%89%EC%96%B4%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98?type=design&node-id=0-1&mode=design&t=ptdWWcXEpRvpnVy3-0)

<img width="567" alt="image" src="https://github.com/dogfoot-birdfoot/footprint-front/assets/86706630/49b44998-3440-4331-ae1f-b7b2651b4049">

## 2. 기술 및 브랜치 전략

### React, Recoil

- React
    - 페이지에 들어가는 공통적으로 들어가는 요소를 파악하여, 중복되는 부분을 제거해 추후 유지보수와 재사용성을 고려했습니다.
    - SSR은 SEO 최적화 등의 장점이 있지만, 해당 프로젝트는 사용자 경험이 더 중요하다고 생각해 CSR 방식의 React를 채택하였습니다.

- Recoil
     - 컴포넌트 구조의 변경으로 props drilling을 최대한 해결하려 했지만, 공통적으로 들어가는 state에 대해서는 Recoil을 적용하여 전역 상태 관리를 했습니다.
     - Redux는 boiler plate가 많이 발생하며, API 통신으로 받아오는 데이터는 react-query에서 관리하기 때문에, redux-thunk 등을 사용할 필요가 없었습니다.
     - 따라서, 단순 전역 상태 관리를 위해 Recoil이 사용하기 간편하다고 판단하여 Recoil을 채택하였습니다.

<br/>
 
### Styled-Component
- props를 이용해 css 스타일을 동적으로 적용할 수 있었습니다.  
- 빌드될 때 고유한 클래스 이름이 부여되어 네이밍 컨벤션을 정하는 비용을 절약할 수 있었습니다.
- S dot naming을 통해 일반 컴포넌트와 스타일드 컴포넌트를 쉽게 구별하도록 했습니다.

<br/>

### React-query
- queryKey를 이용해, API를 자주 호출하는 data에 대해 캐싱을 하여 관리했습니다.
- 이미 캐싱된 데이터를 활용해, 데이터 로딩을 기다리지 않도록 사용자 경험을 향상시켰습니다.

<br/>

### ESlint, Prettier

- 코드를 정해진 스타일로 관리해 일관성 있게 유지하려고 했습니다.
- ESlint, Prettier를 이용해 코드 품질 관리를 진행했습니다.

<br/>

### 브랜치 전략

- Git-flow 전략을 사용해, main, develop, feature 브랜치를 활용했습니다.
    - **main** 브랜치는 배포 단계에서 사용하는 브랜치입니다.
    - **develop** 브랜치는 배포하기 전 전체적인 코드를 관리하는 브랜치입니다. 해당 브랜치에서 배포 전 생길 수 있는 사항을 점검하였습니다.
    - **feature** 브랜치는 기능 단위의 개발 환경을 위해 사용한 브랜치입니다. 기능이 완성되면, PR을 통해 merge 후 해당 feature 브랜치를 삭제해주었습니다.

<br/> 

## 3. 프로젝트 구조
```bash
├── README.md
├── .env
├── .husky
├── .gitignore
├── .eslintrc.js
├── .prettierrc.json
├── craco.config.js
├── package-lock.json
├── package.json
├── tsconfig.json
├── tsconfig.paths.json
│
├── public
│    └── index.html
└── src
     ├── App.tsx
     ├── index.tsx
     ├── assets
     ├── components
     │     ├── buttons
     │     ├── card
     │     ├── daySummary
     │     ├── dayTab
     │     ├── dropDownButton
     │     ├── footer
     │     ├── ...
     │     └── switch
     ├── hooks
     │     ├── atom.ts
     │     ├── getMemberId.tsx
     │     ├── useCustomFetch.tsx
     │     └── type.d.ts
     ├── pages
     │     ├── AddReviewPage
     │     ├── CreateSchedulePage
     │     ├── LoadingPage
     │     ├── LoginPage
     │     ├── MainPage
     │     ├── MyPage
     │     ├── RegisterPage
     │     ├── ReviewDetailPage
     │     ├── ReviewSharePage
     │     ├── ScheduleDetailPage
     │     ├── ScheduleEditPage
     │     ├── ScheduleSharePage
     │     └── SearchResultPage
     └── styles
           ├── config.ts
           ├── styles.ts
           └── theme.ts
```

<br/> 

## 4. 역할 분담

김주원
- UI 및 기능
  - 마이페이지 UI
  - 리뷰 공유/작성/상세 페이지 UI
  - 일정 생성 시 일정 불러오기 UI
  - 일정 공유/리뷰 공유 페이지 무한스크롤 구현
    
- API 연결
  - 일정/리뷰 검색 API 연결
  - 리뷰 생성/수정/삭제 API 연결
  - 내 리뷰보기, 좋아요한 리뷰 API 연결
  - 일정 생성 시 일정 불러오기 API 연결
  - 리뷰 생성 시 API를 통해 자신의 일정과 연동
  - 일정 공유 페이지에서 카카오맵 API를 연동한 장소 검색

<br/>

김은솔
- UI 및 기능
  - 로그인/회원가입 UI 및 기능 구현
  - 메인페이지 UI
  - 검색페이지 UI
  - 리뷰 상세 페이지 UI
  - 일정 공유/작성/세부 페이지 UI

- API 연결
  - mirageJS를 이용한 mock API 연결
  - 일정 생성/수정/삭제 API 연결
  - 내 여행일정, 내 즐겨찾기 API 연결 및 세부 일정 표기
  - 최신순, 좋아요순 여행일정 API 연결 및 표기

<br/>

## 5. 주요 서비스 기능

### 메인 페이지
![메인페이지](https://github.com/dogfoot-birdfoot/footprint-front/assets/86706630/0da2f21a-8bcf-4970-ba1e-dc0c2dd05a5a)

### 어행 일정 작성
![일정 생성 페이지](https://github.com/dogfoot-birdfoot/footprint-front/assets/86706630/2234c7d5-2b79-4207-9b67-e4dd6582249b)

### 리뷰 작성
![리뷰 작성페이지](https://github.com/dogfoot-birdfoot/footprint-front/assets/86706630/d25f862d-6e73-47bf-b393-ee0103439582)

### 일정 공유 페이지
![일정 공유 페이지](https://github.com/dogfoot-birdfoot/footprint-front/assets/86706630/c6a521d0-63fb-4074-886b-8f48ff081761)


### 리뷰 공유 페이지
![리뷰 공유 페이지](https://github.com/dogfoot-birdfoot/footprint-front/assets/86706630/e2e6a1e5-c7ae-4d5c-bb44-838eaeb447fe)

### 검색 페이지
![검색 페이지](https://github.com/dogfoot-birdfoot/footprint-front/assets/86706630/c985b1a9-253f-4534-aa0d-1ffd65bba810)

### 마이 페이지
![마이페이지](https://github.com/dogfoot-birdfoot/footprint-front/assets/86706630/3f406f30-9000-4b38-a604-c7a9e15c72fe)


### 회원가입 및 로그인
![회원가입 및 로그인](https://github.com/dogfoot-birdfoot/footprint-front/assets/86706630/7ef2f6b4-7667-4c9a-947d-dad943393bf6)

<br/>

![녹화_2024_04_23_02_49_32_196](https://github.com/dogfoot-birdfoot/footprint-front/assets/86706630/72d819b9-cdde-4648-ba7b-c9c4dece4ce9)



