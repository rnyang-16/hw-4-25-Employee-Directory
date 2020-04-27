import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import Nav from "./Nav";
import API from "../utils/API";
import DataAreaContext from "../utils/DataAreaContext";

const DataArea = () => {
  const [developerState, setDeveloperState] = useState({
    users: [],
    order: "descend",
    filteredUsers: [],
    headings: [
      { name: "Image", width: "10%", order: "descend" },
      { name: "name", width: "10%", order: "descend" },
      { name: "phone", width: "20%", order: "descend" },
      { name: "email", width: "20%", order: "descend" },
      { name: "dob", width: "10%", order: "descend" }
    ]
  });

  const handleSort = heading => {
    let currentOrder = developerState.headings
      .filter(elem => elem.name === heading)
      .map(elem => elem.order)
      .toString();

    if (currentOrder === "descend") {
      currentOrder = "ascend";
    } else {
      currentOrder = "descend";
    }

    const compareFnc = (a, b) => {
      if (currentOrder === "ascend") {
        // account for missing values
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        }
        // numerically
        else if (heading === "name") {
          return a[heading].first.localeCompare(b[heading].first);
        } else if (heading === "dob") {
          return a[heading].age - b[heading].age;
        } else {
          return a[heading].localeCompare(b[heading]);
        }
      } else {
        // account for missing values
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        }
        // numerically
        else if (heading === "name") {
          return b[heading].first.localeCompare(a[heading].first);
        }else if (heading === "dob") {
          return b[heading].age - a[heading].age;
        }  else {
          return b[heading].localeCompare(a[heading]);
        }
      }
    };
    const sortedUsers = developerState.filteredUsers.sort(compareFnc);
    const updatedHeadings = developerState.headings.map(elem => {
      elem.order = elem.name === heading ? currentOrder : elem.order;
      return elem;
    });

    setDeveloperState({
      ...developerState,
      filteredUsers: sortedUsers,
      headings: updatedHeadings
    });
  };

  const handleEmailFilterChange = event => {
    const filter = event.target.value;
    const filteredList = developerState.users.filter(item => {
      let values = item.email.toLowerCase();
      console.log(filter, values)
      if(values.indexOf(filter.toLowerCase()) !== -1){
        return item
      };
    });

    setDeveloperState({ ...developerState, filteredUsers: filteredList });
  };

  const handleNameFilterChange = event => {
    const filter = event.target.value;
    const filteredList = developerState.users.filter(item => {
      let values = item.name.first.toLowerCase() + " " + item.name.last.toLowerCase();
      console.log(filter, values)
      if(values.indexOf(filter.toLowerCase()) !== -1){
        return item
      };
    });

    setDeveloperState({ ...developerState, filteredUsers: filteredList });
  };

  // const handleAgeLargerThanFilterChange = event => {
  //   const filter = event.target.value;
  //   const filteredList = developerState.users.filter(item => {
  //     let values = item.dob.age;
  //     // console.log(filter, values)
  //     if(values >= filter){
  //       return item
  //     };
  //   });

  //   setDeveloperState({ ...developerState, filteredUsers: filteredList });
  // };

  // const handleAgeSmallerThanFilterChange = event => {
  //   const filter = event.target.value;
  //   const filteredList = developerState.users.filter(item => {
  //     let values = item.dob.age;
  //     // console.log(filter, values)
  //     if(values <= filter){
  //       return item
  //     };
  //   });

  //   setDeveloperState({ ...developerState, filteredUsers: filteredList });
  // };

  const handleAgeFilterChange = event => {
    console.log(event)
    console.log(event.target.value)
    let lower = 0;
    let upper = 999;
    if (event.target.nextElementSibling) 
    {
      lower = event.target.value;
      upper = event.target.nextElementSibling.nextElementSibling.value ? event.target.nextElementSibling.nextElementSibling.value : 999;
      
    } else {
      upper = event.target.value;
      lower = event.target.previousElementSibling.previousElementSibling.value ? event.target.previousElementSibling.previousElementSibling.value : 0;
    }
    console.log(lower, upper);
    
    const filteredList = developerState.users.filter(item => {
      let values = item.dob.age;
      // console.log(filter, values)
      if(values <= upper && values >= lower){
        return item
      };
    });

    setDeveloperState({ ...developerState, filteredUsers: filteredList });
  };

  ///https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once
  useEffect(() => {
    API.getUsers().then(results => {
      console.log(results.data.results);
      setDeveloperState({
        ...developerState,
        users: results.data.results,
        filteredUsers: results.data.results
      });
    });
  }, []);

  return (
    <DataAreaContext.Provider
      value={{ developerState, handleEmailFilterChange, handleNameFilterChange,
               handleAgeFilterChange, handleSort }}
    >
      <Nav />
      <div className="data-area">
        {developerState.filteredUsers.length > 0 ? <DataTable /> : <div></div>}
      </div>
    </DataAreaContext.Provider>
  );
};

export default DataArea;
