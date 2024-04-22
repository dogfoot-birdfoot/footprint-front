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
     

| **김주원** | **김은솔** |
| :------: |  :------: |
| [<img src="https://avatars.githubusercontent.com/u/86706630?v=4" height=150 width=150> <br/> @juwonk1018](https://github.com/juwonk1018) | [<img src="https://avatars.githubusercontent.com/u/148325314?v=4" height=150 width=150> <br/> @Rungjinuna](https://github.com/Rungjinuna) |

</div>

## 1. 개발 환경 및 작업 관리

## 2. 기술 및 브랜치 전략

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
