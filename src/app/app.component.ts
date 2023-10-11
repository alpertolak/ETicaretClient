import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMesseageType, ToastrPositon } from './services/ui/custom-toastr.service';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public authService: AuthService, private toasterService: CustomToastrService, private router: Router) {
    authService.identityCheck();
  }

  signOut() {
    localStorage.removeItem("accessToken")
    this.authService.identityCheck()

    this.router.navigate([""])
    // çıkış yapıldığında anasayfaya dönmesi için router kullanıyoruz (içini boş verdiğimiz zaman en üstteki router yani anasayfaya dönüyor)

    this.toasterService.messeage("Oturumunuz sonlandırılmıştır.", "Çıkış Başarılı", {
      messageType: ToastrMesseageType.Warning,
      position: ToastrPositon.TopRight
    })

  }
}
