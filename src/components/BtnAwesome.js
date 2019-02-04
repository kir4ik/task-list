import React from 'react';

const BtnAwesome = ({type, onClick}) => {
  const collections = {
    edit: 'far fa-edit',
    del: 'far fa-calendar-times',
    close: 'fas fa-times',
    save: 'fas fa-save',
    add: 'fas fa-folder-plus'
  };

  return (
    <button className={type} onClick={onClick}>
      <i className={collections[type]} />
    </button>
  );
};

export default BtnAwesome;