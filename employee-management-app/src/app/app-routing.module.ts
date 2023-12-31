import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [  
  {
    path:"login",
    loadChildren: () => import('./login/login.module').then(l => l.LoginModule)
  },
  {
    path:"home",
    loadChildren: () => import('./home/home.module').then(home => home.HomeModule)
  },
  {
    path:"role",
    loadChildren: () => import('./role/role.module').then(role => role.RoleModule)
  },
  {
    path:'', 
    pathMatch:'full', 
    redirectTo:"/login"
  },
  {
    path:'**',  
    component : PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
