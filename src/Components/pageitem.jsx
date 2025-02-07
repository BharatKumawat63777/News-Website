import React from "react";

// Shoppingitem is now a presentational component
// It doesn't require any Redux logic here, but still relies on props for title, description, etc.
const pageitem = ({ title, description, imageUrl, newsUrl }) => {
 
  return (
    <div className="my-3">
      <div className="card" style={{ width: "20rem" }}>
        <img
          style={{ height: "15rem" }}
          src={
            imageUrl
              ? imageUrl
              : "https://images.news18.com/ibnlive/uploads/2024/07/untitled-design-4-2024-07-114c6de7d988c7810493b1dc0a3fea1e-16x9.jpg?impolicy=website&width=1200&height=675"
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-warning"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default pageitem;
