import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Repo }  from '../models/repo.model';
import { Commit }  from '../models/commit.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GitHubService {

  private baseUrl = 'https://api.github.com/';
  private header = new HttpHeaders().set(
    "authorization",
    'token ' + environment.authToken
  );

  constructor(private httpClient: HttpClient) { }

  getReposByText(searchValue: string): Observable<Repo[]> {
    return this.httpClient.get<any>(`${this.baseUrl}search/repositories?q=${searchValue}`, {
      headers: this.header
    }).pipe(map(repos => repos.items.map((repo: any) => new Repo(repo))));
  }

  getCommitsForRepo(ownerName: string, repoName: string) {
    return this.httpClient.get<any>(`${this.baseUrl}repos/${ownerName}/${repoName}/commits`, {
      headers: this.header
    }).pipe(map(commits => commits.map((commit: any) => new Commit(commit))));
  }

  getCommitsForRepoByText(ownerName: string, repoName: string, searchValue) {
    return this.httpClient.get<any>(`${this.baseUrl}repos/${ownerName}/${repoName}/commits?q=${searchValue}`, {
      headers: this.header
    }).pipe(map(commits => commits.map((commit: any) => new Commit(commit))));
  }


}
