import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ApiService} from '@shared/services/api.service'
import {Router} from '@angular/router'
import { ActivatedRoute } from '@angular/router';
import {Chart} from 'chart.js'
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';
import {COLOR} from '@app/shared/objects/color'


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
  colors=COLOR
  barChartOptions: ChartOptions = 
  {
    responsive: true,
    title: {
      display: true,
      text: 'TYPE MULTIPLIER',
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
  let barColor=""
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
    console.log(this.colors)
    for (const x in this.colors){
      console.log(this.colors[x]['type'])
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
   }
  
  }

  

