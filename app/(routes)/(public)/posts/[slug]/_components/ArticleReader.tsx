"use client";

import { ArticleBody } from "./ArticleBody";
import { ArticleHero } from "./ArticleHero";
import { ArticleHeader } from "./ArticleHeader";
import { useArticleReader } from "../_hooks/useArticleReader";

import styles from "../PostDetail.module.css";

import type { ArticleReaderProps } from "../_types/reader";

// 읽기 상태와 글 상세 화면 조합
export function ArticleReader({ post }: ArticleReaderProps) {
  const {
    progress,
    isReading,
    copyCode,
    copyLink,
    headerRef,
    contentRef,
    shareStatus,
    codeStatuses,
  } = useArticleReader();

  return (
    <div className={styles.reader}>
      <a className={styles.skipLink} href="#main-content">본문으로 바로가기</a>
      <ArticleHeader
        title={post.title}
        progress={progress}
        isReading={isReading}
        copyLink={copyLink}
        headerRef={headerRef}
        shareStatus={shareStatus}
      />
      <main id="main-content">
        <ArticleHero post={post} />
        <div className={styles.pageGrid}>
          <ArticleBody
            post={post}
            copyCode={copyCode}
            contentRef={contentRef}
            codeStatuses={codeStatuses}
          />
        </div>
      </main>
    </div>
  );
}
