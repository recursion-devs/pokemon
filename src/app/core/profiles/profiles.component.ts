import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ApiService} from '@shared/services/api.service'
import {Router} from '@angular/router'
import { ActivatedRoute } from '@angular/router';

import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';
import {COLOR} from '@app/shared/objects/color'
import { POKEDEX } from '@shared/objects/pkdex';



@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
  @ViewChild('ChartBar',{static:true}) chartRefBar;
  loading
  @ViewChild("bg") bg: ElementRef
  pictureHolder=[]
  pokedex=POKEDEX
  chart_bar : any;
  id
  index
  data
  show='data'
  str="https://32wwqvjn96.execute-api.ap-southeast-1.amazonaws.com/dev/pkdex/pkmon/"
  colors=COLOR
  barChartOptions: ChartOptions = 
  {
    responsive: true,
    title: {
      display: true,
      text: 'WEAKNESS',
      fontColor: 'white', 
      fontFamily:'Proxima-Nova-ExtraBold' ,
      fontSize:16// chart title color (can be hexadecimal too)
    },
    scales: {
      xAxes: [{
        stacked: true,
        ticks: {
          fontColor: 'white',
          fontFamily:'Proxima-Nova-Regular' // x axe labels (can be hexadecimal too) bottom part!
        },
        gridLines: {
          color: '#5f5e5e'  // grid line color (can be removed or changed)
        }
      }],
      yAxes: [{
        stacked: true,
        ticks: {
          fontColor: 'white', 
          fontFamily:'Proxima-Nova-Regular', // y axes numbers color (can be hexadecimal too) side part!
          min: 0,
          beginAtZero: true,

        },
        gridLines: {
          color: '#5f5e5e'  // grid line color (can be removed or changed)
        },
        scaleLabel: {
          display: true,
          labelString: 'POKEMON TYPE',
          fontColor: 'white', 
          fontFamily:'Proxima-Nova-ExtraBold',
          fontSize:14 // y axe label color (can be hexadecimal too)
        }
      }]
    },
    legend: {
      display: true,
      labels: {
        fontColor: 'white', // legend color (can be hexadecimal too)
      },
    }
 }
  barChartLabels: Label[]
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartColor: Color[]
  
  barChartData: ChartDataSets[] 

  constructor(private api: ApiService , 
              private router:Router,
              private activeRoute:ActivatedRoute) { }

  async ngOnInit() {
  this.loading=true
  let barColor=""
   try {
     this.activeRoute.paramMap.subscribe(params=>{
     this.index=params.get('id')
     }) 
     
    this.data=await this.api.getPokemonData(this.str,this.index).toPromise() 
    this.id="https://galardex.s3-ap-southeast-1.amazonaws.com/pkimage/"+this.index+".png"
    console.log(this.data)
    console.log(this.pokedex)
    this.data.evolutionChain.chain.forEach(element => {
      
    for (const x in this.pokedex) {
        if(this.pokedex[x].name.toLowerCase()==element.toLowerCase()){
          console.log(this.pokedex[x].id.replace(/#/g,""))
          let tempo={
            "id":this.pokedex[x].id.replace(/#/g,""),
            "link":"https://galardex.s3-ap-southeast-1.amazonaws.com/pkimage/"+this.pokedex[x].id.replace(/#/g,"")+".png",
            "name":element.toLowerCase()
          }
          let checker=0

          for (const y in this.pictureHolder){
            if(tempo['id']==this.pictureHolder[y]['id']){
                checker=1
                break
            }
            
          }
          if (checker!=1){
            this.pictureHolder.push(tempo)
          }
          
          
        }
      }
  });
    let label=[]
    let chartData=[]
    for (const x in this.data.typeDamage) {
      label.push(x)
      chartData.push(parseFloat(this.data.typeDamage[x].slice(1)))
    }
    
    for (const x in this.colors){
      
      if(this.colors[x]['type']==this.data.type.standard[0]){
        barColor=(this.colors[x]['color']['dark2'])
      }
    }
    this.barChartLabels=label
    this.barChartData=[{data:chartData ,categoryPercentage:1,label:'Multiplier',backgroundColor:[barColor,barColor,barColor,barColor,barColor,barColor,barColor,barColor,barColor,barColor,barColor,barColor,barColor,barColor,barColor,barColor,barColor,barColor]}]
    this.barChartColor=[{
      borderColor: 'black',
      backgroundColor:'white' ,
      
    }]
   } catch (error) {
    
    }
    finally{
      
    }
  this.loading=false
  }
   evol(id){
    
    this.router.navigateByUrl('/profile', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/profile',id])
  }); 
   }
   back(){
     this.router.navigate(['/pokedex'])
   }
   
  
  }

  

