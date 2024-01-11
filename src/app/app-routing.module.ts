import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisualComponent } from './visual/visual.component';

const routes: Routes = [
  {
    path:'',
    component:VisualComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
