import React, {FC} from 'react';

export interface IPagination {
    itemsPerPage: number,
    totalItems: number,
    currentPage: number
    paginate: any
}

const Pagination: FC<IPagination> = ({itemsPerPage, totalItems, currentPage, paginate}) => {
    const maxPageNumber = Math.ceil(totalItems / itemsPerPage)
    const pageNumbers = [];
    if (totalItems === 0) {
        return (<></>)
    }
    if(currentPage > 3){
        pageNumbers.push(1);
    }
    for (let i = (currentPage - 2); i <= (currentPage + 2); i++) {
        if (i > 0 && i <= maxPageNumber) {
            pageNumbers.push(i);
        }
    }
    if(currentPage < maxPageNumber -2) {
        pageNumbers.push(maxPageNumber);
    }

    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <a onClick={(e) => paginate(number, e)} href='' className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;