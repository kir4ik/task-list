import React, { Component } from 'react';
import Validation from './Validation';

import Task from'./Task';
import WindowEdit from './WindowEedit';
import Menu from'./Menu';
import CapTask from'./CapTask';

export default class TaskList extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      isCreate: false,
      tasks: [],
      activeTask: null,
      blocked: false,
      resValidator: {}
    };

    this.validator = new Validation({
      title: {
        required: true,
        len: [1, 50],
      },
      desk: {
        required: false,
        len: [0, 200],
      }
    });
  }

  isBlocked()
  {
    return this.state.isCreate || this.state.activeTask;
  }

  delResValidator()
  {
    this.setState({resValidator: {}});
  }

  createTask(e)
  {
    e.currentTarget.blur();

    if (this.isBlocked()) return;

    this.setState({isCreate: true});
  }

  createIDBy(key, elems, defID = 1)
  {
    if (elems.length < 1) return defID;

    return this.getLastID(key, elems) + 1;
  }

  getLastID(key, elems)
  {
    if (elems.length < 1) return false;

    let lastID, tmp = elems[0][key];

    for (let el of elems) {
      lastID = el[key] > tmp ? el[key] : tmp;
    }

    return lastID;
  }

  add(e, data)
  {
    e.currentTarget.blur()

    let res = this.validator.run(data);
    this.setState({resValidator: res});

    if ( !res.isSuccess ) return;
    for (let name in data) {
      data[name] = res[name].clean;
    }
    data.id = this.createIDBy('id', this.state.tasks);

    const tasks = this.state.tasks.concat([data]);
    this.setState({tasks});
    this.cancel(e);
  }

  cancel(e)
  {
    e.currentTarget.blur();
    this.setState({isCreate: false});
    this.delResValidator();
  }

  edit(e, id)
  {
    e.currentTarget.blur();

    if (this.isBlocked()) return;

    this.setState({activeTask: id});
  }

  save(e, data)
  {
    e.currentTarget.blur();

    let res = this.validator.run(data);
    this.setState({resValidator: res});

    if ( !res.isSuccess ) return;

    const tasks = this.state.tasks.slice();
    const current = this.findByCond(tasks, {id: this.state.activeTask});
    current.title = res.title.clean;
    current.desk = res.desk.clean;

    this.setState({tasks});
  }

  close(e, currentData)
  {
    e.currentTarget.blur();

    const lastData = this.findByCond(this.state.tasks, {id: this.state.activeTask});
    const res = this.validator.run(currentData);

    for (let name in res) {
      if (name == 'id') continue;
      currentData[name] = res[name].clean;
    }

    let isChange = this.constructor.checkChange(currentData, lastData);

    let ask = 'Вы уверены что хотите закрыть это окно?\nВсе не сохранённые данные будут утеряны';
    if (isChange && !confirm(ask)) {
      return;
    }

    this.setState({activeTask: null});
    this.delResValidator();
  }

  findByCond(elems, condition)
  {
    for (let el of elems) {
      if (this.search(el, condition)) return el;
    }

    return false;
  }

  search(obj, condition)
  {
    for (let key in condition) {
      if (condition[key] === obj[key]) return true;
    }

    return false;
  }

  del(e, id)
  {
    e.currentTarget.blur();

    if (this.isBlocked()) return;

    const tasks = this.state.tasks.filter((el) => {
      return el.id !== id;
    });

    this.setState({tasks});
  }

  static checkChange(currentData, lastData)
  {
    for (let key in currentData) {
      if (currentData[key] === lastData[key]) continue;

      return true;
    }

    return false;
  }

  rsort(elems, key)
  {
    let res = elems.slice();

    return res.sort((a, b) => {
      return (a[key] > b[key]) ? -1: 0;
    });
  }

  render() {
    let tasks = this.rsort(this.state.tasks, 'id');
    tasks = tasks.map((task, id) =>{
      let isActive = this.state.activeTask === task.id;
      return <Task
        key={task.id}
        index={id}
        data={task}
        edit={(e, id) => this.edit(e, id)}
        del={(e, id) => this.del(e, id)}
        close={(e, data) => this.close(e, data)}
        save={(e, data) => this.save(e, data)}
        isActive={isActive}
        dataValid={isActive ? this.state.resValidator : {}}/>
    });

    if (tasks.length < 1) {
      tasks = <CapTask>Пока нет запланированных задач</CapTask>;
    }

    return (
      <div className={'task-list'}>
        <Menu
          createTask={(e) => this.createTask(e)}/>
        {tasks}
        {this.state.isCreate &&
          <WindowEdit
            index={'createTask'}
            data={{title: '', desk: ''}}
            save={(e, data) => this.add(e, data)}
            close={(e) => this.cancel(e)}
            dataValid={this.state.resValidator}
          />
        }
      </div>
    )
  }
}