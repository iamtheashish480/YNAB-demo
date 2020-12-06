import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { TableComponent } from './table/table.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ModalComponent } from '../modal/modal.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, TableComponent, CreateAccountComponent,ModalComponent],
  imports: [
    CommonModule,HomeRoutingModule,   MatButtonModule,MatToolbarModule,MatIconModule,MatSidenavModule,
    MatButtonToggleModule,FormsModule
  ]
})
export class HomeModule { }
