import styles from "../PostDetail.module.css";

import type { ArticleBodyProps } from "../_types/reader";

// 본문 섹션과 코드 복사 및 참고 문구 표시
export function ArticleBody({ post, copyCode, contentRef, codeStatuses }: ArticleBodyProps) {
  return (
    <article id="article-content" className={styles.content} ref={contentRef} aria-labelledby="article-title">
      {post.sections.map((section) => (
        <section className={styles.section} key={section.id} aria-labelledby={section.id}>
          <h2 id={section.id}>{section.title}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.code && (
            <div className={styles.codeBlock}>
              <div className={styles.codeToolbar}>
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
              <p className={styles.copyFeedback} role="status">
                {codeStatuses[section.id] === "success" && "코드를 복사했습니다."}
                {codeStatuses[section.id] === "error" && "코드를 복사하지 못했습니다. 코드를 선택해 직접 복사해 주세요."}
              </p>
            </div>
          )}
          {section.note && (
            <aside className={styles.note} aria-label="참고"><p>{section.note}</p></aside>
          )}
        </section>
      ))}
    </article>
  );
}
