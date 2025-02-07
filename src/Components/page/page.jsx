import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner.jsx";
import {
  fetchNews,
  setPage,
  setCountry,
  setPageSize,
} from "../../redux/newsSlice.jsx";
import PageItem from "../pageitem.jsx";

const page = () => {
  const dispatch = useDispatch();
  const { articles, loading, page, totalResults, country, category, pageSize } =
    useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews()); // Fetch articles when component mounts
  }, [dispatch, country, category, pageSize, page]);

 
  const handlePrevClick = () => {
    if (page > 1) {
      dispatch(setPage(page - 1)); // Go to the previous page
    }
  };

  const handleNextClick = () => {
    if (page + 1 <= Math.ceil(totalResults / pageSize)) {
      dispatch(setPage(page + 1)); // Go to the next page
    }
  };

  // const changeCountry = (newCountry) => {
  //   dispatch(setCountry(newCountry)); // Update country
  // };

  // const changePageSize = (newSize) => {
  //   dispatch(setPageSize(newSize)); // Update page size
  // };

  return (
    <div className="container my-3">
      <h2 className="text-center">Top Maximum offer this time</h2>
      {loading && <Spinner />}
      <div className="row">
        {!loading &&
          articles?.map((element, index) => {
            return (
              <div className="col-md-4" key={index}>
                <PageItem
                  key={index}
                  title={element.title ? element.title.slice(0, 40) : ""}
                  description={
                    element.description
                      ? element.description.slice(0, 70)
                      : "No description available"
                  }
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://th.bing.com/th/id/OIP.-Pc55P47lUl7hhhj7Tzv1AHaEK?rs=1&pid=ImgDetMain"
                  }
                  newsUrl={element.url || "#"} // Ensure there's a fallback if the URL is missing
                />
              </div>
            );
          })}
      </div>
      <div className="container d-flex justify-content-around">
        <button
          disabled={page <= 1}
          type="button"
          className="btn btn-success"
          onClick={handlePrevClick}
        >
          &larr; Previous
        </button>
        <button
          disabled={page + 1 > Math.ceil(totalResults / pageSize)}
          type="button"
          className="btn btn-success"
          onClick={handleNextClick}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

export default page;
