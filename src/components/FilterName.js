import React, { useContext } from "react";
import DataAreaContext from "../utils/DataAreaContext";

const FilterName = () => {
  const context = useContext(DataAreaContext);

  return (
    <div className="searchbox">
      <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="">
              Filter Name
            </span>
          </div>
          <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="name"
          aria-label="FilterName"
          onChange={e => context.handleNameFilterChange(e)}
        />
        </div>
    </div>
  );
}
export default FilterName;
