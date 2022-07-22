export interface IRepo
{
    id: number
    name: string
    url: string


}

export interface IReposData
{
    repos: IRepo[]
    reposCount: number;
    currentPage: number;
    searchValue: string;
}