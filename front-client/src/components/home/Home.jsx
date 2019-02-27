import React from "react";
import { Link } from "react-router-dom";

const home = () => {
  return (
    <div>
      <h2>This is Home</h2>
      <Link to="/login">Log-in</Link>
      <Link to="/signup">Sign-up</Link>
    </div>
  );
};

export default home;
