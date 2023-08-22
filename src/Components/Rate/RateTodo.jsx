import React from 'react';
import {AiFillDelete} from 'react-icons/ai'

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      className={`todo ${todo.isCompleted ? 'completed' : ''}`}
    >
      {todo.text}
      <div>
        {/* <AiFillDelete onClick={() => removeTodo(index)} className='delectbtn'/> */}
      </div>
    </div>
  );
}

export default Todo;
