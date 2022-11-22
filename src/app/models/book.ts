import { Comment } from './comment';

export interface Book {
  id: number;
  title: string;
  description: string;
  pageCount: number;
  quote?: string;
  author?: string;
  rating?: number;
  publicationDate: Date | string;
  comments?: Comment[];
  coverUrl?: string;
  lists?: number[];
}
