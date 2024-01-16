import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators, FormGroup,FormArray, } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
// import Highcharts from 'highcharts/es-modules/masters/highcharts.src';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);

@Component({
  selector: 'app-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.css']
})
export class VisualComponent {

  filterForm:any = FormBuilder
  allRecords:any
  allFilters:any = [{dbName:'end_year', showName:'End Year'}, {dbName:'topic', showName:"Topic"}, {dbName:'sector',showName:"Sector" }, {dbName:"region", showName:"Region"}, {dbName:"pestle", showName:"Pestle"}, {dbName:'source', showName:"Source"}, {dbName:'country', showName:"Country"}, {dbName:"likelihood", showName:"Likelihood"}]

  constructor(
    private fb:FormBuilder,
    private http:HttpClient
    ){}

    ngOnInit() {
      this.filterFormData();
      this.getAllRecords();
    }
    
    filterFormData() {
      this.filterForm = this.fb.group({
        filters: this.fb.array([
          this.fb.group({
            filterkey: ['', [Validators.required]],
            filtervalue: ['', Validators.required]
          })
        ])
      });
    }
    

    addFilter(){
      const newFiltersIs = this.fb.group({
        filterkey: ['', [Validators.required]],
        filtervalue: ['', Validators.required]
      });
      (this.filterForm.get('filters')as FormArray).push(newFiltersIs)
    }

  submitFilter() {
    this.http.post(`${environment.apiUrl}/getallfilterValues`, this.filterForm.value.filters).subscribe({
      next:(res:any)=>{
        this.allRecords = []
        this.allRecords = res.message
        this.createChartColumn()
      }
    })
  }

  getAllRecords(){
    this.http.get(`${environment.apiUrl}/getallData`).subscribe({
      next:(res:any)=>{
        this.allRecords = res.message
        this.createChartColumn()

      },
      error:(error:any)=>{
        console.log(error)
      }
    })
  }



  private createChartColumn(): void {
    let allDatas = this.allRecords
    const data: any[] = [];

    for (let i = 0; i < allDatas.length; i++) {
      data.push({
        name: allDatas[i].likelihood,
        y: allDatas[i].intensity,
      });
    }

    const chart = Highcharts.chart('chart-column' as any, {
      chart: {
        type: 'column',
      },
      title: {
        text: 'BlackCoofer Visualization',
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: true,
      },
      yAxis: {
        min: 0,
        title: "Likelihood",
      },
      xAxis: {
        type: 'category',
      },
      tooltip: {
        headerFormat: `<div>Likelihood: {point.y}</div>`,
        pointFormat: `<div>Intencity:{point.key}</div>`,
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [{
        name: 'Intensity',
        data,
      }],
    } as any);
  }

}
