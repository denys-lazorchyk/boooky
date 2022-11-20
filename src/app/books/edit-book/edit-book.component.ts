import {
  AfterViewInit,
  Component,
  ElementRef,
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
import { Book } from 'src/app/models/book';
import { PreBook } from 'src/app/models/bookForm';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
})
export class EditBookComponent implements OnInit, AfterViewInit {
  initialValue!: Book | undefined;
  initialFormValue: PreBook = {
    title: '',
    description: '',
    pageCount: 0,
    quote: '',
    author: '',
    rating: 2.7,
    publicationDate: new Date(),
    coverUrl: '',
  };
  form!: FormGroup;
  editBookPage = false;
  selectedId: number | undefined = undefined;
  pageTitle: string = 'Add book';
  buttonName: string = 'Add book';
  @ViewChild('textarea') textarea!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private domSan: DomSanitizer,
    private renderer: Renderer2,
    private booksService: BooksService
  ) {
    this.route.paramMap.subscribe((params) => {
      if (/\d/.test(params.get('id') ?? '')) {
        this.editBookPage = true;
        this.selectedId = Number(params.get('id'));
        this.initialValue = this.booksService.getBook(this.selectedId);
        this.initialFormValue = {
          title: this.initialValue?.title ?? '',
          description: this.initialValue?.description ?? '',
          pageCount: this.initialValue?.pageCount ?? 0,
          quote: this.initialValue?.quote ?? '',
          author: this.initialValue?.author ?? '',
          rating: this.initialValue?.rating ?? 2.7,
          publicationDate: this.initialValue?.publicationDate ?? new Date(),
          coverUrl: this.initialValue?.coverUrl ?? '',
        };

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
    } else {
      this.booksService.addBook(this.form.value);
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
      title: new FormControl(this.initialFormValue?.title, Validators.required),
      author: new FormControl(
        this.initialFormValue?.author,
        Validators.required
      ),
      pageCount: new FormControl(
        this.initialFormValue?.pageCount,
        Validators.required
      ),
      coverUrl: new FormControl(
        this.initialFormValue?.coverUrl,
        Validators.pattern(/https:\/\/\S*/)
      ),
      publicationDate: new FormControl(
        this.initialFormValue?.publicationDate,
        Validators.required
      ),
      rating: new FormControl(this.initialFormValue?.rating),
      quote: new FormControl(this.initialFormValue?.quote),
      description: new FormControl(
        this.initialFormValue?.description,
        Validators.required
      ),
    });
  }
}
