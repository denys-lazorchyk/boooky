import { Injectable } from '@angular/core';
import { BookList } from '../models/bookList';

const testingLists: BookList[] = [
  {
    id: 1,
    listName: 'Recommended books:',
    books: [
      { id: 4, title: 'Lord of the Rings' },
      { id: 5, title: 'The Colour of the Magic' },
      { id: 6, title: "The Hitchhiker's Guide to the Galaxy" },
    ],
  },

  {
    id: 2,
    listName: 'Added books:',
    books: [
      { id: 1, title: 'Dune' },
      { id: 2, title: '1984' },
      { id: 3, title: 'The Martian' },
    ],
  },
];

@Injectable({
  providedIn: 'root',
})
export class BookListsService {
  lists: BookList[] = [...testingLists];
  constructor() {}

  getBookLists() {
    return [...this.lists];
  }

  getBook(id: number) {
    const index = this.lists.findIndex((list) => list.id === id);
    return index > -1 ? this.lists[index] : undefined;
  }
}
