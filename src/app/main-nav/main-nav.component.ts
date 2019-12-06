import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {
  name:string;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private location:Location) {
    router.events.subscribe((val) => {
      if(location.path() != ''){
        if(location.path()=='/pokedex'){
          this.name='Pokedex'
        }
        else if(location.path()=='/home'){
          this.name='Home'
        }
      } else {
        this.name = 'Home'
      }
    });
  }


  ngOnInit(){
    
  }
}
