import { notFound } from "next/navigation";

import { posts, getPost } from "@/app/shared/data/posts";
import { ArticleReader } from "./_components/ArticleReader";

import type { Metadata } from "next";

export const dynamicParams = false;

// 정적 게시글 주소 목록 생성
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

// 게시글별 검색 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
    },
  };
}

// 글 주소별 상세 화면 구성
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return <ArticleReader key={post.slug} post={post} />;
}
