import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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

  public dataSource: Repo[] = [];
  public displayedColumns = ['repo', 'creationDate'];

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

  search(value: string){
   this.searchValue.next(value);
  }

  getRepos(searchText: string) {
    this.getReposSubscription$ = this.githubService.getReposByText(searchText).subscribe((repos) => {
      this.dataSource = repos;
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
