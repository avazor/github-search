import React, { createContext, useContext, useState } from "react";
import Head from "next/head";

interface ILayout {
  title: string;
  description: string;
  children: React.ReactNode;
}

const ReposContext = createContext([]);

const Layout = ({ title, description, children }: ILayout) => {
  const [reposData, setReposData] = useState([]);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="header">
        <a href="/">
          <h1>Search Git Hub Repos</h1>
        </a>
      </div>

      <div className="body">
        <ReposContext.Provider value={[reposData, setReposData]}>
          {children}
        </ReposContext.Provider>
      </div>
    </div>
  );
};

export function useReposContext() {
  return useContext(ReposContext);
}

Layout.defaultProps = {
  title: "Search GitHub Repos",
  description: "Searches for github repos",
};

export default Layout;
