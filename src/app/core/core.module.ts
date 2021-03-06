// Angular Stuff
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Own Module
import { SharedModule } from '@shared/shared.module';

// Own Component - core
import { View1Component } from './view1/view1.component';
import { HomeComponent } from './home/home.component';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PokedexComponent } from './pokedex/pokedex.component';

@NgModule({
  imports: [
    // Angular Stuff
    CommonModule,

    // Own Module
    SharedModule,

    LayoutModule,

    MatToolbarModule,

    MatButtonModule,

    MatSidenavModule,

    MatIconModule,

    MatListModule
  ],
  declarations: [
    // Own Component - core
    View1Component,
    HomeComponent,
    PokedexComponent,
  ]
})
export class CoreModule { }
