import { notFound } from "next/navigation";

import { posts } from "@/lib/posts";
import { ArticleReader } from "@/components/article-reader";

import type { Metadata } from "next";

const post = posts[0];

export const metadata: Metadata = {
  title: post?.title,
  description: post?.description,
  openGraph: {
    type: "article",
    title: post?.title,
    description: post?.description,
    publishedTime: post?.date,
  },
};

// 기본 주소의 글 상세 화면
export default function ArticlePage() {
  if (!post) {
    notFound();
  }

  return <ArticleReader key={post.slug} post={post} />;
}
