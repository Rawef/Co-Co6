import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TinderComponent } from './tinder/tinder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { style } from '@angular/animations';
import { CreateprofileComponent } from './createprofile/createprofile.component';
@NgModule({
  declarations: [
    TinderComponent,
    CreateprofileComponent,
    
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    HammerModule,

  ],
  exports: [TinderComponent,
  ] // Ajoutez cette ligne
})
export class TinderModule { }