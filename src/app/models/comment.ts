export interface Comment {
  id: number;
  authorId: string;
  message: string;
  publicationDate: Date | string;
  author: string;
  rating?: number;
}
