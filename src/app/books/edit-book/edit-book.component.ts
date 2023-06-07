import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/book';
import { BookList } from 'src/app/models/bookList';
import { BookListsService } from 'src/app/services/book-lists.service';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
})
export class EditBookComponent implements OnInit, AfterViewInit, OnDestroy {
  initialValue!: Book | undefined;
  form!: FormGroup;
  editBookPage = false;
  selectedId: number | undefined = undefined;
  pageTitle: string = 'Add book';
  buttonName: string = 'Add book';
  lists: BookList[];
  paramsSub!: Subscription;
  @ViewChild('textarea') textarea!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private domSan: DomSanitizer,
    private renderer: Renderer2,
    private booksService: BooksService,
    private bookListsService: BookListsService
  ) {
    this.lists = this.bookListsService.getBookLists();
    this.paramsSub = this.route.paramMap.subscribe((params) => {
      if (/\d/.test(params.get('id') ?? '')) {
        this.editBookPage = true;
        this.selectedId = Number(params.get('id'));
        this.initialValue = this.booksService.getBook(this.selectedId);
        if (!this.initialValue) {
          this.changeNavigation();
        }
        this.setForm();
        this.pageTitle = 'Edit book';
        this.buttonName = 'Save changes';
      }
    });

    this.setForm();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.initialValue) {
      this.setHeight();
    }
  }

  ngOnDestroy(): void {
    this.paramsSub?.unsubscribe();
  }

  formatLabel(value: number): string {
    let result = `${value}`;
    return `${result.length === 1 ? result + '.0' : result}`;
  }

  submitForm(event: any) {
    event.preventDefault();
    event.stopPropagation();

    if (this.editBookPage) {
      this.booksService.updateBook(this.initialValue?.id || -1, {
        id: this.initialValue?.id,
        ...this.form.value,
      });
      this.changeNavigation('Book was updated');
      this.bookListsService.updateBookInLists(
        {
          id: this.initialValue?.id,
          ...this.form.value,
        },
        this.listsValue
      );
    } else {
      const index = this.booksService.addBook(this.form.value);
      this.bookListsService.addBookToBookLists(
        {
          id: index,
          ...this.form.value,
        },
        this.listsValue
      );
      this.changeNavigation('Book was added');
    }
  }

  resetForm() {
    this.changeNavigation('Changes were not saved');
  }

  get bookCover() {
    return this.coverUrl?.valid
      ? this.domSan.bypassSecurityTrustUrl(this.coverUrl?.value)
      : '/assets/default-book-cover.png';
  }

  get coverUrl() {
    return this.form.get('coverUrl');
  }

  get ratingValue() {
    return this.form.get('rating')?.value;
  }

  get listsValue() {
    return this.form.get('lists')?.value;
  }

  private changeNavigation(
    message: string = 'Book is unavalibale for now, try later!'
  ) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
    });
    this.router.navigate(['/app']);
  }

  private setHeight() {
    this.renderer.setStyle(
      this.textarea.nativeElement,
      'height',
      `${this.textarea.nativeElement.scrollHeight}px`
    );
  }

  private setForm() {
    this.form = this.formBuilder.group({
      title: new FormControl(
        this.initialValue?.title ?? '',
        Validators.required
      ),
      author: new FormControl(
        this.initialValue?.author ?? '',
        Validators.required
      ),
      pageCount: new FormControl(
        this.initialValue?.pageCount ?? '',
        Validators.required
      ),
      coverUrl: new FormControl(
        this.initialValue?.coverUrl ?? '',
        Validators.pattern(/https:\/\/\S*/)
      ),
      publicationDate: new FormControl(
        this.initialValue?.publicationDate ?? new Date(),
        Validators.required
      ),
      rating: new FormControl(this.initialValue?.rating ?? 2.7),
      quote: new FormControl(this.initialValue?.quote ?? ''),
      description: new FormControl(
        this.initialValue?.description ?? '',
        Validators.required
      ),
      lists: new FormControl(this.initialValue?.lists ?? []),
    });
  }
}
