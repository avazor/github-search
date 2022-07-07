import React, {useState, FC} from 'react';
import {Octokit} from "@octokit/rest";
import ListRepositories from "./ListRepositories";
import {IRepo} from "../types/types";
import Pagination from "./Pagination";

const Repositories: FC = () => {
    const [repos, setRepos] = useState<IRepo[]>([]);
    const [reposCount, setReposCount] = useState<number>(0);
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const reposPerPage = 10;

    async function fetchRepos() {
        setLoading(true);
        try {
            const octokit = new Octokit({
                auth: process.env.GITHUB_API_KEY
            })

            const responce = await octokit.request(
                'GET /search/repositories',
                {q: searchValue, per_page: reposPerPage, page: currentPage}
            )
            console.log('rendering page ' + currentPage)
            const ReposList = responce.data.items.map(item=>{
                return {id:item.id, name:item.name, url:item.html_url}
            })
            setRepos(ReposList)
            setReposCount(responce.data.total_count)
            setLoading(false)
        } catch (e) {
            console.log(e)
        }
    }

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        fetchRepos()
    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target?.value)
    }
    const paginate = (pageNumber: number, e:React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        setCurrentPage(pageNumber)

        console.log('clicked on page ' + pageNumber)
        console.log('page to render ' + currentPage)
        fetchRepos()
    };

    return (
        <>
            <div className='post-content-wrapper container flex'>
                <input id='searchInput' className='search-input' onChange={changeHandler} type="text"
                       placeholder=" Type Repo Name"/>
                <button className='button' onClick={clickHandler}>Search</button>
            </div>
            <div className='post-content-wrapper'>
                <div className='flex'>
                        <ListRepositories repos={repos} loading={loading}/>
                </div>
                <Pagination
                    itemsPerPage={reposPerPage}
                    totalItems={reposCount}
                    currentPage={currentPage}
                    paginate={paginate}
                />
            </div>
        </>
    )
};

export default Repositories;