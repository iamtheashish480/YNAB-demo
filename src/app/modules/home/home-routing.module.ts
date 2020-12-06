import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HomeComponent } from './home.component';


const routes: Routes = [
 
  {
    path: '', component: HomeComponent, }, { path: '', redirectTo: '', pathMatch: 'full' },{
      path:'create-account/:budgetId',component:CreateAccountComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
