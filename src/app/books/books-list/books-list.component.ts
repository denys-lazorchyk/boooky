import { Component, OnInit } from '@angular/core';
import { BookList } from 'src/app/models/bookList';
import { BookListsService } from 'src/app/services/book-lists.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {
  lists: BookList[];
  constructor(private bookListsService: BookListsService) {
    this.lists = this.bookListsService.getBookLists();
  }

  ngOnInit(): void {}
}
