import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  exports: [
    MatTableModule,
    CdkTableModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatIconModule
  ]
})
export class MaterialModule { }
