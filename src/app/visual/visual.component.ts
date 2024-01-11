import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.css']
})
export class VisualComponent {

  filterForm:any = FormBuilder

  constructor(
    private fb:FormBuilder,
    private http:HttpClient
    ){}

  ngOnInit(){
    console.log(environment.apiUrl)
    this.filterFormData()
  }

  filterFormData(){
    this.filterForm = this.fb.group({
      filterkey: ['', [Validators.required]],
      filtervalue:['', Validators.required]
    })
  }

  submitFilter(){
    this.http.get('').subscribe({
      
    })
  }

}
