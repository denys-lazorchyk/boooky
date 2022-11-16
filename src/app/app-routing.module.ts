import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppShellComponent } from './app-shell/app-shell.component';
import { AuthGuard } from './auth/auth.guard';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BooksListComponent } from './books/books-list/books-list.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';
import { LoginComponent } from './login/login/login.component';
import { MainComponent } from './main/main.component';
import { RolesGuard } from './services/roles.guard';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'app',
    component: AppShellComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: MainComponent },
      { path: 'edit/:id', component: EditBookComponent },
      { path: 'book/:id', component: BookDetailComponent },
      { path: 'addBook', component: EditBookComponent },
      {
        path: 'lists',
        component: BooksListComponent,
        canActivate: [RolesGuard],
      },
    ],
  },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
  { path: '404', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, RolesGuard],
})
export class AppRoutingModule {}
