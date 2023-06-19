import React from "react";

const modal = () => {
  return (
    <div className='overlay'>
      <div className='modal'>
        <form action='#'>
          <div className='header'>
            <h2 className='title'>Edit Full Name</h2>
          </div>
          <div className='content'></div>
          <div className='btn-container'>
            <button>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default modal;
