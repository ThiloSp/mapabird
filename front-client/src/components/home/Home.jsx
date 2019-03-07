import React from "react";
import { Link } from "react-router-dom";

const home = () => {
  return (
    <div>
      <h2>map A bird</h2>
      <div className="container">
        <div className="row">
          <div className="col">
            <Link to="/mapbirds">Map Birds</Link>
          </div>
          <div className="col">
            <Link to="/threads">Forum</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default home;
