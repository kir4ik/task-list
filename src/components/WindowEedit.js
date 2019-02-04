import React, { Component } from 'react';

import ControlPanel from './ControlPanel';

export default class WindowEdit extends Component
{
  getData()
  {
    return {
      ...this.props.data,
      desk: this.refDesk.value,
      title: this.refTitle.value
    };
  }

  render() {
    let isError = this.props.dataValid.isSuccess === false;

    return (
      <div className={'window'}>
        <div className={'task--edit'}>
          <ControlPanel
            btn={[
              { save: (e) => this.props.save(e, this.getData()) },
              { close: (e) => this.props.close(e, this.getData()) }
            ]}
          />
          {this.props.data.id &&
            <p className={'task__label edit'}>Номер: {this.props.data.id}</p>
          }
          <label
            htmlFor={'task-title' + this.props.index}
            className={'task__label'}>Название</label>
          {isError &&
            <p className={'task__hint error'}>{this.props.dataValid.title.errors[0]}</p>
          }
          <textarea
            ref={(ref) => (this.refTitle = ref)}
            className={'task__title--edit'}
            id={'task-title' + this.props.index}
            defaultValue={this.props.data.title}/>
          <label
            htmlFor={'task-desk' + this.props.index}
            className={'col-12 task__label'}>Описание</label>
          {isError &&
          <p className={'task__hint error'}>{this.props.dataValid.desk.errors[0]}</p>
          }
          <textarea
            ref={(ref) => (this.refDesk = ref)}
            className={'task__desk--edit'}
            id={'task-desk' + this.props.index}
            defaultValue={this.props.data.desk}/>
        </div>
      </div>
    );
  }
}