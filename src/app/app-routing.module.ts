import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'repos',
    loadChildren: () => import('./repos/repos.module').then(m => m.ReposModule)
  },
  {
    path: 'commits/:ownerName/:repoName',
    loadChildren: () => import('./commits/commits-routing.module').then(m => m.CommitsRoutingModule)
  },
  {
    path: '**',
    redirectTo: 'repos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
