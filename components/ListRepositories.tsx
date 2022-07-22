import React, { FC } from "react";
import { IRepo } from "../types/types";
import Link from "next/link";
import Pagination from "./Pagination";

interface RepoListProps {
  repos: IRepo[];
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  isLoading: boolean;
  paginate: (
    pageNum: number,
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void;
}

const ListRepositories: FC<RepoListProps> = ({
  repos,
  itemsPerPage,
  totalItems,
  currentPage,
  isLoading,
  paginate,
}) => {
  {
    if (isLoading) {
      return <div className="flex">Loading...</div>;
    }
    return (
      <div className={repos.length > 0 ? "flex" : ""}>
        {repos.map((repo) => {
          return (
            <Link href={"/repos/" + repo.id} key={repo.id}>
              <div className="child flex-child pointer">
                <h3>{repo.name}</h3>
                <span>{repo.url}</span>
              </div>
            </Link>
          );
        })}
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          currentPage={currentPage}
          isLoading={isLoading}
          paginate={paginate}
        />
      </div>
    );
  }
};

export default ListRepositories;
