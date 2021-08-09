export class Commit {
    author: string;
    url: string;
    message: string;
    constructor(repo: any) {
        this.author = repo['commit']['author']['name'];
        this.url = repo['commit']['url'];
        this.message = repo['commit']['message'];
    }
}