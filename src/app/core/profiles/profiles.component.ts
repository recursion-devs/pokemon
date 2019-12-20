import { Component, OnInit } from '@angular/core';
import {ApiService} from '@shared/services/api.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
  
  id
  data
  constructor(private api: ApiService , private router:Router) { }

  async ngOnInit() {
   try {
    this.data= this.api.getData().subscribe(data=>
      this.data=data
      )
  
      this.id="https://galardex.s3-ap-southeast-1.amazonaws.com/pkimage/"+this.api.pokemonID+".png"
        
     
   } catch (error) {
    
    }
    finally{
      
    }
   }
  
  
  }

