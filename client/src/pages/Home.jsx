import React, { useState } from 'react'
import AllTodos from '../components/Todos'
import Sidebar from '../components/Sidebar'

const Home = () => {
    if (!localStorage.getItem("token")) {
        window.location.href = "/auth"
    }
    const [todoState, setTodoState] = useState("all")
    return (
        <div>
            <Sidebar setTodoState={setTodoState}/>
            <div className="home-section">
                <AllTodos todoState={todoState}/>
            </div>
        </div>
    )
}

export default Home