import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboradComponent } from './admin/components/dashborad/dashborad.component';
import { HomeComponent } from './ui/components/home/home.component';
import { AuthGuard } from './guard/common/auth.guard';

const routes: Routes = [
  {
    //admin için üst yönlendirme bloğu
    path: "admin", component: LayoutComponent, children: [
      { path: "", component: DashboradComponent },

      { path: "customers", loadChildren: () => import("./admin/components/customers/customers.module").then(module => module.CustomersModule) },

      { path: "orders", loadChildren: () => import("./admin/components/orders/orders.module").then(module => module.OrdersModule) },

      { path: "products", loadChildren: () => import("./admin/components/products/products.module").then(module => module.ProductsModule) },
    ], canActivate : [AuthGuard]
  },

  //ui için üst yönlendirme bloğu 
  { path: "", component: HomeComponent },
  { path: "basket", loadChildren: () => import("./ui/components/baskets/baskets.module").then(module => module.BasketsModule) },

  { path: "products", loadChildren: () => import("./ui/components/products/products.module").then(module => module.ProductsModule) },

  { path: "register", loadChildren: () => import("./ui/components/register/register.module").then(module => module.RegisterModule) },

  { path: "login", loadChildren: () => import("./ui/components/login/login.module").then(module => module.LoginModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
