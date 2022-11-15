import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppShellComponent } from './app-shell/app-shell.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BooksListComponent } from './books/books-list/books-list.component';
import { LoginComponent } from './login/login/login.component';
import { MainComponent } from './main/main.component';
import { BookItemComponent } from './shared/book-item/book-item.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'app',
    component: AppShellComponent,
    children: [
      { path: '', component: MainComponent },
      { path: 'edit/:id', component: BookDetailComponent },
      { path: 'book/:id', component: BookItemComponent },
      { path: 'addBook', component: BookDetailComponent },
      { path: 'lists', component: BooksListComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
