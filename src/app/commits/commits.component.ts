import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Commit } from '../models/commit.model';
import { GitHubService } from '../services/git-hub.service';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommitsComponent implements OnInit, OnDestroy {
  private searchValue = new Subject<string>();
  private searchValueObservable$ = this.searchValue.asObservable();
  private searchValueSubscription$: Subscription;
  private routerSubscription$: Subscription;
  private commitSubscription$: Subscription;
  private ownerName: string;
  private repoName: string;

  public displayedColumns = ['author', 'url', 'message'];
  public intactDataSource: Commit[] = [];
  public filteredDataSource: Commit[] = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private githubService: GitHubService,
    private cdRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routerSubscription$ = this.activatedRoute.params.subscribe(
      (params) => {
        this.getCommits(params.ownerName, params.repoName);
        this.ownerName = params.ownerName;
        this.repoName = params.repoName;
      }
    );
    this.searchValueSubscription$ = this.searchValueObservable$
      .pipe(delay(500))
      .subscribe((searchText) => {
        if (searchText) {
          this.filteredDataSource = this.intactDataSource.filter((ds) => ds.message.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
        } else {
          this.filteredDataSource = this.intactDataSource;
        }
        this.cdRef.detectChanges();
      });
  }

  search(searchText) {
    console.log("rakesh")
    this.searchValue.next(searchText);
  }

  getCommits(ownerName: string, repoName: string) {
    this.githubService
      .getCommitsForRepo(ownerName, repoName)
      .subscribe((commits) => {
        this.intactDataSource = commits;
        this.filteredDataSource = commits;
        this.cdRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.searchValueSubscription$.unsubscribe();
    this.routerSubscription$.unsubscribe();
  }
}
