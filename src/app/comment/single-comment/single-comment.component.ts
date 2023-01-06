import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.scss'],
})
export class SingleCommentComponent implements OnInit {
  editMode = false;
  user = this.userService.user;

  @Input() comment!: Comment;
  @Input() bookId!: number;
  @Output() deletedCommentEv = new EventEmitter<number>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {}
}
