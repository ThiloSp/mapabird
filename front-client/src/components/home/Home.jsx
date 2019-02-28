import React from "react";
import { Link } from "react-router-dom";

const home = () => {
  return (
    <div>
      <h2>This is Home</h2>
      <div>
        <Link to="/login">Log-in</Link>
      </div>
      <div>
        <Link to="/signup">Sign-up</Link>
      </div>
      <div>
        <Link to="/profile">Profile</Link>
      </div>
      <div>
        <Link to="/mapbirds">map birds</Link>
      </div>
    </div>
  );
};

export default home;
