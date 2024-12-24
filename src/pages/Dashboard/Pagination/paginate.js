import ReactPaginate from "react-paginate";
import "./paginate.css";

export default function PaginatedItems({ itemsPerPage, total, setpage }) {
  let pageCount = total / itemsPerPage;

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={(e) => setpage(e.selected + 1)}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName="custom-pagination d-flex justify-content-between mx-md-2 align-items-center"
        pageLinkClassName="pagination-tag-anchor text-dark rounded-circle"
        activeLinkClassName="text-white bg-primary"
      />
    </>
  );
}
