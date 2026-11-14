import Image from "next/image";

import styles from "../PostDetail.module.css";

import type { ArticleReaderProps } from "../_types/reader";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  year: "numeric",
  month: "short",
  timeZone: "UTC",
});

// 카테고리와 제목 및 대표 이미지 표시
export function ArticleHero({ post }: ArticleReaderProps) {
  return (
    <section className={styles.hero} aria-labelledby="article-title">
      <div className={styles.pageGrid + " " + styles.heroGrid}>
        <header className={styles.heading}>
          <p className={styles.category}>{post.category}</p>
          <h1 id="article-title">{post.title}</h1>
          <div className={styles.meta} aria-label="글 정보">
            <time dateTime={post.date}>
              {dateFormatter.format(new Date(post.date + "T00:00:00Z"))}
            </time>
            <span className={styles.metaSeparator} aria-hidden="true">|</span>
            <span>{post.readingMinutes} min read</span>
          </div>
        </header>
      </div>
      {post.heroImage && (
        <div className={styles.heroMedia}>
          <Image
            className={styles.heroImage}
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
  );
}
