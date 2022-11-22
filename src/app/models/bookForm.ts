export interface PreBook {
  title: string;
  description: string;
  pageCount: number;
  quote?: string;
  author?: string;
  rating?: number;
  publicationDate: Date | string;
  coverUrl?: string;
  lists?: number[];
}
