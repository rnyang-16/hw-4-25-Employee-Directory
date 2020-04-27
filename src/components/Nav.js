import React from "react";
import FilterName from "./FilterName.js";
import FilterEmail from "./FilterEmail.js";
import FilterAge from "./FilterAge.js";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      {/* <a class="navbar-brand" href="#">Employee Directory</a> */}
      <div className="collapse navbar-collapse row" id="navbarNav">
        <div className="search-area col-4">
          <FilterName />
        </div>
        <div className="search-area col-4">
          <FilterEmail />
        </div>
        <div className="search-area col-4">
          <FilterAge />
        </div>
      </div>
    </nav>
  );
}
export default Nav;
