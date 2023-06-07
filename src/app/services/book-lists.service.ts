import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { BookList } from '../models/bookList';

const testingLists: BookList[] = [
  {
    id: 1,
    listName: 'Recommended books',
    books: [
      { id: 4, title: 'Lord of the Rings' },
      { id: 5, title: 'The Colour of the Magic' },
      { id: 6, title: "The Hitchhiker's Guide to the Galaxy" },
    ],
  },
  {
    id: 2,
    listName: 'Special books',
    books: [
      { id: 1, title: 'Dune' },
      { id: 2, title: '1984' },
      { id: 3, title: 'The Martian' },
    ],
  },
  {
    id: 3,
    listName: 'All books',
    books: [
      { id: 1, title: 'Dune' },
      { id: 2, title: '1984' },
      { id: 3, title: 'The Martian' },
      { id: 4, title: 'Lord of the Rings' },
      { id: 5, title: 'The Colour of the Magic' },
      { id: 6, title: "The Hitchhiker's Guide to the Galaxy" },
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

  getList(id: number) {
    const index = this.lists.findIndex((list) => list.id === id);
    return index > -1 ? this.lists[index] : undefined;
  }

  updateList(id: number, list: BookList) {
    if (id >= 0) {
      let index = this.lists.findIndex((list) => list.id === id);
      if (index > -1) {
        this.lists[index] = { ...list };
      }
    }
  }

  deleteList(id: number) {
    let index = this.lists.findIndex((list) => {
      list.id === id;
    });

    if (index > -1) {
      this.lists.splice(index, 1);
    }
  }

  addList(title: string) {
    let biggest = 0;
    this.lists.map((el) => {
      if (el.id > biggest) biggest = el.id;
    });
    this.lists.push({
      id: biggest + 1,
      listName: title,
      books: [],
    });
  }

  updateBookInLists(book: Book, newListsIds: number[]) {
    this.lists.forEach((list, index) => {
      let bookIndex = list.books.findIndex((b) => b.id === book.id);
      if (bookIndex > -1) {
        this.lists[index].books.splice(bookIndex, 1);
      }
    });

    newListsIds.forEach(
      (id) => this.addBook(book, id)
      // let index = this.lists.findIndex((list) => list.id === id);
      // if (index > -1) {
      //   this.lists[index].books.push({
      //     id: book.id,
      //     title: book.title,
      //   });
      // }
    );
    this.addBook(book, 3);
  }

  addBookToBookLists(book: Book, listsIds: number[]) {
    listsIds.forEach((id) => this.addBook(book, id));
    this.addBook(book, 3);
  }

  private addBook(book: Book, id: number) {
    let index = this.lists.findIndex((list) => list.id === id);
    if (index > -1) {
      this.lists[index].books.push({
        id: book.id,
        title: book.title,
      });
    }
  }
}
