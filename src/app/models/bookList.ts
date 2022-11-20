export interface BookList {
  id: number;
  listName: string;
  books: {
    id: number;
    title: string;
  }[];
}
