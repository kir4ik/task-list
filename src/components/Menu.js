import React from 'react';

import BtnAwesome from './BtnAwesome';

export default function Menu(props)
{
  return (
    <div className={'menu'}>
      <BtnAwesome
        type={'add'}
        onClick={props.createTask}/>
    </div>
  );
}