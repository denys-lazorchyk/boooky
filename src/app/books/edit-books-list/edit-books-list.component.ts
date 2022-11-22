import { Component, OnInit } from '@angular/core';
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
import { BookList } from 'src/app/models/bookList';
import { BookListsService } from 'src/app/services/book-lists.service';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-edit-books-list',
  templateUrl: './edit-books-list.component.html',
  styleUrls: ['./edit-books-list.component.scss'],
})
export class EditBooksListComponent implements OnInit {
  initialValue!: BookList | undefined;
  form!: FormGroup;
  editListPage = false;
  selectedId: number | undefined = undefined;
  pageTitle: string = 'Add book list';
  buttonName: string = 'Add list';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private listsService: BookListsService
  ) {
    this.route.paramMap.subscribe((params) => {
      if (/\d/.test(params.get('id') ?? '')) {
        this.editListPage = true;
        this.selectedId = Number(params.get('id'));
        this.initialValue = this.listsService.getList(this.selectedId);

        if (!this.initialValue) {
          this.changeNavigation();
        }
        this.setForm();
        this.pageTitle = 'Edit list';
        this.buttonName = 'Save changes';
      }
    });

    this.setForm();
  }

  ngOnInit(): void {}

  formatLabel(value: number): string {
    let result = `${value}`;
    return `${result.length === 1 ? result + '.0' : result}`;
  }

  submitForm(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (this.editListPage) {
      this.listsService.updateList(this.initialValue?.id || -1, {
        id: this.initialValue?.id,
        books: this.initialValue?.books,
        ...this.form.value,
      });
      this.changeNavigation('List was updated');
    } else {
      this.listsService.addList(this.form.value);
      this.changeNavigation('List was added');
    }
  }

  resetForm() {
    if (this.editListPage) {
      this.changeNavigation('Changes were not saved');
    }
  }

  deleteList() {
    this.listsService.deleteList(this.initialValue?.id ?? -1);
    this.changeNavigation('Book list was deleted!');
  }

  get title() {
    return this.form.get('title');
  }

  private changeNavigation(
    message: string = 'List is unavalibale for now, try later!'
  ) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
    });
    this.router.navigate(['/app']);
  }

  private setForm() {
    this.form = this.formBuilder.group({
      listName: new FormControl(this.initialValue?.listName, [
        Validators.required,
        Validators.maxLength(142),
      ]),
    });
  }
}
