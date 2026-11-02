export type Palette = {
  id: string;
  name: string;
  colors: string[];
  tags: string[];
  likes: number;
  createdAt: string;
};

export type Tag = {
  name: string;
  count: number;
};
