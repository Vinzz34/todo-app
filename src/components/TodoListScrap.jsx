/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import cross from "../assets/icon-cross.svg";
import {Reorder} from "framer-motion";

const TodoList = ({todos,setTodos}) => {

    const [count,setCount] = useState(0);
    const [status,setStatus] = useState("all");
    const [newTodos,setNewTodos] = useState([]);

    useEffect(() => {
        setCount(todos.filter(todo => todo.completed === false).length)
    },[todos]);

    useEffect(() => {
        switch(status){
            case "active":
                setNewTodos(todos.filter(todo => todo.completed === false));
                break;
            case "completed":
                setNewTodos(todos.filter(todo => todo.completed === true));
                break;
            default:
                setNewTodos(todos);
        }
    },[todos,status]);


    function handleChecked(id){
        setTodos(todos.map(todo => {
            if(todo.id === id){
                return {
                    ...todo,completed : !todo.completed
                }
            }
            else{
                return todo
            }
        }))
    }

    function deleteTodo(id){
        setTodos(t => t.filter(todo => todo.id!==id))
    }

    function handleClear(){
        setTodos(t => t.filter(todo => todo.completed === false));
    }

    function handleAll(){
        setStatus("all");
    }
    function handleActive(){
        setStatus("active");
    }
    function handleCompleted(){
        setStatus("completed");
    }

  return (
    <div>
        <Reorder.Group className="rounded-md" values={newTodos} onReorder={setNewTodos}>
            {newTodos.map((todo) => (
                <Reorder.Item value={todo} className=" bg-white dark:bg-dark-desatBlue flex items-center justify-between px-5 py-4 border-b border-b-dark-veryDarkGrayishBlue" key={todo.id}>
                    <div className="flex items-center gap-[12px]">
                        <div className="w-6 h-6 grid place-content-center bg-gradient-to-br from-top to-bottom rounded-full">
                            <input onChange={() => handleChecked(todo.id)} checked={todo.completed}  className={` ${todo.completed ? "border-none" : "border-2"} box-content w-5 h-5 appearance-none bg-dark-desatBlue hover:border-none rounded-full border-light-lightGrayishBlue dark:border-dark-veryDarkGrayishBlue checked:bg-[url:theme('backgroundImage.check'),theme('backgroundImage.gradient-to-br')] checked:bg-no-repeat checked:bg-center checked:from-top checked:to-bottom cursor-pointer`} type="checkbox"/>
                        </div>
                        <p className={`${todo.completed ? "line-through" : ""} ${todo.completed ? "text-dark-darkGrayishBlue" : "text-dark-lightGrayishBlue"} `}>{todo.text}</p>
                    </div>
                    <img className="cursor-pointer" onClick={() => deleteTodo(todo.id)} src={cross} alt="complete" />
                </Reorder.Item>
            ))}
        </Reorder.Group>
        <div className="flex justify-between items-center p-4 bg-white dark:bg-dark-desatBlue  dark:text-dark-darkGrayishBlue">
            <p>{count} items left</p>
            <div className="flex gap-2">
                <button className={`${status === "all" ? "text-bright-blue" : ""} hover:text-white`} onClick={handleAll}>All</button>
                <button className={`${status === "active" ? "text-bright-blue" : ""} hover:text-white`} onClick={handleActive}>Active</button>
                <button className={`${status === "completed" ? "text-bright-blue" : ""} hover:text-white`} onClick={handleCompleted}>Completed</button>
            </div>
            <button className="hover:text-white" onClick={handleClear}>Clear Completed</button>
        </div>
    </div>
  )
}

export default TodoList