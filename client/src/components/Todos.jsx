/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import "../styles/todo.css"
import Todo from './Todo'
import axios from "axios"

const Todos = ({ todoState }) => {
    const [newTitle, setNewTitle] = useState("")
    const [newDescription, setNewDescription] = useState("")
    const [newDate, setNewDate] = useState("")
    const [heading, setHeading] = useState("")
    const [currentTag, setCurrentTag] = useState()
    const [newTagTitle, setNewTagTitle] = useState("")
    const [tags1, setTags1] = useState([])

    useEffect(() => {
        axios.get("https://sbshackathon.herokuapp.com/api/tag/all", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            setTags1(res.data.tags)
        }).catch(err => console.log(err))
    }, [])

    const deleteTag = (id) => {
        axios.delete(`https://sbshackathon.herokuapp.com/api/tag/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            console.log(res)
            window.location.reload()
        })
    }

    const renderAllTags = () => {
        return tags1.map((tag) => {
            return (
                <li><a class="dropdown-item" onClick={() => {
                    deleteTag(tag._id)
                }}>#{tag.name}</a></li>
            )
        })
    }

    const getTag = (id) => {
        axios.get("https://sbshackathon.herokuapp.com/api/tag/" + id, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            setCurrentTag(res.data.tag.name)
        })
    }

    useEffect(() => {
        if (todoState === "all") {
            setHeading("All Todos")
        } else if (todoState === "today") {
            setHeading("Todos for Today")
        } else {
            getTag(todoState)
            setHeading("Todos for " + currentTag)
        }
    }, [todoState, currentTag])

    const newTodo = (e) => {
        e.preventDefault()

        const todo = {
            title: newTitle,
            description: newDescription,
            dueDate: newDate,
        }

        axios.post("https://sbshackathon.herokuapp.com/api/todo/create", todo, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            console.log(res)
            window.location.reload()
        })
    }

    const newTag = (e) => {
        e.preventDefault()
        const tag = { name: newTagTitle }

        axios.post("https://sbshackathon.herokuapp.com/api/tag/create", tag, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            console.log(res)
            window.location.reload()
        })
    }

    return (
        <>
            <h1 style={{ textAlign: "center" }}>{heading}</h1>
            <div class="row d-flex justify-content-center container">
                <div class="col-md-8">
                    <div class="card-hover-shadow-2x mb-3 card">
                        <div class="card-header-tab card-header">
                            <div class="card-header-title font-size-lg text-capitalize font-weight-normal"><i
                                class="fa fa-tasks"></i>&nbsp;Tasks</div>
                        </div>
                        <div class="scroll-area-sm">
                            <perfect-scrollbar class="ps-show-limits">
                                <div style={{ position: "static" }} class="ps ps--active-y">
                                    <div class="ps-content">
                                        <ul class=" list-group list-group-flush">
                                            {<Todo todoState={todoState} />}
                                        </ul>
                                    </div>
                                </div>
                            </perfect-scrollbar>
                        </div>
                        <div class="d-block text-right card-footer">
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="">Add Task</button>
                            <button type='button' class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal1" data-bs-whatever="" style={{ marginLeft: "1%" }}>Create Tag</button>
                            <button type='button' class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal3" data-bs-whatever="" style={{ marginLeft: "1%" }}>Delete Tag</button>
                        </div>
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">New Task</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <form>
                                            <div class="mb-3">
                                                <label for="recipient-name" class="col-form-label">Title:</label>
                                                <input type="text" class="form-control" id="recipient-name" onChange={(e) => setNewTitle(e.target.value)} />
                                            </div>
                                            <div class="mb-3">
                                                <label for="recipient-name" class="col-form-label">Due Date:</label>
                                                <input type="date" class="form-control" id="recipient-name" onChange={(e) => setNewDate(e.target.value)} />
                                            </div>
                                            <div class="mb-3">
                                                <label for="message-text" class="col-form-label">Description:</label>
                                                <input class="form-control" id="message-text" onChange={(e) => setNewDescription(e.target.value)}></input>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary" onClick={newTodo}>Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">New Tag</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <form>
                                            <div class="mb-3">
                                                <label for="recipient-name" class="col-form-label">Name:</label>
                                                <input type="text" class="form-control" id="recipient-name" onChange={(e) => setNewTagTitle(e.target.value)} />
                                            </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary" onClick={newTag}>Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                                    <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                        Delete Tags
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        {renderAllTags()}
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
                    </div>
                </div>
            </div>
        </>

    )
}

export default Todos