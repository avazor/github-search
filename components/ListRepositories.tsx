import React, {FC} from 'react';
import {IRepo} from "../types/types";

interface RepoListProps {
    repos: IRepo[],
    loading: boolean
}

const ListRepositories: FC<RepoListProps> = ({repos, loading}) => {
    {
        if (loading) {
            return (
                <div>
                    Loading...
                </div>
            )
        }
        return (
            <>{
                repos.map(repo => {
                    return (
                        <div className='child flex-child' key={repo.id}>
                            <h3>{repo.name}</h3>
                            <span>{repo.url}</span>
                        </div>
                    )
                })
            }</>
        )
    }
};

export default ListRepositories;