import React, { useState, FC, useEffect } from "react";
import { Octokit } from "@octokit/rest";
import ListRepositories from "./ListRepositories";
import Search from "./Search";
import { useReposContext } from "./Layout";

const Repositories: FC = () => {
  const [repos, setRepos] = useReposContext();
  const [reposCount, setReposCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const reposPerPage = 10;

  useEffect(() => {
    fetchRepos(currentPage);
  }, [currentPage]);

  async function fetchRepos(page: number | null) {
    if (page) {
      setCurrentPage(page);
    }
    if (searchValue === "") {
      return;
    }
    setIsLoading(true);
    try {
      const octokit = new Octokit({
        auth: process.env.GITHUB_API_KEY,
      });

      const response = await octokit.request("GET /search/repositories", {
        q: searchValue,
        per_page: reposPerPage,
        page: page ?? currentPage,
      });
      const ReposList = response.data.items.map((item) => {
        return {
          id: item.id,
          name: item.name,
          url: item.html_url,
          homepage: item.homepage,
          language: item.language,
          forks: item.forks_count,
          has_wiki: item.has_wiki,
          open_issues: item.open_issues_count,
          watchers: item.watchers_count,
        };
      });
      setRepos(ReposList);
      // Max 1000 results returns from Github
      const totalCount =
        response.data.total_count > 1000 ? 1000 : response.data.total_count;
      setReposCount(totalCount);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

  const paginate = (pageNumber: number, e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Search setSearchValue={setSearchValue} doSearch={fetchRepos} />
      <div className="post-content-wrapper">
        <ListRepositories
          repos={repos}
          itemsPerPage={reposPerPage}
          totalItems={reposCount}
          currentPage={currentPage}
          isLoading={isLoading}
          paginate={paginate}
        />
      </div>
    </>
  );
};

export default Repositories;
