import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ApiService} from '@shared/services/api.service'
import {Router} from '@angular/router'
import { ActivatedRoute } from '@angular/router';
import {Chart} from 'chart.js'
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
  @ViewChild('ChartBar',{static:true}) chartRefBar;
  @ViewChild("bg") bg: ElementRef
  chart_bar : any;
  id
  index
  data
  show='data'
  str="https://32wwqvjn96.execute-api.ap-southeast-1.amazonaws.com/dev/pkdex/pkmon/"
  
  barChartOptions: ChartOptions = 
  {
    responsive: true,
    title: {
      display: true,
      text: 'Type Multiplier',
      fontColor: 'white',  // chart title color (can be hexadecimal too)
    },
    scales: {
      xAxes: [{
        stacked: true,
        ticks: {
          fontColor: 'white',  // x axe labels (can be hexadecimal too)
        },
        gridLines: {
          color: '#5f5e5e'  // grid line color (can be removed or changed)
        }
      }],
      yAxes: [{
        stacked: true,
        ticks: {
          fontColor: 'white',  // y axes numbers color (can be hexadecimal too)
          min: 0,
          beginAtZero: true,

        },
        gridLines: {
          color: '#5f5e5e'  // grid line color (can be removed or changed)
        },
        scaleLabel: {
          display: true,
          labelString: 'Pokemon Type',
          fontColor: 'white',  // y axe label color (can be hexadecimal too)
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
  barChartType: ChartType = 'horizontalBar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartColor: Color[]
  
  barChartData: ChartDataSets[] 

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
    let label=[]
    let chartData=[]
    for (const x in this.data.typeDamage) {
      label.push(x)
      chartData.push(parseFloat(this.data.typeDamage[x].slice(1)))
    }
    console.log(label)
    console.log(chartData)
    this.barChartLabels=label
    this.barChartData=[{data:chartData,label:'Multiplier',backgroundColor:["black","white","black","white","black","white","black","white","black","white","black","white","black","white","black","white","black","white"]}]
    this.barChartColor=[{
      borderColor: 'black',
      backgroundColor:'white' ,
      
    }]
     
   } catch (error) {
    
    }
    finally{
      
    }
   }
  
  
  
  }

