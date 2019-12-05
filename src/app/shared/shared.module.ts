// Angular Stuff
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Own Components
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    // Angular Stuff
    CommonModule
  ],
  exports: [
    // add your component here to become shared in core
    // Own Components
    HeaderComponent,
    FooterComponent
  ],
  declarations: [
    // Own Components
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
