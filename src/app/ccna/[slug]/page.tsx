import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getLabContent, getLabsForSection } from "../../../lib/mdx";
import type { JSX } from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const labs = getLabsForSection("ccna");
  return labs.map((lab) => ({ slug: lab.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = getLabContent("ccna", slug);
  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

const mdxComponents = {
  h2: ({ children, ...props }: { children?: React.ReactNode }) => {
    const id = String(children ?? "")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
    return <h2 id={id} {...props}>{children}</h2>;
  },
  h3: ({ children, ...props }: { children?: React.ReactNode }) => {
    const id = String(children ?? "")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
    return <h3 id={id} {...props}>{children}</h3>;
  },
} as Record<string, (props: Record<string, unknown>) => JSX.Element>;

export default async function CCNALabPage({ params }: Props) {
  const { slug } = await params;
  const { frontmatter, content } = getLabContent("ccna", slug);

  return (
    <div className="post-layout">
      <article>
        <nav className="post-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">›</span>
          <Link href="/ccna">CCNA Labs</Link>
          <span aria-hidden="true">›</span>
          <span>{frontmatter.title}</span>
        </nav>

        <div className="post-tags">
          {frontmatter.tags?.map((tag) => (
            <span key={tag} className="ptag">{tag}</span>
          ))}
        </div>

        <h1 className="post-title">{frontmatter.title}</h1>

        <div className="post-meta">
          <span>📅 {frontmatter.date}</span>
          <span
            className={`proj-status ${
              frontmatter.status === "done"
                ? "status-done"
                : frontmatter.status === "progress"
                ? "status-progress"
                : "status-planned"
            }`}
          >
            {frontmatter.status === "done"
              ? "✓ Completed"
              : frontmatter.status === "progress"
              ? "In Progress"
              : "Planned"}
          </span>
        </div>

        <div className="post-body">
          <MDXRemote source={content} components={mdxComponents} />
        </div>
      </article>

      <aside className="post-toc" aria-label="Table of contents">
        <div className="toc-label">Table of contents</div>
        <TocLinks content={content} />
      </aside>
    </div>
  );
}

function TocLinks({ content }: { content: string }) {
  const headings = content
    .split("\n")
    .filter((line) => line.startsWith("## ") || line.startsWith("### "))
    .map((line) => {
      const level = line.startsWith("### ") ? 3 : 2;
      const text = line.replace(/^#{2,3} /, "").trim();
      const id = text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");
      return { level, text, id };
    });

  if (headings.length === 0) return null;

  return (
    <ul className="toc-list">
      {headings.map((h) => (
        <li key={h.id} className={h.level === 3 ? "toc-sub" : ""}>
          <a href={`#${h.id}`}>{h.text}</a>
        </li>
      ))}
    </ul>
  );
}
