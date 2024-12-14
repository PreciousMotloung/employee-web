import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './employee/home/home.component';

const routes: Routes = [
  {path:"employee/home",component:HomeComponent},
  {path:"employee",redirectTo:"eemployee/home",pathMatch:"full"},
  {path:"",redirectTo:"employee/home",pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
