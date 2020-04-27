import React, { useContext } from "react";
import DataAreaContext from "../utils/DataAreaContext";

const FilterEmail = () => {
  const context = useContext(DataAreaContext);

  return (
    <div className="searchbox">
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" id="">
            Filter Email
          </span>
        </div>
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="email"
          aria-label="FilterEmail"
          onChange={e => context.handleEmailFilterChange(e)}
        />
      </div>
    </div>
  );
}
export default FilterEmail;
