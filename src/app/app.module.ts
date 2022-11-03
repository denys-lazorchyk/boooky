import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './shared/book/book.component';
import { BookItemComponent } from './shared/book-item/book-item.component';
import { SearchComponent } from './shared/search/search.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BooksListComponent } from './books/books-list/books-list.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookItemComponent,
    SearchComponent,
    EditBookComponent,
    BookDetailComponent,
    BookListComponent,
    BooksListComponent,
    HeaderComponent,
    MenuComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
