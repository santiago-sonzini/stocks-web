
import Link from 'next/link';
import React, {
  useEffect,
  useState
} from 'react';
import  ReactPaginate  from 'react-paginate';
import { StockPrediction } from '~/pages';


function Items({ currentItems }: any) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:gap-8 ">
    {currentItems && currentItems.map((item: StockPrediction) => {
      if (item.last_day) {
        return (
          <Link
            key={item.stock}
            className={`" flex px-10 py-3 max-w-xs flex-col gap-4 rounded-xl ${item.pct_change > 0 ? "bg-green-500" : "bg-red-500"}  text-white hover:bg-white/20 " `}
            href=""
            target="_blank"
            style={{
              pointerEvents: (true) ? "none" : "auto",
            }}
          >
            <h3 className="text-2xl mb-2 font-bold text_center">{item.stock}</h3>
            <h3 className="text-lg mb-2 font-bold">Today's price: ${item.last_day.toFixed(2)}</h3>
            <h3 className="text-lg mb-2 font-bold">Predicted pct_change: {item.pct_change.toFixed(2)}</h3>

            <h3 className="text-2xl font-bold">${item.prediction.toFixed(2)}
              {
                item.stock === "ALUA.BA" ? " ARS" : null
              }
              </h3>
          </Link>
        )
      } else{
        return null
      }

    }
      
    )}
      </div>
  );
}

type Props = {
    itemsPerPage: any,
    items: any,
   
}

function PaginatedItems({ itemsPerPage, items }: Props) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = event.selected * itemsPerPage % items.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  return (
    <>
   <div className='flex flex-col items-center justify-center w-full'>
    <Items className="flex flex-col items-center justify-center w-full" currentItems={currentItems} />
  
  <div className="w-1/4  flex flex-col ">
  <ReactPaginate
  nextLabel="📉"
  onPageChange={handlePageClick}
  pageRangeDisplayed={2}
  marginPagesDisplayed={2}
  pageCount={pageCount}
  previousLabel="📈" 
  pageClassName="page-item m-1 rounded-lg text-green-500 font-bold w-10 h-10 border border-green-500 flex justify-center items-center"
  pageLinkClassName="page-link "
  previousClassName="page-item m-1 font-bold text-red-500 w-10 h-10 border border-red-500 flex justify-center items-center rounded-md"
  previousLinkClassName="page-link text-red-500"
  nextClassName="page-item font-bold text-blue-500 w-10 h-10 border border-blue-500 flex justify-center items-center m-1 rounded-md"
  nextLinkClassName="page-link text-blue-500"
  breakLabel="... "
  breakClassName="page-item font-bold text-green-500 m-2"
  breakLinkClassName="page-link text-green-500"
  containerClassName="pagination flex justify-evenly m-5"
  activeClassName="  bg-green-500 text-white "
/>
  </div>
</div>
      
    </>
  );
}

export default PaginatedItems