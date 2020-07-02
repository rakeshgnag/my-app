import React from 'react';
import logo from './logo.svg';
import './App.css';
import  { Fragment } from 'react';
import CanvasJSReact from './assets/canvasjs.react';
import axios from "axios";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

class Dashboard extends React.Component {


	constructor(props) {
	    super(props);
	    this.state = {
	      error: null,
	      isLoaded: false,
	      items: []
	    };
	 }

      componentDidMount() {
	    fetch("http://codegama.localhost/testdata")
	      .then(res => res.json())
	      .then(
	        (result) => {
	          this.setState({
	            isLoaded: true,
	            items: result.data
	          });
	        },
	        // Note: it's important to handle errors here
	        // instead of a catch() block so that we don't swallow
	        // exceptions from actual bugs in components.
	        (error) => {
	          this.setState({
	            isLoaded: true,
	            error
	          });
	        }
	      )
	  }

  addSymbols(e){
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		if(order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	}



  render() {
  const { error, isLoaded, items } = this.state;
  const dataPointsDB = [];
  var x = [];
  for (var i = 0; i < items.length; i++) {
  	x ={'y':parseInt(items[i].no_of_questions,10),label: items[i].tag };
     dataPointsDB.push(x);
   }	
  const options = {
			animationEnabled: true,
			theme: "light2",
			title:{
				text: "Stackoverflow Data"
			},
			axisX: {
				title: "Tags",
				reversed: true,
			},
			axisY: {
				title: "No Of Questions",
				labelFormatter: this.addSymbols
			},
			data: [{
				type: "bar",
				dataPoints: dataPointsDB
			}]
		}
		
		return (
		<div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
		</div>
		);
  }

}

export default Dashboard;
