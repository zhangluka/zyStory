export interface Memory {
  id?: string;
  date: string;
  title: string;
  content: string;
  location?: string;
  tag: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  caption: string;
}
