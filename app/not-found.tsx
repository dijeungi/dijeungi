import Link from "next/link";

import styles from "./NotFound.module.css";

// 존재하지 않는 글 안내
export default function NotFound() {
  return (
    <main id="main-content" className={styles.page}>
      <span className={styles.eyebrow}>404 / NOT FOUND</span>
      <h1 className={styles.title}>이 기록은 찾을 수 없어요.</h1>
      <p className={styles.description}>입력한 글 주소를 확인해 주세요.</p>
      <Link href="/" className={styles.link}>예시 글 보기 →</Link>
    </main>
  );
}
