import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { TokenResponse } from '../../../contracts/token/token_response';
import { CustomToastrService, ToastrMesseageType, ToastrPositon } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService, private toastService: CustomToastrService) { }

  async login(usernameOrEmail: string, password: string, callbackFunction?: () => void): Promise<any> {

    const observable: Observable<any | TokenResponse> = this.httpClientService.Post<any | TokenResponse>({
      controller: "auth",
      action: "login"
    }, { usernameOrEmail, password })

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse
    if (tokenResponse) {

      localStorage.setItem("accessToken", tokenResponse.token.accessToken);

      this.toastService.messeage("Kullanıcı Girişi Başarıyla Sağlanmıştır", "Giriş Başarılı", {
        messageType: ToastrMesseageType.Success,
        position: ToastrPositon.TopRight

      })
    }

    callbackFunction();
  }

  async googleLogin(user: SocialUser, callbackFucntion?: () => void): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.Post<SocialUser | TokenResponse>({
      controller: "auth",
      action: "google-login",
    }, user)

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse

    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);

      this.toastService.messeage("Google girişi başarıyla sağlanmıştır.", "Giriş Başarılı", {
        messageType: ToastrMesseageType.Success,
        position: ToastrPositon.TopRight
      })
    }

    callbackFucntion();
  }
}
