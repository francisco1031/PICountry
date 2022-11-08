import React from "react";
import {useState} from "react";
import { useDispatch } from "react-redux";
import { nameCountry } from "../actions";
import style from "./home.module.css"

export default function SearchBar (){
    const dispatch = useDispatch()
    const [name, setName] = useState("")



    function handleInput(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(nameCountry(name))//.trimStart().trimEnd()))
        setName(e.target.value = "")
        
    }

    return(
        <div>
            <input
            type='text'
            className={style.inputBuscar}
            placeholder="Buscar Pais..."
            onChange={(e) => handleInput(e)}
            />

            <button 
            className={style.buttonBuscar}
            type='submit'
            onClick={(e) => handleSubmit(e)}>Buscar
            </button>
        </div>
    )
}

