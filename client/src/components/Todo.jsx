/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Todo = ({todoState}) => {
    const [todos, setTodos] = useState([])
    const [todoId, setTodoId] = useState("")
    const [tags, setTags] = useState([])
    const [todoString, setTodoString] = useState("all")
    const [todoString1, setTodoString1] = useState("all")
    useEffect(() => {
        if (todoState === "all") {
            setTodoString("all")
            setTodoString1("all")
        } else if (todoState === "today") {
            setTodoString("date")
            setTodoString1(`${new Date().toISOString().slice(0, 10)}`)
        } else {
            setTodoString("tag")
            setTodoString1(todoState)
        }
    }, [todoState])
    useEffect(() => {
        axios.get(`https://sbshackathon.herokuapp.com/api/todo/filter/${todoString}/${todoString1}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            if (res.data) {
                setTodos(res.data.todos)
            }
        })
    }, [todoString, todoString1])
    useEffect(() => {
        axios.get("https://sbshackathon.herokuapp.com/api/tag/all", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            setTags(res.data.tags)
        }).catch(err => console.log(err))
    }, [])
    let classes = ["warning", "danger", "dark", "primary", "success", "info"]
    let randomClass = classes[Math.floor(Math.random() * classes.length)]
    const addTagToTodo = (name, todoId) => {
        axios.put(`https://sbshackathon.herokuapp.com/api/todo/addtag/${todoId}`, {tag:name}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            console.log(res)
            window.location.reload()
        })
    }
    const rmTagFromTodo = (name, todoId) => {
        axios.put(`https://sbshackathon.herokuapp.com/api/todo/removetag/${todoId}`, {tag:name}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            console.log(res)
            window.location.reload()
        })
    }
    const delTodo = (todoId) => {
        axios.delete(`https://sbshackathon.herokuapp.com/api/todo/${todoId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            console.log(res)
            window.location.reload()
        })
    }
    const renderAddTags = (todo) => {
        return tags.map((tag) => {
            return (
                <li><a class="dropdown-item" onClick={() => addTagToTodo(tag.name, todo)}>#{tag.name}</a></li>
            )
        })
    }
    const renderRmTags = (todo) => {
        return tags.map((tag) => {
            return (
                <li><a class="dropdown-item" onClick={() => rmTagFromTodo(tag.name, todo)}>#{tag.name}</a></li>
            )
        })
    }
    const renderTodos = () => {
        return <>
            {todos.map(todo => {
                return (
                    <li class="list-group-item">
                        <div class={`todo-indicator bg-${randomClass}`}></div>
                        <div class="widget-content p-0">
                            <div class="widget-content-wrapper">
                                <div class="widget-content-left mr-2">
                                    <div class="custom-checkbox custom-control">
                                        <input class="custom-control-input"
                                            id="exampleCustomCheckbox12" type="checkbox" /><label class="custom-control-label"
                                                for="exampleCustomCheckbox12">&nbsp;</label>
                                    </div>
                                </div>
                                <div class="widget-content-left">
                                    <div class="widget-heading">{todo.title}
                                    </div>
                                    <div class="widget-subheading"><i>{todo.description}, {todo.dueDate}<br></br></i></div>
                                </div>
                                <div class="widget-content-right">
                                    <button class="border-0 btn-transition btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever={todo.id} onClick={() => {
                                        setTodoId(todo._id);
                                    }}>
                                        <i class="fa fa-tag"></i></button>
                                    <button class="border-0 btn-transition btn btn-outline-danger" onClick={() => delTodo(todo._id)}>
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                )
            })}
            <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Task Tags</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            Add Tags to Task
                                        </button>
                                        <ul class="dropdown-menu">
                                            {renderAddTags(todoId)}
                                        </ul>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            Remove Tags from Task
                                        </button>
                                        <ul class="dropdown-menu">
                                            {renderRmTags(todoId)}
                                        </ul>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    }
    return (
        renderTodos()
        
    )
}

export default Todo