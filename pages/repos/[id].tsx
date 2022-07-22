import React, {ReactElement, useEffect} from 'react';
import {useRouter} from "next/router";
import {NextPageWithLayout} from "../_app";
import Layout, {useReposContext} from "../../components/Layout";
import Link from "next/link";
import {IRepo} from "../../types/types";

const Id: NextPageWithLayout = () => {
    const router = useRouter();
    const [repos, setRepos] = useReposContext();

    const getCurrentRepo = (): IRepo | undefined => {
        for (const reposKey in repos) {
            if (repos[reposKey]['id'] == router.query.id) {
                return repos[reposKey]
            }
        }
    }

    const currentRepo = getCurrentRepo();

    useEffect(() => {
        if (!currentRepo?.url) router.push('/');
    }, [])

    console.log(currentRepo)
    return (
        <div className='post-content-wrapper'>
            <div className='flex'>
                {
                    !currentRepo?.url && <Link href={currentRepo.url} key={currentRepo.id}>
                    <div className='child flex-child'>
                        <h3>{currentRepo.name}</h3>
                        <span>{currentRepo.url}</span>
                    </div>
                </Link> }
                <input type={"button"} onClick={() => {
                    router.back()
                }} value={'back'}/>
            </div>
        </div>
    )
};

Id.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Id;