export type ArticleSection = {
  id: string;
  title: string;
  paragraphs: string[];
  code?: { language: string; value: string };
  note?: string;
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readingMinutes: number;
  heroImage?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  sections: ArticleSection[];
};

export const posts: Post[] = [
  {
    slug: "understanding-react-rendering",
    title: "렌더링을 이해하면 컴포넌트가 달라진다",
    description:
      "상태가 바뀐 뒤 화면에 반영되기까지. React의 렌더링 과정을 따라가며 컴포넌트를 설계하는 기준을 생각합니다.",
    category: "React",
    date: "2026-11-10",
    readingMinutes: 8,
    heroImage: {
      src: "https://storage.googleapis.com/deepmind-media/DeepMind.com/Components/brand/4-hydrogen/blog/assets/poster-light-823051b9.webp",
      alt: "Gemini 4 Hydrogen 레퍼런스 대표 이미지",
      width: 1632,
      height: 918,
    },
    sections: [
      {
        id: "rendering-is-a-calculation",
        title: "렌더링은 화면을 계산하는 일",
        paragraphs: [
          "React에서 렌더링은 컴포넌트를 호출해 다음 화면에 필요한 결과를 계산하는 과정입니다. 컴포넌트가 다시 호출됐다는 사실만으로 브라우저의 모든 요소가 새로 만들어지는 것은 아닙니다. 계산한 결과를 실제 화면에 반영하는 과정은 구분해서 볼 필요가 있습니다.",
          "이 구분을 알고 나면 컴포넌트 안에 어떤 코드를 놓아야 할지 조금 더 명확해집니다. 입력으로 받은 props와 현재 상태를 바탕으로 결과를 계산하고, 렌더링 중에는 외부 값을 변경하거나 네트워크 요청을 시작하지 않는 것이 기본입니다.",
        ],
        note: "컴포넌트가 호출되는 횟수와 실제 DOM이 변경되는 횟수는 같지 않을 수 있습니다.",
      },
      {
        id: "keep-state-small",
        title: "저장할 상태와 계산할 값을 나누기",
        paragraphs: [
          "원본 목록과 검색어가 있다면 검색 결과는 두 값으로부터 계산할 수 있습니다. 결과까지 별도의 상태로 저장하면 원본이 바뀔 때 결과도 함께 갱신해야 합니다. 같은 사실을 여러 곳에 저장하는 만큼 서로 어긋날 가능성도 생깁니다.",
          "우선 꼭 기억해야 하는 값만 상태로 두고, 나머지는 렌더링 과정에서 계산해 봅니다. 계산 비용이 실제로 문제가 될 때 측정 결과를 바탕으로 최적화를 추가하면 상태의 흐름을 단순하게 유지하기 쉽습니다.",
        ],
        code: {
          language: "tsx",
          value: `type Item = { id: string; title: string };

// 검색어에 맞는 항목 목록 표시
function SearchResults({ items, query }: {
  items: Item[];
  query: string;
}) {
  const keyword = query.trim().toLowerCase();
  const visibleItems = items.filter((item) =>
    item.title.toLowerCase().includes(keyword)
  );

  return (
    <ul>
      {visibleItems.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}`,
        },
      },
      {
        id: "measure-before-optimizing",
        title: "최적화는 관찰한 문제에서 시작하기",
        paragraphs: [
          "부모의 상태가 바뀌면 자식 컴포넌트도 다시 렌더링될 수 있습니다. 하지만 작고 단순한 컴포넌트의 재렌더링이 곧 사용자에게 느껴지는 성능 문제를 뜻하지는 않습니다. 먼저 어떤 동작에서 지연이 발생하는지 재현할 수 있어야 합니다.",
          "목록의 크기, 반복 계산, 상태가 놓인 위치를 차례로 살펴봅니다. React 개발자 도구로 업데이트를 관찰하고, 필요한 부분에만 최적화를 적용합니다. 컴포넌트의 책임과 데이터 흐름이 읽히는 구조는 성능을 조사할 때도 도움이 됩니다.",
        ],
      },
    ],
  },
  {
    slug: "a-blog-without-a-server",
    title: "서버 없이 운영하는 기술 블로그",
    description:
      "글을 HTML로 미리 만들면 무엇이 달라질까요? 정적 블로그의 작성부터 배포까지, 운영에 필요한 선택들을 정리합니다.",
    category: "Next.js",
    date: "2026-11-06",
    readingMinutes: 6,
    sections: [
      {
        id: "build-before-the-visit",
        title: "방문 전에 페이지를 만들어 두기",
        paragraphs: [
          "정적 사이트는 방문 요청이 올 때마다 페이지를 생성하는 대신, 빌드 과정에서 HTML과 필요한 자원을 만들어 둡니다. 배포된 서버는 이 파일들을 전달합니다. 자주 바뀌지 않는 설명 글이나 개인 블로그는 이런 흐름과 잘 맞습니다.",
          "Next.js의 정적 내보내기를 사용하면 지원하는 페이지를 정적 파일로 만들 수 있습니다. 글 주소와 본문처럼 페이지 생성에 필요한 정보는 빌드할 때 확보해야 하며, 새로운 글을 공개하려면 다시 빌드해서 배포하는 과정이 필요합니다.",
        ],
      },
      {
        id: "content-and-presentation",
        title: "글을 쓰는 도구와 화면을 나누기",
        paragraphs: [
          "정적 사이트라고 해서 반드시 코드 편집기에서 글을 작성해야 하는 것은 아닙니다. 웹 편집기를 제공하는 CMS에서 글을 관리하고, 빌드 과정이 저장된 내용을 읽도록 연결할 수 있습니다. 콘텐츠가 파일에 저장되는지 외부 서비스에 저장되는지에 따라 연결 방식이 달라집니다.",
          "글의 제목, 날짜, 설명, 본문에 일관된 형식을 정해 두면 화면을 바꾸기 수월합니다. 같은 내용을 홈 목록, 글 상세, RSS 등에 활용할 수 있기 때문입니다. 처음에는 자주 사용하는 항목부터 작게 정하는 편이 관리하기 좋습니다.",
        ],
      },
      {
        id: "deployment-boundaries",
        title: "배포 환경이 맡는 일 이해하기",
        paragraphs: [
          "GitHub Pages는 정적 파일을 제공하는 호스팅입니다. 따라서 공개 블로그를 올릴 수 있지만, 방문 요청을 처리하는 애플리케이션 서버나 데이터베이스를 그 안에서 직접 실행하는 구조는 아닙니다. 로그인과 댓글 같은 기능은 별도의 서비스가 필요할 수 있습니다.",
          "배포할 주소가 계정의 루트인지 저장소 이름이 붙은 하위 경로인지도 확인합니다. 이미지와 링크가 배포 경로를 올바르게 사용해야 하기 때문입니다. 홈뿐 아니라 개별 글 주소에 직접 방문하고 새로고침하는 동작까지 확인하면 경로 문제를 발견하기 쉽습니다.",
        ],
        note: "정적 내보내기에서 지원하는 기능은 사용 중인 Next.js 버전의 공식 문서로 확인해야 합니다.",
      },
    ],
  },
  {
    slug: "types-at-the-api-boundary",
    title: "타입은 API의 경계에서부터",
    description:
      "외부 응답은 타입 선언만으로 안전해지지 않습니다. 데이터를 확인하고 애플리케이션 안으로 가져오는 과정을 살펴봅니다.",
    category: "TypeScript",
    date: "2026-10-28",
    readingMinutes: 7,
    sections: [
      {
        id: "types-do-not-validate-responses",
        title: "선언한 타입과 실제 응답 사이",
        paragraphs: [
          "TypeScript의 타입은 개발 중 코드의 관계를 검사하는 데 도움을 줍니다. 하지만 서버가 돌려준 JSON의 실제 모양을 타입 선언만으로 검증하지는 않습니다. 응답을 특정 타입으로 단언했다고 해서 누락된 필드가 생기거나 잘못된 값이 바뀌는 것도 아닙니다.",
          "외부에서 들어오는 데이터는 예상과 다를 수 있다고 생각하는 편이 안전합니다. API 응답뿐 아니라 브라우저 저장소와 사용자가 입력한 값도 같은 경계에 있습니다. 이 경계에서 확인할 조건을 정하면 내부 코드가 맡는 일을 줄일 수 있습니다.",
        ],
      },
      {
        id: "validate-unknown-data",
        title: "unknown에서 필요한 형태로 좁히기",
        paragraphs: [
          "검증하지 않은 값을 unknown으로 받으면 확인하기 전까지 속성을 자유롭게 사용할 수 없습니다. 작은 데이터는 타입 가드로 조건을 표현할 수 있습니다. 검사에 성공한 뒤에는 그 조건에 맞는 타입으로 값을 다룰 수 있습니다.",
          "아래 예시는 객체의 두 필드를 확인하는 최소한의 검사입니다. 실제 서비스에서는 값의 범위, 문자열 길이, 날짜 형식처럼 도메인에 필요한 조건도 검토해야 합니다. 구조가 복잡해지면 스키마 검증 도구를 사용하는 방법도 있습니다.",
        ],
        code: {
          language: "typescript",
          value: `type User = { id: number; name: string };

// 사용자 응답 구조 확인
function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "number" &&
    "name" in value &&
    typeof value.name === "string"
  );
}

// 검증된 사용자 데이터 반환
function parseUser(value: unknown): User {
  if (!isUser(value)) {
    throw new Error("사용자 응답 형식을 확인해 주세요.");
  }

  return value;
}`,
        },
      },
      {
        id: "translate-into-domain-data",
        title: "확인한 데이터를 화면의 언어로 바꾸기",
        paragraphs: [
          "외부 API의 응답 구조와 화면이 필요로 하는 구조는 같지 않을 수 있습니다. 응답을 그대로 여러 컴포넌트에 전달하면 API의 필드 이름이나 중첩 구조가 바뀔 때 수정 범위가 넓어집니다. 경계에서 필요한 형태로 변환하는 함수를 두면 변화가 퍼지는 지점을 줄일 수 있습니다.",
          "실패한 응답을 어떻게 처리할지도 이 과정에서 결정합니다. 필수 정보가 없으면 오류로 처리할지, 선택 정보라면 기본값을 사용할지 명확하게 정합니다. 타입을 더 많이 쓰는 것보다 어떤 가정을 확인했는지 읽히게 만드는 것이 목적입니다.",
        ],
      },
    ],
  },
  {
    slug: "finding-component-boundaries",
    title: "좋은 컴포넌트의 크기를 정하는 기준",
    description:
      "몇 줄부터 나눠야 할까요? 코드 길이보다 책임과 변경 이유를 따라 컴포넌트의 경계를 찾아봅니다.",
    category: "Frontend",
    date: "2026-10-21",
    readingMinutes: 6,
    sections: [
      {
        id: "follow-the-reason-to-change",
        title: "함께 바뀌는 부분을 살펴보기",
        paragraphs: [
          "컴포넌트를 나눌 시점을 코드 줄 수만으로 정하기는 어렵습니다. 짧은 코드 안에도 서로 다른 책임이 섞여 있을 수 있고, 조금 긴 코드가 하나의 명확한 역할을 설명할 수도 있습니다. 우선 이 부분이 어떤 이유로 바뀌는지 살펴봅니다.",
          "예를 들어 글 목록에서 검색 조건을 관리하는 일과 글 한 개의 제목을 보여주는 일은 변경 이유가 다릅니다. 두 역할을 나누면 검색 동작을 수정할 때 글의 표현까지 함께 이해해야 하는 부담이 줄어듭니다. 다만 한 번에 모든 경계를 미리 정하려고 하지는 않습니다.",
        ],
      },
      {
        id: "make-props-readable",
        title: "props가 설명하는 컴포넌트의 역할",
        paragraphs: [
          "컴포넌트의 입력을 읽으면 무엇을 하는 요소인지 짐작할 수 있어야 합니다. 제목과 링크가 필요한 글 목록 항목이라면 그 역할에 맞는 값을 받도록 설계합니다. 내부 구현을 조정하는 불리언 옵션이 계속 늘어난다면 서로 다른 역할이 합쳐진 것은 아닌지 돌아봅니다.",
          "상위 컴포넌트의 큰 객체를 통째로 전달하는 방식은 편리하지만, 자식이 실제로 어떤 값에 의존하는지 가릴 수 있습니다. 필요한 정보만 받도록 만들면 사용 지점과 의존 관계가 더 또렷해집니다. 구체적인 경계는 데이터의 성격과 사용처를 함께 보고 정합니다.",
        ],
      },
      {
        id: "extract-after-understanding",
        title: "반복을 확인한 뒤 추상화하기",
        paragraphs: [
          "모양이 비슷한 두 요소가 항상 같은 컴포넌트가 되어야 하는 것은 아닙니다. 지금은 같은 배치를 사용하더라도 앞으로 바뀌는 이유가 다를 수 있습니다. 억지로 합치면 한쪽의 요구를 위한 예외가 다른 쪽에도 남게 됩니다.",
          "처음에는 읽기 쉬운 구체적인 구현을 만들고, 반복되는 규칙이 보일 때 공통 부분을 꺼내 봅니다. 추상화한 뒤 사용 코드가 더 명확해졌는지 확인하는 것도 중요합니다. 재사용 자체보다 변경을 이해하고 예측하기 쉬운 구조를 목표로 삼습니다.",
        ],
      },
    ],
  },
  {
    slug: "measure-a-slow-page",
    title: "느린 화면을 추측 대신 측정하기",
    description:
      "요청이 느린 걸까요, 그리는 과정이 무거운 걸까요? 사용자 동작을 기준으로 성능 문제를 나누어 살펴봅니다.",
    category: "Web",
    date: "2026-10-13",
    readingMinutes: 5,
    sections: [
      {
        id: "define-the-slow-moment",
        title: "어느 순간이 느린지부터 정하기",
        paragraphs: [
          "화면이 느리다는 말에는 여러 상황이 담겨 있습니다. 처음 방문했을 때 내용이 늦게 나타날 수도 있고, 버튼을 누른 뒤 반응이 늦거나 목록을 스크롤할 때 끊길 수도 있습니다. 이 상황들을 같은 문제로 다루면 원인을 찾는 범위가 지나치게 넓어집니다.",
          "재현할 동작과 관찰할 구간을 먼저 적어 둡니다. 같은 기기와 네트워크 조건에서 몇 차례 확인하고, 캐시가 있는 방문과 없는 방문도 구분합니다. 한 번 나온 숫자만으로 결론을 내리기보다 결과가 얼마나 일정한지 함께 봅니다.",
        ],
      },
      {
        id: "separate-network-and-rendering",
        title: "네트워크와 화면 작업을 나누기",
        paragraphs: [
          "브라우저의 네트워크 도구에서는 어떤 자원을 요청했고 얼마나 기다렸는지 확인할 수 있습니다. 이미지의 크기, 자바스크립트 전송량, 요청 사이의 의존 관계를 살펴봅니다. 파일 하나가 작아졌더라도 중요한 내용보다 늦게 요청된다면 효과는 기대와 다를 수 있습니다.",
          "성능 기록에서는 자바스크립트 실행과 레이아웃, 화면을 그리는 작업을 시간 흐름에 따라 살펴볼 수 있습니다. 응답은 빨리 도착했는데 인터랙션이 늦다면 메인 스레드에서 오래 실행되는 작업이 있는지 확인합니다. 원인이 다른 만큼 해결 방법도 달라집니다.",
        ],
      },
      {
        id: "compare-one-change",
        title: "하나를 바꾸고 같은 조건으로 비교하기",
        paragraphs: [
          "측정한 병목을 바탕으로 바꿀 대상을 하나 고릅니다. 큰 이미지의 크기를 줄이거나, 처음에 필요하지 않은 코드를 나누거나, 반복 계산을 줄이는 식입니다. 여러 항목을 한꺼번에 수정하면 어떤 변화가 결과에 영향을 주었는지 설명하기 어려워집니다.",
          "수정 뒤에는 같은 동작과 조건으로 다시 측정합니다. 실험실 측정은 비교에 도움이 되지만 실제 사용자의 다양한 환경을 모두 대표하지는 않습니다. 가능하다면 현장 데이터도 함께 보고, 좋아진 수치가 사용자의 경험과 연결되는지 확인합니다.",
        ],
      },
    ],
  },
  {
    slug: "a-layout-that-reads-well",
    title: "읽기 좋은 화면을 만드는 레이아웃",
    description:
      "큰 화면의 여백부터 작은 화면의 줄바꿈까지. 콘텐츠의 길이를 기준으로 반응형 레이아웃을 설계합니다.",
    category: "CSS",
    date: "2026-10-06",
    readingMinutes: 5,
    sections: [
      {
        id: "start-with-the-content-width",
        title: "본문이 편안한 폭부터 정하기",
        paragraphs: [
          "넓은 화면에서 본문을 끝까지 늘리면 한 줄을 읽고 다음 줄의 시작을 찾는 거리가 길어집니다. 글 중심의 화면은 콘텐츠의 최대 폭을 정하고 바깥 공간을 여백으로 남기는 방법을 사용할 수 있습니다. 적절한 값은 언어와 글꼴, 글자 크기에 따라 달라집니다.",
          "처음에는 실제 문단을 배치하고 읽어 봅니다. 제목이 길어졌을 때의 줄바꿈, 코드 블록과 이미지가 들어갔을 때의 흐름도 확인합니다. 짧은 임시 문구만으로 잡은 레이아웃은 실제 글에서 전혀 다른 밀도로 보일 수 있습니다.",
        ],
      },
      {
        id: "give-space-a-rule",
        title: "여백에도 일관된 규칙 두기",
        paragraphs: [
          "문단 사이의 간격과 섹션 사이의 간격은 서로 다른 관계를 표현합니다. 같은 내용을 설명하는 문단은 가까이 두고, 새로운 주제로 넘어가는 제목 앞에는 조금 더 공간을 줍니다. 단순히 모든 간격을 크게 만드는 것보다 내용의 구조를 따라 조정하는 편이 읽기 좋습니다.",
          "폭과 여백은 고정된 숫자만으로 구성하지 않아도 됩니다. 최대 폭과 화면 너비를 함께 고려하면 작은 화면에서는 자연스럽게 줄어들고 큰 화면에서는 읽기 편한 폭을 유지할 수 있습니다. 아래는 글 영역에 적용할 수 있는 작은 출발점입니다.",
        ],
        code: {
          language: "css",
          value: `.article-body {
  width: min(100% - 2.5rem, 47.5rem);
  margin-inline: auto;
  font-size: clamp(1rem, 0.9rem + 0.35vw, 1.2rem);
  line-height: 1.85;
  overflow-wrap: anywhere;
}

.article-body p + p {
  margin-block-start: 1.5em;
}

.article-body h2 {
  margin-block: 2.5em 1em;
  line-height: 1.35;
}`,
        },
      },
      {
        id: "let-the-layout-break-naturally",
        title: "기기 이름보다 내용의 변화 살피기",
        paragraphs: [
          "반응형 화면의 전환점을 정할 때는 특정 기기의 이름보다 실제 내용이 불편해지는 순간을 살펴봅니다. 메뉴가 겹치거나 글 목록의 요약이 너무 좁아지면 구조를 바꿀 시점입니다. 가로 배치를 세로로 바꾸는 것만으로 충분한 경우도 많습니다.",
          "작은 화면에서는 읽는 순서가 더욱 중요합니다. 제목과 설명, 글 목록이 자연스럽게 이어지도록 하고 보조 정보는 우선순위에 맞게 배치합니다. 키보드 탐색과 화면 확대도 함께 확인하면 다양한 방식으로 읽는 사람을 고려할 수 있습니다.",
        ],
      },
    ],
  },
];

// 슬러그로 글 조회
export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
