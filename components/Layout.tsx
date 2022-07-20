import React from 'react';
import Head from "next/head";

interface ILayout {
    title: string
    description: string
    children: React.ReactNode
}

const Layout = ({title, description, children}: ILayout) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description}/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className='header'><h1>Search Git Hub Repos</h1></div>

            <div className="body">
                {children}
            </div>
        </div>
    );
};

Layout.defaultProps = {
    title: 'Search GitHub Repos',
    description: 'Searches for github repos',
}

export default Layout;
