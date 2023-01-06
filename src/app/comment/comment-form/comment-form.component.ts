import {
  Component,
  OnInit,
  NgZone,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';
import { take } from 'rxjs';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  form!: FormGroup;

  @Input() bookId!: number;
  @Input() commentId!: number;
  @Input() editMode = false;
  @Output() closedForm = new EventEmitter<boolean>();
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  constructor(
    private formBuilder: FormBuilder,
    private booksService: BooksService,
    private commentsService: CommentsService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    if (this.editMode && this.commentId) {
      let book = this.booksService.getBook(this.bookId);

      const index = book?.comments?.findIndex(
        (comment) => comment.id === this.commentId
      );

      if (book?.comments && typeof index !== 'undefined' && index > -1) {
        this.setForm({
          rating: book?.comments[index].rating ?? 0,
          comment: book?.comments[index].message,
        });
      }
    } else {
      this.setForm();
    }
  }

  formatLabel(value: number): string {
    let result = `${value}`;
    return `${result.length === 1 ? result + '.0' : result}`;
  }

  triggerResize() {
    this.ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  addComment() {
    this.commentsService.addCommentToBook(this.bookId, {
      message: this.form.get('comment')?.value ?? '',
      rating: this.form.get('rating')?.value ?? 2.7,
    });

    this.form.reset();
  }

  saveComment() {
    if (this.commentId && this.bookId) {
      this.commentsService.saveCommentToBook(this.bookId, this.commentId, {
        message: this.form.get('comment')?.value,
        rating: this.form.get('rating')?.value,
      });

      this.editMode = false;
    }
  }

  setForm(
    initialValue: { rating: number; comment: string } = {
      rating: 0,
      comment: '',
    }
  ) {
    this.form = this.formBuilder.group({
      rating: new FormControl(initialValue.rating),
      comment: new FormControl(initialValue.comment, Validators.required),
    });
  }
}
