import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/models/book';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent implements OnInit {
  @Input() book!: Book;

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {}

  deleteComment(commentId: number) {
    this.commentsService.deleteCommentFromBook(this.book.id, commentId);
  }
}
