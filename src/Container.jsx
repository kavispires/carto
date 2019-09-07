import React from 'react';

const Container = ({ menuAction, children }) => {
  return (
    <div className="container">
      <nav className="menu" onClick={menuAction}>
        <button className="btn-menu" id="goals">
          Goals
        </button>
        <button className="btn-menu" id="game">
          Game
        </button>
        <button className="btn-menu btn-menu--left" id="reset">
          Reset
        </button>
      </nav>
      {children}
    </div>
  );
};

export default Container;
