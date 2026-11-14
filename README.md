# JunHo Tech Blog

흰 배경과 넓은 여백, 본문 타이포그래피를 중심으로 구성한 기술 블로그 글 상세 화면입니다.

## 화면

- 기본 주소 `/`에서 바로 첫 번째 예시 글 상세를 표시합니다.
- 상단 고정 제목, 읽기 진행률, 링크와 코드 복사를 제공합니다.
- 흰 배경에 파란 카테고리 배지와 굵은 제목, 날짜와 읽기 시간을 왼쪽 정렬합니다. 부설명은 표시하지 않습니다.
- 1800px 최대 그리드 안에서 제목 영역은 최대 1120px, 본문은 6열을 사용합니다.
- 헤더는 카테고리와 글 제목 영역의 최대 폭 1120px과 좌우 시작선을 공유합니다. 대표 이미지의 최대 폭은 1800px입니다.
- 첫 번째 샘플 글에는 레퍼런스의 대표 이미지를 표시합니다. 480px 이하에서는 9:16, 그보다 넓은 화면에서는 16:9 비율을 사용합니다.
- 본문 폭과 행간을 중심으로 한 모바일 레이아웃을 적용했습니다.
- 기존 `/posts/[slug]/` 주소에서도 각 글 상세를 볼 수 있습니다.
- 존재하지 않는 글 주소에는 404 안내를 표시합니다.

현재 글 6개는 화면 확인용 샘플입니다. CMS와 관리자 편집기는 아직 연결하지 않았습니다.

대표 이미지는 Google 레퍼런스의 외부 이미지 주소를 사용합니다. 글별 이미지는 `app/shared/data/posts.ts`의 `heroImage`에서 지정합니다.

## 로컬 개발

프로젝트 디렉터리에서 실행합니다.

```sh
npm run dev
```

터미널에 표시된 로컬 주소로 접속합니다. 기본 주소는 http://localhost:3000 입니다.

## 주요 파일

- `app/(routes)/(public)/page.tsx`: 기본 주소의 글 상세
- `app/(routes)/(public)/posts/[slug]/page.tsx`: 글별 정적 페이지와 메타데이터
- `app/(routes)/(public)/posts/[slug]/_components/`: 글 상세 조합, 헤더, 제목 영역과 본문
- `app/(routes)/(public)/posts/[slug]/_hooks/`: 읽기 진행률과 복사 동작
- `app/(routes)/(public)/posts/[slug]/PostDetail.module.css`: 글 상세 전용 스타일
- `app/(routes)/(public)/posts/[slug]/_types/`: 글 상세 컴포넌트의 타입 계약
- `app/shared/data/posts.ts`: 샘플 글 데이터
- `app/shared/constants/site.ts`: 사이트 이름과 소개
- `app/styles/`: 공통 reset, 레이아웃 토큰과 타이포그래피
- `app/NotFound.module.css`: 404 화면 전용 스타일

영문은 [Google Sans Flex](https://github.com/googlefonts/googlesans-flex), 한글은 [Noto Sans KR](https://fonts.google.com/specimen/Noto+Sans+KR)을 사용합니다. `next/font`가 빌드 시 글꼴을 받아 사이트 자산으로 제공하므로 빌드에는 Google Fonts 연결이 필요하고, 방문자는 이 사이트에서 글꼴을 받습니다. 각 글꼴의 라이선스는 `public/licenses/`에 보관합니다.

블로그 이름은 `app/shared/constants/site.ts`에서 관리합니다.

## GitHub Pages

사이트 주소는 [dijeungi.github.io](https://dijeungi.github.io/)입니다. 저장소는 [dijeungi/dijeungi.github.io](https://github.com/dijeungi/dijeungi.github.io)를 사용합니다.

`main`에 푸시하면 [배포 워크플로](.github/workflows/deploy-pages.yml)가 자동으로 실행됩니다. GitHub Actions 화면에서 수동 실행도 가능합니다.

1. Node.js 24와 npm 캐시를 설정합니다.
2. 저장소 루트에서 `npm ci`와 `npm run build`를 실행합니다.
3. 정적 결과물 `out/`을 GitHub Pages에 배포합니다.

저장소의 Pages 빌드 소스는 GitHub Actions를 사용합니다. 사용자 사이트의 루트 주소에 배포하므로 `NEXT_PUBLIC_BASE_PATH`는 빈 값으로 설정합니다.

로컬에서도 프로젝트 디렉터리에서 정적 빌드를 확인할 수 있습니다.

```sh
npm run build
```

`next.config.ts`에 정적 내보내기와 디렉터리형 주소를 설정했습니다. `public/.nojekyll`이 결과에 포함되어 밑줄로 시작하는 Next.js 자산 경로를 보존합니다. 운영 환경에서는 `next start` 대신 정적 파일 호스팅을 사용합니다.

프로필 README는 별도 공개 저장소 [dijeungi/dijeungi](https://github.com/dijeungi/dijeungi)에서 관리합니다.
