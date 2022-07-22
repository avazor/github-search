import React, { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../_app";
import Layout, { useReposContext } from "../../components/Layout";
import { IRepo } from "../../types/types";

const Id: NextPageWithLayout = () => {
  const router = useRouter();
  const [repos, setRepos] = useReposContext();
  const [currentRepo, setCurrentRepo] = useState<IRepo | undefined>(undefined);

  const getCurrentRepo = (): IRepo | undefined => {
    for (const reposKey in repos) {
      if (repos[reposKey]["id"] == router.query.id) {
        return repos[reposKey];
      }
    }
  };

  useEffect(() => {
    const repo = getCurrentRepo();

    if (!repo) router.push("/");
    setCurrentRepo(repo);
  }, []);

  return (
    <div className="post-content-wrapper">
      {currentRepo && (
        <div className="flex">
          <div className="child flex-child" key={currentRepo.id}>
            <h3>{currentRepo.name}</h3>
            <div data-cy="repo-url">Url: {currentRepo.url}</div>
            <div>Homepage: {currentRepo.homepage}</div>
            <div>Language: {currentRepo.language}</div>
            <div>Forks: {currentRepo.forks}</div>
            <div>Has Wiki: {currentRepo.has_wiki}</div>
            <div>Open issues: {currentRepo.open_issues}</div>
            <div>Watchers: {currentRepo.watchers}</div>
          </div>

          <a
            className="button"
            href={currentRepo.url}
            target="_blank"
            rel="noreferrer"
          >
            Check Repo in Github
          </a>
          <input
            className="button back-button"
            data-cy="back-button"
            type={"button"}
            onClick={() => {
              router.back();
            }}
            value={"Back"}
          />
        </div>
      )}
    </div>
  );
};

Id.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Id;
