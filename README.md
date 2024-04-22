# 여행 공유 서비스 FootPrint
![image](https://github.com/dogfoot-birdfoot/footprint-front/assets/86706630/ef38d98a-b016-4993-87eb-575d4b45b9ab)

## 프로젝트 소개

### 2024.03 ~ 2024.04

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

### React, styled-component

- React
    - 페이지에 들어가는 공통적으로 들어가는 요소를 파악하여, 중복되는 부분을 제거해 추후 유지보수와 재사용성을 고려했습니다.
    - 유저 배너, 상단과 하단 배너 등 중복되어 사용되는 부분이 많아 컴포넌트화를 통해 리소스 절약이 가능했습니다.
- styled-component
    - props를 이용한 조건부 스타일링을 활용하여 상황에 알맞은 스타일을 적용시킬 수 있었습니다.
    - 빌드될 때 고유한 클래스 이름이 부여되어 네이밍 컨벤션을 정하는 비용을 절약할 수 있었습니다.
    - S dot naming을 통해 일반 컴포넌트와 스타일드 컴포넌트를 쉽게 구별하도록 했습니다.
    
### Recoil

- 컴포넌트 구조의 변경으로 props drilling을 최대한 해결하려 했지만, 공통적으로 들어가는 state에 대해서는 Recoil을 적용하여 전역 상태 관리를 했습니다.
- Redux는 boiler plate가 많이 발생하며, API 통신으로 받아오는 데이터는 react-query에서 관리하기 때문에, redux-thunk 등을 사용할 필요가 없었습니다.
- 따라서, 단순 전역 상태 관리를 위해 Recoil이 사용하기 간편하다고 판단하여 Recoil을 채택하였습니다.

### eslint, prettier

- 코드를 정해진 스타일로 관리해 일관성 있게 유지하려고 했습니다.
- 코드 품질 관리는 eslint에, 코드 포맷팅은 prettier에 일임해 사용했습니다.

### 브랜치 전략

- Git-flow 전략을 기반으로 main, develop 브랜치와 feature 보조 브랜치를 운용했습니다.
- main, develop, Feat 브랜치로 나누어 개발을 하였습니다.
    - **main** 브랜치는 배포 단계에서만 사용하는 브랜치입니다.
    - **develop** 브랜치는 개발 단계에서 git-flow의 master 역할을 하는 브랜치입니다.
    - **Feat** 브랜치는 기능 단위로 독립적인 개발 환경을 위하여 사용하고 merge 후 각 브랜치를 삭제해주었습니다.


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
## 4. 역할 분담

## 5. 서비스 기능
