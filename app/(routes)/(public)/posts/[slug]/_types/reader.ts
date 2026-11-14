import type { Post } from "@/app/shared/data/posts";
import type { useArticleReader } from "../_hooks/useArticleReader";

type ReaderState = ReturnType<typeof useArticleReader>;

export type ArticleReaderProps = { post: Post };

export type ArticleHeaderProps = Pick<
  ReaderState,
  "progress" | "isReading" | "copyLink" | "headerRef" | "shareStatus"
> & { title: string };

export type ArticleBodyProps = Pick<
  ReaderState,
  "copyCode" | "contentRef" | "codeStatuses"
> & ArticleReaderProps;
