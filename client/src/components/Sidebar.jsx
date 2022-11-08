/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import axios from 'axios'
import "../styles/sidebar.css";

const Sidebar = (props) => {
    const [showDrop, setShowDrop] = useState(false);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({});
    const [tags, setTags] = useState([]);
    useEffect(() => {
        axios.get("https://sbshackathon.herokuapp.com/api/auth/user", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            setUser(res.data.user)
        }).catch(err => console.log(err))
    }, [])
    useEffect(() => {
        axios.get("https://sbshackathon.herokuapp.com/api/tag/all", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            setTags(res.data.tags)
        }).catch(err => console.log(err))
    }, [])
    const renderTags = () => {
        return tags.map((tag) => {
            return (
                <li>
                    <a href="#" style={{color:`${tag.color}`}} onClick={() => props.setTodoState(tag._id)}>#{tag.name}</a>
                </li>
            )
        })
    }
    return (
        <div className={`sidebar ${open ? "" : "close"}`}>
            <div className="logo-details">
                <i className="bx bxs-notepad" onClick={(e) => setOpen(!open)}></i>
                <span className="logo_name">Impact</span>
            </div>
            <ul className="nav-links">
                <li>
                    <a href="#">
                        <i className="bx bx-home"></i>
                        <span className="link_name">Home</span>
                    </a>
                    <ul className="sub-menu blank">
                        <li>
                            <a className="link_name" href="#">
                                Home
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#" onClick={() => {props.setTodoState("all")}}>
                        <i className="bx bxs-envelope"></i>
                        <span className="link_name">Inbox</span>
                    </a>
                    <ul className="sub-menu blank">
                        <li>
                            <a className="link_name" href="#">
                                Inbox
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#" onClick={() => props.setTodoState("today")}>
                        <i className="bx bx-calendar"></i>
                        <span className="link_name">Today</span>
                    </a>
                    <ul className="sub-menu blank">
                        <li>
                            <a className="link_name" href="#">
                                Today
                            </a>
                        </li>
                    </ul>
                </li>
                <li className={showDrop ? "showMenu" : ""}>
                    <div className="iocn-link" onClick={() => setShowDrop(!showDrop)}>
                        <a href="#" className="arrow">
                            <i class='bx bx-purchase-tag-alt'></i>
                            <span className="link_name">Tags</span>
                        </a>
                        <i className="bx bxs-chevron-down arrow"></i>
                    </div>
                    <ul className="sub-menu">
                        <li>
                            <a className="link_name" href="#">
                                Tags
                            </a>
                        </li>
                        {renderTags()}
                    </ul>
                </li>
                <li>
                    <div className="profile-details">
                        <div className="profile-content">
                            <img
                                src={user.image}
                                alt="profileImg"
                            />
                        </div>
                        <div className="name-job none" id="profile-section">
                            <div className="profile_name" id="username">
                                {user.username}
                            </div>
                            <div className="job">{user.email}</div>
                        </div>

                        <i className="bx bx-log-out" id="profile-icon" onClick={() => {
                            localStorage.removeItem("token")
                            window.location.href = "/auth"
                        }}></i>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;