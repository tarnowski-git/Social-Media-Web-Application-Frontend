import React from "react";

const Pagination = ({ postsPerPage, totalPosts, handlePaginate }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber, event) => {
        event.preventDefault();
        handlePaginate(pageNumber);
    };

    return (
        <div>
            <ul className="pagination">
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                        <a
                            className="page-link"
                            href="/home"
                            onClick={(event) => paginate(number, event)}
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;
