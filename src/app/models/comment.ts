export interface Comment {
  message: string;
  publicationDate: Date | string;
  author: string;
  rating?: number;
}
