import { Component, OnInit } from '@angular/core';
import {ApiService} from '@shared/services/api.service'
import {Router} from '@angular/router'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
  
  id
  index
  data
  str="https://32wwqvjn96.execute-api.ap-southeast-1.amazonaws.com/dev/pkdex/pkmon/"
  constructor(private api: ApiService , 
              private router:Router,
              private activeRoute:ActivatedRoute) { }

  async ngOnInit() {
   try {
     this.activeRoute.paramMap.subscribe(params=>{
      this.index=params.get('id')
     }) 
     this.data=await this.api.getPokemonData(this.str,this.index).toPromise() 
    this.id="https://galardex.s3-ap-southeast-1.amazonaws.com/pkimage/"+this.index+".png"
    console.log(this.data)
      
        
     
   } catch (error) {
    
    }
    finally{
      
    }
   }
  
  
  }

