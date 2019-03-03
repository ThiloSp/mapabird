import React from "react";
import { Link } from "react-router-dom";

const home = () => {
  return (
    <div>
      <h2>This is Home</h2>
      <div>
        <Link to="/mapbirds">map birds</Link>
      </div>
      <div>
        <Link to="/threads">Forum</Link>
      </div>
    </div>
  );
};

export default home;
