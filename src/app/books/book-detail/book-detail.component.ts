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
  foundBook!: Book | undefined;

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (/\d/.test(params.get('id') ?? '')) {
        this.selectedId = Number(params.get('id'));
        this.foundBook = this.booksService.getBook(this.selectedId);
      }
    });
  }
}
