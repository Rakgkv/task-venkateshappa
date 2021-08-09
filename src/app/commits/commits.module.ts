import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommitsComponent } from './commits.component';
import { CommitsRoutingModule } from './commits-routing.module';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [CommitsComponent],
  imports: [
    CommonModule,
    CommitsRoutingModule,
    MaterialModule
  ]
})
export class CommitsModule { }
