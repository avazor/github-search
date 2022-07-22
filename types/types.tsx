export interface IRepo {
  id: number;
  name: string;
  url: string;
  homepage: string;
  language: string;
  forks: number;
  has_wiki: boolean;
  open_issues: number;
  watchers: number;
}

export interface IReposData {
  repos: IRepo[];
  reposCount: number;
  currentPage: number;
  searchValue: string;
}
