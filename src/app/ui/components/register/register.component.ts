import { Component, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from '../../../base/base.component';
import { Create_User } from '../../../contracts/users/create_user';
import { User } from '../../../entities/user';
import { UserService } from '../../../services/common/models/user.service';
import { CustomToastrService, ToastrMesseageType, ToastrPositon } from '../../../services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: CustomToastrService,
    private spinner: NgxSpinnerService)
  {
    super(spinner)
  }

  frm: FormGroup; //takip edilecek nesnelerin reactive form nesnesi

  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      nameSurname: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3),
      ]],
      username: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3),
      ]],
      email: ["", [
        Validators.required,
        Validators.maxLength(250),
        Validators.email,
        
      ]],
      password: ["", [
        Validators.required,
      ]],
      passwordConfirm: ["", [
        Validators.required,
      ]],
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let password = group.get("password").value
        let passwordConfirm = group.get("passwordConfirm").value
        return password === passwordConfirm ? null : { notSame: true }
      }
      })
  }

  get component() {
    return this.frm.controls
  }

  submitted: boolean = false
  async onSubmit(user : User) {  


    this.submitted = true // kullanıcı kayıt ol butonuna bastığı zaman submitted true olarak işaretleniyor.
    

    if (this.frm.invalid)
    {
      return
    }

    const result: Create_User = await this.userService.create(user);

    if (result.succeeded) {
      this.toastrService.messeage(result.message, "Kullanıcı Kaydı Başarılı", {
        messageType: ToastrMesseageType.Success,
        position: ToastrPositon.TopRight
      })
    }
    else {
      this.toastrService.messeage(result.message, "Hata", {
        messageType: ToastrMesseageType.Error,
        position: ToastrPositon.TopRight
      })
    }
  }

}
