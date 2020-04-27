import React, { useContext } from "react";
import DataAreaContext from "../utils/DataAreaContext";

const FilterEmail = () => {
  const context = useContext(DataAreaContext);

  return (
    <div className="searchbox">
      <div className="input-group"
        onChange={e => context.handleAgeFilterChange(e)}>
        <div className="input-group-prepend">
          <span className="input-group-text" id="">
            Filter Age &gt;=
          </span>
        </div>
        <input
          className="form-control mr-sm-4"
          type="search"
          placeholder="1"
          aria-label="FilterAgeLargerThan"
        />
        <div className="input-group-prepend">
          <span className="input-group-text" id="">
            &lt;=
          </span>
        </div>
        <input
          className="form-control mr-sm-4"
          type="search"
          placeholder="100"
          aria-label="FilterAgeSmallerThan"
        />
      </div>
    </div>
  );
}
export default FilterEmail;
