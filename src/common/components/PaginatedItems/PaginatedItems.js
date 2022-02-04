import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { EventsList } from '../EventsList';
import './PaginatedItems.scss';

export function PaginatedItems({ items, itemsPerPage, onOpenModal }) {
    const [ currentItems, setCurrentItems ] = useState([]);
    const [ pageCount, setPageCount ] = useState(0);
    const [ itemOffset, setItemOffset ] = useState(0);

    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;

      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [ items, itemOffset, itemsPerPage ]);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      setItemOffset(newOffset);
    };

    return (
      <div className="events-container">
        <EventsList items={ currentItems } onOpenModal={ onOpenModal }/>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">>"
          onPageChange={ handlePageClick }
          pageRangeDisplayed={ 3 }
          pageCount={ pageCount }
          previousLabel="<<"
          renderOnZeroPageCount={ null }
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="page-active"
        />
      </div>
    );
  }

  PaginatedItems.propTypes = {
    items: PropTypes.array.isRequired,
    onOpenModal: PropTypes.func.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
  };