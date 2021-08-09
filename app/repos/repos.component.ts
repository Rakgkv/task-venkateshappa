import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { Repo } from '../models/repo.model';
import { GitHubService } from '../services/git-hub.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReposComponent implements OnInit, OnDestroy {

  private searchValue = new Subject<string>();
  private searchValueObservable$ = this.searchValue.asObservable();
  private searchValueSubscription$: Subscription;
  private getReposSubscription$: Subscription;

  public dataSource: any
  public displayedColumns = ['repo', 'creationDate'];
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private githubService: GitHubService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.searchValueSubscription$ = this.searchValueObservable$.pipe(delay(500)).subscribe((searchText) => {
      if(searchText) {
        this.getRepos(searchText);
      }
    });
  }

  route() {
    this.router.navigate(['commits']);
  }

  searchByRepo(value: string){
   this.searchValue.next(value);
  }

  searchByStars(value: string){
    this.searchValue.next(value);
   }

   searchByLanguage(value: string){
    this.searchValue.next(value);
   }

  getRepos(searchText: string) {
    this.getReposSubscription$ = this.githubService.getReposByText(searchText).subscribe((repos) => {
      this.dataSource = new MatTableDataSource(repos);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
      this.dataSource.filterPredicate = function (
        data: any,
        name: string
      ): boolean {
        return data.name.toLowerCase().includes(name);
      };
      this.cdRef.detectChanges();
    });
  }

  loadCommits(ownerName: string, repoName: string) {
    this.router.navigate(['commits', ownerName, repoName]);
  }

  ngOnDestroy() {
    this.searchValueSubscription$.unsubscribe();
    this.getReposSubscription$.unsubscribe();
  }
}
