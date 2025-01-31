export interface BlogPost {
  category: string;
  author: {
    initials: string;
    name: string;
  };
  date: string;
  title: string;
  description: string;
  image?: string;
}