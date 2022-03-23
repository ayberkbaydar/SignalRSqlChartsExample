import { Component } from '@angular/core';

import * as signalR from "@microsoft/signalr";

import * as Highcharts from "highcharts";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  connection: signalR.HubConnection;
  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:5001/satishub")
      .build();

    this.connection.start();

    this.connection.on("receiveMessage", message => {
      this.chart.showLoading();
      console.log(message);

      for (let i = 0; i < this.chart.series.length; i++) {
        this.chart.series[i].remove();
      }
      for (let i = 0; i < message.length; i++) {
        this.chart.addSeries(message[i]);
      }
      this.updateFromInput = true;
      this.chart.hideLoading();
    });

    const self = this;
    this.chartCallback = (chart: any) => {
      self.chart = chart;
    }
  }

  chart: any;
  updateFromInput = false;
  chartCallback;

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    //Grafik Title
    title: {
      text: "Başlık"
    },
    //Alt Title
    subtitle: {
      text: "Alt Başlık"
    },
    //Y Ekseni
    yAxis: {
      title: {
        text: "Y Ekseni"
      }
    },
    //X Ekseni
    xAxis: {
      accessibility: {
        rangeDescription: "2019 - 2020"
      }
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle"
    },
    series: [{
      name: 'A',
      type: 'line',
      data: [100, 200]
    }],
    plotOptions: {
      series: {
        label: {
          connectorAllowed: true
        },
        pointStart: 100
      }
    }
  }
}
