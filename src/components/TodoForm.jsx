/* eslint-disable react/prop-types */
import {v4 as uuidv4} from "uuid";
import { useState } from "react";

const TodoForm = ({todos,setTodos}) => {

  const [input,setInput] = useState("");

  function handleFormSubmit(e){
    e.preventDefault();
    if(input.trim() !== ""){
      setTodos([...todos,{id:uuidv4(),text:input,completed:false}])
      setInput("");
    }
  }

  function handleInputChange(e){
    setInput(e.target.value);
  }

  return (
    <form className="mb-4 sm:mb-6 bg-white dark:bg-dark-desatBlue flex items-center gap-[12px] sm:gap-6 px-5 sm:px-6 py-[14px] sm:py-[18px] rounded-md" onSubmit={e => handleFormSubmit(e)}>
      <input className="w-5 h-5 appearance-none bg-transparent border-2 rounded-full border-light-lightGrayishBlue dark:border-dark-veryDarkGrayishBlue" type="checkbox" disabled />
      <input className="bg-transparent flex-1 w-full pt-1 outline-none text-light-darkGrayishBlue dark:text-dark-lightGrayishBlue placeholder:text-light-grayishBlue placeholder:dark:text-dark-darkGrayishBlue" placeholder="Create a new todo..." value={input} onChange={e => handleInputChange(e)} type="text" />
      <button className="hidden" type="submit"></button>
    </form>
  )
}

export default TodoForm