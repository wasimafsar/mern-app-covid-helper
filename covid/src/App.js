import './App.css';
import TodoList from './TodoList';
import {useState, useRef} from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

function App() {
  const [todos,setTodos] = useState([{id:1, name:"Todo"}]); 
  const todoRef  =useRef();
  function handleButtonClick(event){
    const value = todoRef.current.value;

    setTodos(previous =>{
      return [...previous,{id: value, name: value }]
    });

    todoRef.current.value = null;
  }
  return (
  //   <>
  // <TodoList todos = {todos}/>
  // <input type="text" ref={todoRef}/>
  // <button onClick={handleButtonClick}>Add Todo</button>
  // <button>Clear Todo</button>
  // <div>0 left</div>
  // </>
  <Button variant="contained" color="primary">
  Hello World
</Button>
  );
}

export default App;
