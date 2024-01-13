import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators, FormGroup,FormArray, } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Highcharts from 'highcharts/es-modules/masters/highcharts.src';

@Component({
  selector: 'app-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.css']
})
export class VisualComponent {

  filterForm:any = FormBuilder
  allRecords:any
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: [{
      data: [1, 2, 3],
      type: 'column'
    }]
  };

  constructor(
    private fb:FormBuilder,
    private http:HttpClient
    ){}

    ngOnInit() {
      console.log(environment.apiUrl)
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
    console.log(this.filterForm.value.filters, "data iss")
    // this.http.get('').subscribe({

    // })
  }

  getAllRecords(){
    this.http.get(`${environment.apiUrl}/getallData`).subscribe({
      next:(res:any)=>{
        this.allRecords = res.message
      },
      error:(error:any)=>{
        console.log(error)
      }
    })
  }

}
