import React from 'react';
import Todo from './Todo';
import ZooToDo from './ZooToDo';
import { Provider } from 'react-redux';
import todoModel from './Todo/model';
import zooModel from './ZooToDo/model';
import Zoo from '../../Zoo';

// zoo
const zooStore = Zoo.init({
  todoModel,
  zooModel
});

const List = () => {
  return (
    <Provider store={zooStore}>
      <Todo />
      <ZooToDo />
    </Provider>
  );
};

export default List;