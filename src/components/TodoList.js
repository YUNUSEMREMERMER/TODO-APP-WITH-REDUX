import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggle, destroy, selectFilteredTodos, getTodosAsync } from "../redux/todos/todosSlice"


function TodoList() {
    
    const dispatch = useDispatch();
    const filteredTodos = useSelector(selectFilteredTodos)

    const handleDestroy = (id) => {
        if (window.confirm("Are you sure ?")) {
            dispatch(destroy(id));
        }
    }

    useEffect(() => {
        dispatch(getTodosAsync());
    },[dispatch])


    return (
        <ul className="todo-list">

            {
                filteredTodos.map((item,index) => (
                    <li key={index} className={item.completed === true ? "completed" : " "}>
                        <div className="view">
                            <input className="toggle" type="checkbox" checked={item.completed} onChange={() => dispatch(toggle({ id: item.id }))} />
                            <label>{item.title}</label>
                            <button className="destroy" onClick={() => handleDestroy(item.id)} ></button>
                        </div>
                    </li>
                ))
            }

        </ul>
    )
}

export default TodoList