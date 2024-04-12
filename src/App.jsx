import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const App = () => {

  const [todos,setTodos] = useState([]);
  const [darkMode,setDarkMode] = useState(true);

  useEffect(() => {
    const localTodos = JSON.parse(localStorage.getItem("todos")) || [];
    if(localTodos.length !== 0){
      setTodos(localTodos);
    }

    const savedMode = localStorage.getItem("mode");
    if(savedMode){
      savedMode === "dark" ? setDarkMode(true) : setDarkMode(false);
    }
    else{
      window.matchMedia('(prefers-color-scheme:dark)').matches ? setDarkMode(true) : setDarkMode(false); 
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      event.matches ? setDarkMode(true) : setDarkMode(false);
    });
  },[]);


  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos));
  },[todos])

  useEffect(() => {
    if(darkMode){
      localStorage.setItem("mode","dark")
    }
    else{
      localStorage.setItem("mode","light")
    }
  },[darkMode]);

  return (
    <div className={`${darkMode ? "dark" : ""}  w-full h-screen sm:text-lg overflow-x-hidden px-6 bg-light-gray dark:bg-dark-blue bg-mobile-light dark:bg-mobile-dark sm:bg-desktop-light sm:dark:bg-desktop-dark bg-no-repeat bg-[length:100vw_30vh] sm:bg-[length:100vw_37.5vh]`}>
      <div className="max-w-[540px] mx-auto">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <TodoForm todos={todos} setTodos={setTodos} />
        <TodoList todos={todos} setTodos={setTodos} />
        <Footer />
      </div>
    </div>
  )
}

export default App