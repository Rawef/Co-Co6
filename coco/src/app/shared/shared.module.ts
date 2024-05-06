import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from '../home/component/home/home.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    HttpClientModule,
    
    

  ],
  exports:[
    HeaderComponent,
    SpinnerComponent,
    
  ]
})
export class SharedModule { }
