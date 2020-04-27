import React from 'react';

function Wrapper({ children }) {
  return (
      <div className="container">
        { children }
      </div>
  );
}

export default Wrapper;
