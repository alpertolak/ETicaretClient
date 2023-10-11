import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { _isAuthenticated } from '../../services/common/auth.service';
import { CustomToastrService, ToastrMesseageType, ToastrPositon } from '../../services/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private toastService: CustomToastrService,
    private spinnerService: NgxSpinnerService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    this.spinnerService.show(SpinnerType.BallClipRotateMultiple)

    if (!_isAuthenticated) {
      this.router.navigate(["login"], { queryParams: { returnUrl: state.url } })
      this.toastService.messeage("Tekrar giriş yapmanız gerekmektedir.", "Oturum süresi dolmuştur", {
        messageType: ToastrMesseageType.Warning,
        position: ToastrPositon.TopRight
      })
    }

    this.spinnerService.hide(SpinnerType.BallClipRotateMultiple)

    return true;
  }
  
}
