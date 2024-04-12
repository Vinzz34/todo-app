/* eslint-disable react/prop-types */
import TodoItem from "../components/TodoItem"
import Filters from "../components/Filters"
import { useState,useEffect } from "react";
import { DragDropContext,Droppable } from "react-beautiful-dnd";

const TodoList = ({todos,setTodos}) => {

  const [status,setStatus] = useState("all");
  const [newTodos,setNewTodos] = useState([]);

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

  function handleOnDragEnd(e){
    if(!e.destination) return;
    const orderedTodos = Array.from(newTodos);
    const [reorderedTodo] = orderedTodos.splice(e.source.index,1);
    orderedTodos.splice(e.destination.index,0,reorderedTodo);

    setTodos(orderedTodos);
  }

  return (
    <div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="todos">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="bg-white dark:bg-dark-desatBlue rounded-t-md">
                        {newTodos.map((todo,index) => (
                            <TodoItem key={todo.id} index={index} id={todo.id} text={todo.text} completed={todo.completed} todos={todos} setTodos={setTodos} />
                        ))}
                    {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
        <Filters todos={todos} setTodos={setTodos} status={status} setStatus={setStatus} /> 
    </div>
  )
}

export default TodoList