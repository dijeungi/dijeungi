import { ShareIcon } from "./ShareIcon";
import { siteName } from "@/app/shared/constants/site";

import styles from "../PostDetail.module.css";

import type { ArticleHeaderProps } from "../_types/reader";

// 같은 시작 위치에서 전환되는 글 읽기 헤더
export function ArticleHeader({
  title,
  progress,
  isReading,
  copyLink,
  headerRef,
  shareStatus,
}: ArticleHeaderProps) {
  return (
    <header
      ref={headerRef}
      className={isReading ? styles.readerHeader + " " + styles.reading : styles.readerHeader}
    >
      <div className={styles.headerInner}>
        <div className={styles.headerTitles}>
          <span className={styles.brand}>
            <span className={styles.brandName}>{siteName}</span>
          </span>
          <span className={styles.currentTitle}>{title}</span>
        </div>
        <button
          className={styles.shareButton}
          type="button"
          disabled={shareStatus === "copying"}
          aria-label={shareStatus === "success" ? "글 링크 복사 완료" : "글 링크 복사"}
          onClick={() => void copyLink()}
        >
          <ShareIcon />
        </button>
      </div>
      <p className={shareStatus === "error" ? styles.shareFeedback : styles.srOnly} role="status">
        {shareStatus === "success" && "글 링크를 복사했습니다."}
        {shareStatus === "error" && "링크를 복사하지 못했습니다. 주소창의 주소를 직접 복사해 주세요."}
      </p>
      <div
        aria-hidden="true"
        className={styles.progress}
        style={{ transform: "scaleX(" + progress / 100 + ")" }}
      />
    </header>
  );
}
