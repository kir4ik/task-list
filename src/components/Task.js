import React from 'react';

import ControlPanel from './ControlPanel';
import WindowEdit from './WindowEedit';

export default function Task(props)
{
  return (
    <div className={'task'}>
      <ControlPanel
        btn={[
          {edit: (e) => props.edit(e, props.data.id)},
          {del: (e) => props.del(e, props.data.id)}
        ]}
      />
      <h4 className={'task__title'}>{props.data.title}</h4>
      {props.data.desk &&
        <p className={'task__desk'}>{props.data.desk}</p>
      }

      { props.isActive &&
        <WindowEdit
          index={props.index}
          data={props.data}
          save={props.save}
          close={props.close}
          dataValid={props.dataValid}/>
      }
    </div>
  );
};