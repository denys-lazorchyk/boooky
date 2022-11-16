import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';

export interface SelectItem {
  propName: string;
  value: string;
}

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  selectedId!: number;
  foundBooks!: Book[];

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (/\d/.test(params.get('id') ?? '')) {
        this.selectedId = Number(params.get('id'));
        this.foundBooks = this.booksService.getBook(this.selectedId);
      }
    });
  }

  get book(): Book {
    return this.foundBooks[0];
  }
}
