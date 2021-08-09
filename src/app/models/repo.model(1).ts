export class Repo {
    ownerAvatar: string;
    ownerName: string;
    name: string;
    creationDate: Date;
    constructor(repo: any) {
        this.ownerAvatar = repo['owner']['avatar_url'];
        this.ownerName = repo['owner']['login'];
        this.name = repo['name'];
        this.creationDate = new Date(repo['created_at']);
    }
}