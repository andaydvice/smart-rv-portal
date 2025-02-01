export interface BlogPost {
  category: string;
  author: {
    initials: string;
    name: string;
  };
  title: string;
  description: string;
  image?: string;
  slug: string;
  content?: string;
}