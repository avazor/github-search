import React from 'react';

interface props {
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
    doSearch: (pageNum: number | null) => void
}

const Search: React.FC<props> = ({setSearchValue, doSearch}) => {
    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        doSearch(1)
    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target?.value)
    }

    return (
        <div className='post-content-wrapper container flex'>
            <input id='searchInput' className='search-input' onChange={changeHandler} type="text"
                   placeholder=" Type Repo Name"/>
            <button className='button' onClick={clickHandler}>Search</button>
        </div>
    );
};

export default Search;
