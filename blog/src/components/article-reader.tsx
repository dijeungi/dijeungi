"use client";

import Image from "next/image";

import { siteName } from "@/lib/site";
import { ShareIcon } from "@/components/share-icon";
import { useArticleReader } from "@/hooks/use-article-reader";

import type { Post } from "@/lib/posts";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  year: "numeric",
  month: "short",
  timeZone: "UTC",
});

// 카테고리 배지와 제목을 왼쪽 정렬한 글 상세 화면
export function ArticleReader({ post }: { post: Post }) {
  const {
    progress,
    copyCode,
    copyLink,
    contentRef,
    shareStatus,
    codeStatuses,
  } = useArticleReader();
  const isReading = progress > 0;

  return (
    <>
      <a className="skip-link" href="#main-content">본문으로 바로가기</a>
      <header
        className={isReading ? "reader-header reader-header--reading" : "reader-header"}
      >
        <div className="reader-header-inner">
          <div className="reader-header-titles">
            <span className="brand">
              <span className="brand-name">{siteName}</span>
            </span>
            <span className="reader-current-title">{post.title}</span>
          </div>
          <button
            className="article-share"
            type="button"
            disabled={shareStatus === "copying"}
            aria-label={shareStatus === "success" ? "글 링크 복사 완료" : "글 링크 복사"}
            onClick={() => void copyLink()}
          >
            <ShareIcon />
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

      <main id="main-content">
        <section className="article-hero" aria-labelledby="article-title">
          <div className="page-grid article-hero-grid">
            <header className="article-heading">
              <p className="article-category">{post.category}</p>
              <h1 id="article-title">{post.title}</h1>
              <div className="article-meta-aside" aria-label="글 정보">
                <time dateTime={post.date}>
                  {dateFormatter.format(new Date(post.date + "T00:00:00Z"))}
                </time>
                <span className="article-meta-separator" aria-hidden="true">|</span>
                <span>{post.readingMinutes} min read</span>
              </div>
            </header>
          </div>
          {post.heroImage && (
            <div className="article-hero-media">
              <Image
                className="article-hero-image"
                src={post.heroImage.src}
                alt={post.heroImage.alt}
                width={post.heroImage.width}
                height={post.heroImage.height}
                unoptimized
                preload
              />
            </div>
          )}
        </section>

        <div className="page-grid">
          <article id="article-content" className="article-content" ref={contentRef} aria-labelledby="article-title">
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
                    <pre tabIndex={0}><code>{section.code.value}</code></pre>
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
        </div>
      </main>
    </>
  );
}
