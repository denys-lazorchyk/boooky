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

  getList(id: number) {
    const index = this.lists.findIndex((list) => list.id === id);
    return index > -1 ? this.lists[index] : undefined;
  }

  updateList(id: number, list: BookList) {
    console.log(this.lists);

    if (id >= 0) {
      let index = this.lists.findIndex((list) => list.id === id);
      if (index > -1) {
        this.lists[index] = { ...list };
      }
    }
    console.log(this.lists);
  }

  deleteList(id: number) {
    let index = this.lists.findIndex((list) => {
      list.id === id;
    });

    if (index > -1) {
      this.lists.splice(index, 1);
    }
  }

  addList(list: { title: string }) {
    let biggest = 0;
    this.lists.map((el) => {
      if (el.id > biggest) biggest = el.id;
    });
    this.lists.push({
      id: biggest + 1,
      listName: list.title,
      books: [],
    });
  }
}
