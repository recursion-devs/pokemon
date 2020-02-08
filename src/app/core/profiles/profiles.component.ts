import { Component, OnInit, ViewChild } from '@angular/core';
import {ApiService} from '@shared/services/api.service'
import {Router} from '@angular/router'
import { ActivatedRoute } from '@angular/router';
import {Chart} from 'chart.js'
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
  @ViewChild('ChartBar',{static:true}) chartRefBar;
  chart_bar : any;
  id
  index
  data
  show='data'
  str="https://32wwqvjn96.execute-api.ap-southeast-1.amazonaws.com/dev/pkdex/pkmon/"
  
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['SciFi'], ['Drama'], 'Comedy'];
  public pieChartData: SingleDataSet = [30, 50, 20];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

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
    
    this.click()

     
   } catch (error) {
    
    }
    finally{
      
    }
   }
   click(){
     this.show='bar'
     console.log(this.show)
     this.generateBar()
   }
  
  generateBar(){
    console.log(this.chart_bar)
    try {
      this.chart_bar = new Chart(this.chartRefBar.nativeElement, {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
  
      });
    } catch (error) {
      console.log(error.message)
    }
    console.log(this.chart_bar)
  }
  }

