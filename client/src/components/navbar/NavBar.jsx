import React from 'react'
import { Link } from 'react-router-dom'
import style from './NavBar.module.css'
function Navbar() {
    return (
        <div className={style.main}>
            <Link to="/home"><p>Home ir a la inicio </p></Link>


            <Link to="/activity"><p>Add Activity</p></Link>
        </div>
    )
}

export default Navbar