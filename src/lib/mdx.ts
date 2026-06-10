import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { LabMeta } from '../types/portfolio';

export function getLabsForSection(section: string): LabMeta[] {
  const dir = path.join(process.cwd(), 'content', section);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    const { data } = matter(raw);
    return {
      slug: file.replace('.mdx', ''),
      title: data.title ?? 'Untitled',
      description: data.description ?? '',
      date: data.date ?? '',
      status: (data.status as LabMeta['status']) ?? 'planned',
      tags: (data.tags as string[]) ?? [],
    };
  });
}

export function getLabContent(section: string, slug: string) {
  const filePath = path.join(process.cwd(), 'content', section, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content: rawContent } = matter(raw);
  const content = rawContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  return {
    frontmatter: frontmatter as {
      title: string;
      description: string;
      date: string;
      status: LabMeta['status'];
      tags: string[];
    },
    content,
  };
}
