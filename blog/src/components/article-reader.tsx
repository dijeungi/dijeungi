"use client";

import { useArticleReader } from "@/hooks/use-article-reader";

import type { Post } from "@/lib/posts";

// 고정 헤더와 본문 중심 글 상세 화면
export function ArticleReader({ post }: { post: Post }) {
  const {
    progress,
    copyCode,
    copyLink,
    contentRef,
    shareStatus,
    codeStatuses,
  } = useArticleReader();

  return (
    <>
      <a className="skip-link" href="#main-content">본문으로 바로가기</a>
      <header className="reader-header">
        <div className="reader-header-inner">
          <span className="wordmark" aria-label="BLOG">blog<span>.</span></span>
          <span className="reader-current-title">{post.title}</span>
          <button
            className="share-button"
            type="button"
            onClick={() => void copyLink()}
            disabled={shareStatus === "copying"}
            aria-label="이 글의 링크 복사"
          >
            {shareStatus === "copying"
              ? "복사 중"
              : shareStatus === "success"
                ? "복사 완료"
                : "링크 복사"}
          </button>
        </div>
        <p className={shareStatus === "error" ? "share-feedback" : "sr-only"} role="status">
          {shareStatus === "success" && "글 링크를 복사했습니다."}
          {shareStatus === "error" && "링크를 복사하지 못했습니다. 주소창의 주소를 직접 복사해 주세요."}
        </p>
        <div
          aria-hidden="true"
          className="reading-progress"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </header>

      <main id="main-content" className="article-page">
        <header className="article-heading">
          <span className="article-category">{post.category}</span>
          <h1>{post.title}</h1>
          <p className="article-description">{post.description}</p>
          <div className="article-meta">
            <time dateTime={post.date}>{post.date.replaceAll("-", ".")}</time>
            <span aria-hidden="true">/</span>
            <span>{post.readingMinutes}분 읽기</span>
          </div>
        </header>

        <article className="article-content" ref={contentRef} aria-label={post.title}>
          {post.sections.map((section) => (
            <section className="article-section" key={section.id} aria-labelledby={section.id}>
              <h2 id={section.id}>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.code && (
                <div className="code-block">
                  <div className="code-toolbar">
                    <span>{section.code.language}</span>
                    <button
                      type="button"
                      disabled={codeStatuses[section.id] === "copying"}
                      onClick={() => {
                        if (section.code) {
                          void copyCode(section.id, section.code.value);
                        }
                      }}
                    >
                      {codeStatuses[section.id] === "copying"
                        ? "복사 중"
                        : codeStatuses[section.id] === "success"
                          ? "복사 완료"
                          : "코드 복사"}
                    </button>
                  </div>
                  <pre><code>{section.code.value}</code></pre>
                  <p className="copy-feedback" role="status">
                    {codeStatuses[section.id] === "success" && "코드를 복사했습니다."}
                    {codeStatuses[section.id] === "error" && "코드를 복사하지 못했습니다. 코드를 선택해 직접 복사해 주세요."}
                  </p>
                </div>
              )}
              {section.note && (
                <aside className="article-note" aria-label="참고"><p>{section.note}</p></aside>
              )}
            </section>
          ))}
        </article>
      </main>
    </>
  );
}
