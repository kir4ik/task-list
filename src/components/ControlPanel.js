import React from 'react';

import BtnAwesome from './BtnAwesome';

const ControlPanel = ({btn}) => {
  const btns = [];

  for (let el of btn) {
    for (let type in el) {
      let tmp = <BtnAwesome type={type} onClick={el[type]} key={type}/>;
      btns.push(tmp);
    }
  }

  return (
    <div className={'control-panel'}>
      {btns}
    </div>
  );
};

export default ControlPanel;