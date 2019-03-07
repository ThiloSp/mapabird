import React from "react";
import { Link } from "react-router-dom";

const home = () => {
  return (
    <div>
      <h2>map A bird</h2>
      <div>
        <Link to="/mapbirds">Map Birds</Link>
      </div>
      <div>
        <Link to="/threads">Forum</Link>
      </div>
    </div>
  );
};

export default home;
