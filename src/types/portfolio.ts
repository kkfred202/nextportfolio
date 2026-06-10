export interface LabMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  status: 'done' | 'progress' | 'planned';
  tags: string[];
}

export interface Project {
  label: string;
  name: string;
  desc: string;
  tags: string[];
  slug: string | null;
  section: string | null;
}

export interface Skill {
  icon: string;
  name: string;
  items: string;
}

export interface Cert {
  badge: string;
  cls: string;
  name: string;
  sub: string;
}
