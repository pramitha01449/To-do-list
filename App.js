import React, {useState, useEffect} from "react";
import './App.css';
//Importing Components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  //States
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTools] = useState([]);

  //Run once when the app starts
  useEffect(() => {
    getLocalTodos();
  }, []);
  
  //Effects
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);  

  //Functions
  const filterHandler = () => {
    switch(status) {
      case 'completed':
        setFilteredTools(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTools(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTools(todos);
        break;
    }
  };

  //Save to Local
  const saveLocalTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    }
    else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
      </header>
      <Form 
      todos={todos} 
      setTodos={setTodos} 
      inputText={inputText} 
      setInputText={setInputText} 
      setStatus={setStatus}
      />
      <TodoList 
      setTodos={setTodos} 
      todos={todos}
      filteredTodos={filteredTodos}
      />
    </div>
  );
};

export default App;
