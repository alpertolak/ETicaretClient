import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CustomToastrService, ToastrMesseageType, ToastrPositon } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: CustomToastrService,
              private userAuthService: UserAuthService) {

  }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(catchError(error => {
        switch (error.status) {
          case HttpStatusCode.Unauthorized:

            
            this.toastrService.messeage("Bu işlemi yapmak için gerekli yetkiye sahip değilsiniz", "Yetkisiz İşlem", {
              messageType: ToastrMesseageType.Warning,
              position: ToastrPositon.TopRight
            })

            this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken")).then(data => { }) //then fonksiyonu değer döndürmez
            break;

          case HttpStatusCode.InternalServerError:
            this.toastrService.messeage("Sunucuya erişilenemiyor", "Sunucu Hatası", {
              messageType: ToastrMesseageType.Warning,
              position: ToastrPositon.TopRight
            })
            break;

          case HttpStatusCode.BadRequest:
            this.toastrService.messeage("Geçersiz İstek Yapıldı", "Geçersiz İstek", {
              messageType: ToastrMesseageType.Warning,
              position: ToastrPositon.TopRight
            })
            break;

          case HttpStatusCode.NotFound:
            this.toastrService.messeage("Erişim hatası (Bulunamadı)", "Sayfa Bulunamadı", {
              messageType: ToastrMesseageType.Warning,
              position: ToastrPositon.TopRight
            })
            break;

          default:
            this.toastrService.messeage("Beklenmeyen bir hata oluşmuştur.", "HATA", {
              messageType: ToastrMesseageType.Warning,
              position: ToastrPositon.TopRight
            })
            break;
        }
        return of(error);
      }));
    }
}
