import { Component } from '@angular/core';
import { users } from '../../../Dummy_data/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  areaChartOptions = {
	  title: {
		  text: "Growth of Angular on YouTube"
	  },
	  animationEnabled: true,
	  axisX:{      
		interval: 10,
		intervalType: "day",
		valueFormatString: "D MMM",
		labelFontColor: "rgb(0,75,141)",
		minimum: new Date(2012, 6, 10)
	  },
	  axisY: {
		title: "Views on YouTube",
		interlacedColor: "#EBF2FA",
		tickColor: "azure",
		titleFontColor: "#4f81bc",
		valueFormatString: "#M,,."
	  },
	  data: [{ 
		name: 'views',
		type: "area",
		markerSize: 8,
		dataPoints: [
		  { x: new Date(2012, 6, 15), y: 0,  indexLabel: "Release", indexLabelFontColor: "orangered", markerColor: "orangered"},       
		  { x: new Date(2012, 6, 18), y: 2000000 }, 
		  { x: new Date(2012, 6, 23), y: 6000000 }, 
		  { x: new Date(2012, 7, 1), y: 10000000, indexLabel:"10M"}, 
		  { x: new Date(2012, 7, 11), y: 21000000 }, 
		  { x: new Date(2012, 7, 23), y: 50000000 }, 
		  { x: new Date(2012, 7, 31), y: 75000000  }, 
		  { x: new Date(2012, 8, 4), y: 100000000, indexLabel:"100M" },
		  { x: new Date(2012, 8, 10), y: 125000000 },
		  { x: new Date(2012, 8, 13), y: 150000000},	
		  { x: new Date(2012, 8, 16), y: 175000000},	
		  { x: new Date(2012, 8, 18), y: 200000000, indexLabel:"200M"},	
		  { x: new Date(2012, 8, 21), y: 225000000},	
		  { x: new Date(2012, 8, 24), y: 250000000},	
		  { x: new Date(2012, 8, 26), y: 275000000},	
		  { x: new Date(2012, 8, 28), y: 302000000, indexLabel:"300M"}	
		]
	  }]
	}

  barChartOptions = {
    title:{
      text: "Angular Column Chart"  
    },
    animationEnabled: true,
    data: [{        
      type: "column",
      dataPoints: [
        { x: 10, y: 71 },
        { x: 20, y: 55 },
        { x: 30, y: 50 },
        { x: 40, y: 65 },
        { x: 50, y: 95 },
        { x: 60, y: 68 },
        { x: 70, y: 28 },
        { x: 80, y: 34 },
        { x: 90, y: 14 }
      ]
    }]
  }
}
