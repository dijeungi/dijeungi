# BLOG

흰 배경과 넓은 여백, 본문 타이포그래피를 중심으로 구성한 기술 블로그 글 상세 화면입니다.

## 화면

- 기본 주소 `/`에서 바로 첫 번째 예시 글 상세를 표시합니다.
- 상단 고정 제목, 읽기 진행률, 링크와 코드 복사를 제공합니다.
- 본문 폭과 행간을 중심으로 한 모바일 레이아웃을 적용했습니다.
- 기존 `/posts/[slug]/` 주소에서도 각 글 상세를 볼 수 있습니다.
- 존재하지 않는 글 주소에는 404 안내를 표시합니다.

현재 글 6개는 화면 확인용 샘플입니다. CMS와 관리자 편집기는 아직 연결하지 않았습니다.

## 로컬 개발

프로젝트 디렉터리에서 실행합니다.

```sh
npm run dev
```

터미널에 표시된 로컬 주소로 접속합니다. 기본 주소는 http://localhost:3000 입니다.

## 주요 파일

- `app/page.tsx`: 기본 주소의 글 상세
- `app/globals.css`: 공통 스타일과 반응형 레이아웃
- `app/posts/[slug]/page.tsx`: 글별 정적 페이지
- `src/lib/posts.ts`: 샘플 글 데이터
- `src/components/article-reader.tsx`: 상세 화면 구성
- `src/hooks/use-article-reader.ts`: 읽기 진행률과 복사 동작

외부 폰트 요청 없이 시스템 글꼴을 사용합니다. 의존성이나 잠금 파일은 변경하지 않았습니다.

## GitHub Pages

`next.config.ts`에 정적 내보내기와 디렉터리형 주소를 설정했습니다.

사용자 사이트(`아이디.github.io`) 또는 루트 커스텀 도메인:

```sh
npm run build
```

프로젝트 사이트(`아이디.github.io/저장소이름/`):

```sh
NEXT_PUBLIC_BASE_PATH=/저장소이름 npm run build
```

빌드된 `out/` 디렉터리를 Pages에 배포합니다. 저장소 이름의 대소문자도 경로와 일치시킵니다. `public/.nojekyll`이 결과에 포함되어 밑줄로 시작하는 Next.js 자산 경로를 보존합니다.

아직 GitHub Actions 워크플로와 원격 배포는 연결하지 않았습니다. 정적 내보내기이므로 운영 환경에서 `next start` 대신 정적 파일 호스팅을 사용합니다.
