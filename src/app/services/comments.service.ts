import { Injectable } from '@angular/core';
import { BooksService } from './books.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  user = this.userService.user;

  constructor(
    private booksService: BooksService,
    private userService: UserService
  ) {}

  addCommentToBook(bookId: number, form: { rating: number; message: string }) {
    let book = this.booksService.getBook(bookId);
    let id = 1;

    if (book?.comments?.length) {
      book.comments.map((comment) => {
        if (comment.id > id) {
          id = comment.id + 1;
        }
      });
    }

    book?.comments?.push({
      id: id,
      author: `${this.user.name} ${this.user.surname}`,
      authorId: this.user.id,
      message: form.message,
      rating: form.rating,
      publicationDate: new Date(),
    });
  }

  deleteCommentFromBook(bookId: number, commentId: number) {
    let book = this.booksService.getBook(bookId);

    let index = book?.comments?.findIndex(
      (comment) => comment.id === commentId
    );

    if (typeof index !== 'undefined' && index > -1) {
      book?.comments?.splice(index, 1);
    }

    if (book) {
      this.booksService.updateBook(bookId, book);
    }
  }

  saveCommentToBook(
    bookId: number,
    commentId: number,
    form: { rating: number; message: string }
  ) {
    let book = this.booksService.getBook(bookId);

    let index = book?.comments?.findIndex(
      (comment) => comment.id === commentId
    );

    if (typeof index !== 'undefined' && index > -1) {
      book?.comments?.splice(index, 1, {
        ...book?.comments[index],
        message: form.message,
        rating: form.rating,
      });
    }

    if (book) {
      this.booksService.updateBook(bookId, book);
    }
  }
}
