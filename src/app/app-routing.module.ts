// Anguler Stuff
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Own Module
import { View1Component } from '@core/view1/view1.component';
import { HomeComponent } from '@core/home/home.component';
import { PokedexComponent } from '@core/pokedex/pokedex.component'
import { ProfilesComponent } from '@core/profiles/profiles.component'


const routes: Routes = [
     // <-- DEFAULT FALLBACK
    {path: 'home', component:HomeComponent},
    {path: 'pokedex', component:PokedexComponent},
    {path: 'profile', component:ProfilesComponent},
    { path: '**' , redirectTo: 'pokedex'}
  ];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}