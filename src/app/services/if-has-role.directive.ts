import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from './user.service';

@Directive({
  selector: '[IfHasRole]',
})
export class IfHasRoleDirective {
  permissions!: 'admin' | 'user';
  private showForAdmin = false;

  constructor(
    private templateRef: TemplateRef<unknown>,
    private vcr: ViewContainerRef,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.permissions = this.userService.user.role;
    this.showForAdmin = this.permissions === 'admin';
    this.displayTemplate();
  }

  private displayTemplate() {
    this.vcr.clear();
    if (this.showForAdmin) {
      this.vcr.createEmbeddedView(this.templateRef);
    }
  }
}
