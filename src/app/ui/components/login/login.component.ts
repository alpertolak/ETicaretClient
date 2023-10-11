import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { TokenResponse } from '../../../contracts/token/token_response';
import { AuthService } from '../../../services/common/auth.service';
import { HttpClientService } from '../../../services/common/http-client.service';
import { UserAuthService } from '../../../services/common/models/user-auth.service';
import { UserService } from '../../../services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {
  constructor(
    private userAuthService: UserAuthService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private activetedRoute: ActivatedRoute,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private httpClientService: HttpClientService) {
    super(spinner)

    socialAuthService.authState.subscribe(async (user: SocialUser) => {
       
      this.showSpinner(SpinnerType.BallClipRotateMultiple)

      //GOOGLE LOGİN
      await this.userAuthService.googleLogin(user, () => {
        this.authService.identityCheck()
        this.hideSpinner(SpinnerType.BallClipRotateMultiple)
      })

    })
  }

  async login(usernameOrEmail: string, password: string) {


    this.showSpinner(SpinnerType.BallClipRotateMultiple)
    await this.userAuthService.login(usernameOrEmail, password, () => {
      this.authService.identityCheck();

      //queryString olarak gelen parametreleri okumak için kullanılan komut bloğu
      this.activetedRoute.queryParams.subscribe(params => {

        //qeuryString bilgileri arasından "returnUrl" bilgisi alınıyor
        const returnUrl: string = params["returnUrl"]

        //returnUrl adında bir değişken mevcut ise yönledirme gerçekleşiyor
        if (returnUrl) {
          this.router.navigate([returnUrl]); // url üzerinden gelen returnUrl bilgisine geri dönülüyor.
        }
      })
      this.hideSpinner(SpinnerType.BallClipRotateMultiple)
    });

  }
} 
