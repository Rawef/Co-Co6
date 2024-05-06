import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './components/post/post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AfficherpostComponent } from './components/afficherpost/afficherpost.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';



@NgModule({
  declarations: [
    PostComponent,
   
    AfficherpostComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule.forRoot(),
  ]
})
export class ForumModule { }
