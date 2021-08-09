import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReposComponent } from './repos.component';
import { ReposRoutingModule } from './repos-routing.module';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [ReposComponent],
  imports: [
    CommonModule,
    ReposRoutingModule,
    MaterialModule
  ]
})
export class ReposModule { }
