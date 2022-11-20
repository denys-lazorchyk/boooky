import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Imported components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookItemComponent } from './shared/book-item/book-item.component';
import { SearchComponent } from './shared/search/search.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BooksListComponent } from './books/books-list/books-list.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login/login.component';
import { MainComponent } from './main/main.component';
import { AnimatedBackgroundComponent } from './shared/animated-background/animated-background.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IfHasRoleDirective } from './services/if-has-role.directive';

//Angular Material Library
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AppShellComponent } from './app-shell/app-shell.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    BookItemComponent,
    SearchComponent,
    EditBookComponent,
    BookDetailComponent,
    BooksListComponent,
    HeaderComponent,
    MenuComponent,
    LoginComponent,
    MainComponent,
    AnimatedBackgroundComponent,
    PageNotFoundComponent,
    AppShellComponent,
    IfHasRoleDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    FormsModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
