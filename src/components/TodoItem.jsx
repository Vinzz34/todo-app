/* eslint-disable react/prop-types */
import cross from "../assets/icon-cross.svg";
import { Draggable } from "react-beautiful-dnd";

const TodoItem = ({index,id,text,completed,todos,setTodos}) => {

    function handleChecked(){
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

    function deleteTodo(){
        setTodos(todos.filter(todo => todo.id!==id));
    }

  return (
    <Draggable key={id} draggableId={id} index={index}>
        {(provided) => (
            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className={`group flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5  bg-white dark:bg-dark-desatBlue border-light-lightGrayishBlue dark:border-dark-veryDarkGrayishBlue ${index === 0 ? "rounded-t-md" : "rounded-none"} border-b cursor-pointer`}>
                <div className="flex items-center gap-[12px] sm:gap-6">
                    <div className="w-5 h-5 grid place-content-center bg-gradient-to-br from-top to-bottom rounded-full">
                        <input onChange={handleChecked} checked={completed} className={`w-4 h-4 box-content appearance-none outline-none bg-white dark:bg-dark-desatBlue ${completed ? "border-none" : "border-2"} hover:border-none border-light-lightGrayishBlue dark:border-dark-veryDarkGrayishBlue rounded-full cursor-pointer checked:bg-[url:theme('backgroundImage.check'),theme('backgroundImage.gradient-to-br')] checked:bg-no-repeat checked:bg-center checked:from-top checked:to-bottom`} type="checkbox" />
                    </div>
                    <p className={`${completed ? "line-through" : ""} ${completed ? "dark:text-dark-darkGrayishBlue" : "dark:text-dark-lightGrayishBlue"} ${completed ? "text-light-lightGrayishBlue" : "text-light-darkGrayishBlue"} break-all`}>{text}</p>
                </div>
                <img onClick={() => deleteTodo()} className="ml-4 w-[14px] sm:w-[18px] h-[14px] sm:h-[18px] sm:invisible sm:group-hover:visible cursor-pointer" src={cross} alt="delete" />
            </div>
        )}
   </Draggable>
  )
}

export default TodoItem