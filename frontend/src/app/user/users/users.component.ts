import {Component} from '@angular/core';
import {UserService} from "../../service/user.service";
import {User} from "../../model/user.model";
import {NgToastService} from "ng-angular-popup";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UserService]
})
export class UsersComponent {

  users: User[] = [];

  constructor(private userService: UserService, private toastService: NgToastService) {
    userService.findAllUsers().subscribe({
      next: (it: User[]) => this.users = it,
      error: (error: HttpErrorResponse) => {
        if (error.statusText === 'OK') {
          this.toastService.error({detail: "Chyba", summary: error.error.text, duration: 3000})
        } else {
          this.toastService.error({detail: "Chyba", summary: error.statusText, duration: 3000})
        }
      }
    });
  }

  deleteUser(userId: number) {
    this.userService.deleteUserById(userId).subscribe({
      next: () => this.toastService.success({
        detail: "Informace",
        summary: "Odebrání zákazníka proběhlo v pořádku",
        duration: 3000
      }),
      error: (error: HttpErrorResponse) => this.toastService.error({
        detail: "Chyba",
        summary: error.statusText,
        duration: 3000
      })
    });
  }

}
