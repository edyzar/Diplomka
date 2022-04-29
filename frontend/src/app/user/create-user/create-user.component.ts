import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../model/user.model";
import {UserService} from "../../service/user.service";
import {Shop} from "../../model/shop.model";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  providers: [UserService]
})
export class CreateUserComponent implements OnInit {

  isSaveDisabled: boolean = true;

  readonly fg: FormGroup;

  readonly firstNameCtrl = new FormControl(null, Validators.required);
  readonly lastNameCtrl = new FormControl(null, Validators.required);
  readonly emailCtrl = new FormControl(null, Validators.required);
  readonly cityCtrl = new FormControl(null, Validators.required);

  constructor(readonly userService: UserService, private router: Router, private toastService: NgToastService) {
    this.fg = new FormGroup({
      firstName: this.firstNameCtrl,
      lastName: this.lastNameCtrl,
      email: this.emailCtrl,
      city: this.cityCtrl
    });
  }

  ngOnInit(): void {
    this.firstNameCtrl.valueChanges.subscribe(() => this.isValidForm());
    this.lastNameCtrl.valueChanges.subscribe(() => this.isValidForm());
    this.emailCtrl.valueChanges.subscribe(() => this.isValidForm());
    this.cityCtrl.valueChanges.subscribe(() => this.isValidForm());
  }

  saveUser() {
    const user: User = {
      firstName: this.firstNameCtrl.value,
      lastName: this.lastNameCtrl.value,
      email: this.emailCtrl.value,
      city: this.cityCtrl.value
    }

    this.userService.saveUser(user).subscribe({
      next: (it: User) => {
        this.toastService.success({detail: "Informace", summary: "Uložení proběhlo v pořádku", duration: 3000});
        this.router.navigate(['detailuser/' + it.userId]);
      },
      error: (error: HttpErrorResponse) => this.toastService.error({detail: "Chyba", summary: error.statusText, duration: 3000})
    });
  }


  private isValidForm() {
    this.isSaveDisabled = !(
      this.firstNameCtrl.value !== null && this.firstNameCtrl.value !== ''
      && this.lastNameCtrl.value !== null && this.lastNameCtrl.value !== ''
      && this.emailCtrl.value !== null && this.emailCtrl.value !== ''
      && this.cityCtrl.value !== null && this.cityCtrl.value !== ''
    );
  }
}
