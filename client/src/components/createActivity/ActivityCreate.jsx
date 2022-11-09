 import React, {useState,useEffect} from "react";
 import axios from "axios";
 import { useDispatch, useSelector } from "react-redux";
 import { useHistory } from "react-router-dom";
 import {getCountries, postActivity, getActivity}from '../../actions/index';
 import { Link } from "react-router-dom";
 import style from './activityCreate.module.css'
// import Navbar from "./navbar/NavBar";



 export default function ActivityCreate(){
     const dispatch = useDispatch()
     const history = useHistory()
     const countries = useSelector(state=>state.countries)
     const activity = useSelector(state=>state.activity)
     const [errors, setErros] = useState({})
  //  console.log(country)

  

  const [input, setInput] = useState({
      name: "",
      dificultad: 1,
      duracion: "",
      temporada: "",
      idPais: [],
    })
    
    let activity2 = activity?.filter((e)=>e.name.toLowerCase().includes(input.name.toLowerCase()))
    
    //manejo de inputs
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value.toLowerCase() //modifica
            
        })
       // console.log(input);

        setErros(validate({
            ...input,
             [e.target.name]: e.target.value
        },activity2))

       // console.log(input)
    }
   // console.log(input);
    console.log(activity2)

    function handleDelete(el){
        setInput({
            ...input,
            idPais: input.idPais.filter(e => e !== el)
        })
    }

   

    function handleSelect(event){
     if(!input.idPais.find((e)=> e === event.target.value)){
     
     setInput({
            ...input,
            idPais: [...input.idPais, event.target.value]
        })
        }
    }

   


    function handleSubmit(e){
        e.preventDefault();
        if (input.name === "" || input.duracion === "" || input.temporada === "" || input.idPais.length === 0 || input.duracion < 1 || input.duracion > 24) return alert('Completar todos los campos por favor')
        console.log(input)
        dispatch(postActivity(input))
        alert("Actividad Turistica Creada!")
        setInput({
            name: "",
            dificultad: 1,
            duracion: "",
            temporada: "",
            idPais: [],
        })
        history.push('/home')
    }

    //busqueda
    // function handleInput(e){
    //     e.preventDefault()
    //     setName(e.target.value)
    //     console.log(name)
    // }

        useEffect(()=>{
            dispatch(getCountries());
            dispatch(getActivity())
        },[dispatch]);


     return (
            <div className={style.create}>
                <Link to='/home'><button className={style.button}>Volver</button></Link>
                <h1 className={style.h1}>Crear Actividad</h1>
                <form onSubmit={(e)=>handleSubmit(e)}>
                     
                     { /* ...........NOMBRE.................... */ }
                    <div className={style.div}>
                        <label className={style.label}>Nombre:</label>
                        <input 
                        type="text"
                        value= {input.name}
                        name = "name"
                        placeholder='Ingresa un nombre'
                        onChange={(e)=>handleChange(e)}
                        className={style.input}
                        />
                         {errors.name && <label className={style.labelError}>{errors.name}</label>}
                      </div>  
                    { /* ...........DIFICULTAD.................... */ }
                       <div className={style.div}>
                        <label className={style.label}>Dificultad de la Actividad (1 - 5):</label>
                        <input 
                        type="number"
                        min='1'
                        max='5'
                        
                        value= {input.dificultad}
                        name = "dificultad"
                        placeholder='Ingrese una dificultad'
                        onChange={(e)=>handleChange(e)}
                        className={style.input}
                        />
                        {errors.dificultad && <label className={style.labelError}>{errors.dificultad}</label>}
                        </div>


                        { /* ...........DURACION.................... */ }
                        <div className={style.div}>
                        <label className={style.label}>Duracion de la actividad - Hs:</label>
                        <input 
                        type="number" 
                        value= {input.duracion}
                        name = "duracion"
                        placeholder='Ingresa una duración'
                        onChange={(e)=>handleChange(e)}
                        className={style.input}
                        />
                        {errors.duracion && <label className={style.labelError}>{errors.duracion}</label>}
                        </div>

                        { /* ...........TEMPORADA.................... */ }
                        <div className={style.div}>
                        <label className={style.label}>Temporada:</label>
                        <select
                        name = "temporada"
                        id= "temporada"
                        value= {input.temporada}
                        className={style.input}
                        onChange={(e)=>handleChange(e)}>
                            <option value="seleccionar">Seleccionar...</option>
                            <option value="invierno">Invierno</option>
                            <option value="otonio">Otoño</option>
                            <option value="primavera">Primavera</option>
                            <option value="verano">Verano</option>
                        </select>
                        {errors.temporada && <label className={style.labelError}>{errors.temporada}</label>}
                        </div>

                        { /* ...........PAIS.................... */ }

                        <label className={style.label}>¿En que pais esta la actividad?</label>
                         <select name='idPais' className={style.input}
                         value={input.idPais[input.idPais.length ] ?? ''}
                         onChange={e => handleSelect(e)}>
                             <option value=''>Seleccionar Pais</option>

                            {countries.map(country =>(
                                <option key={country.id} value={country.id}>{country.name}</option>
                            ))}

                        </select> 
                        {errors.idPais && <label className={style.labelError}>{errors.idPais}</label>}
                        {/* <ul><li>{input.Country.map(el=>el + ", ")}</li></ul>  */}
                        

                        <div>
                                {input.idPais.map(el => <button className={style.li} key={el} variant="outlined" type='reset' onClick={() => handleDelete(el)}>{el} | X</button>)}
                        </div> 


                    <button  className={style.buttonCreate} type="submit">Crear Actividad</button>

                </form>
            </div>
     )
    }

function validate(input, activity2 = activity2) {
    let errors = {}
    // const validaLetters = /^[A-Za-z ]+$/ 

    if (!input.name) { //estado local no hay nada
        errors.name = "Debe poner el nombre de la actividad! "
    } else if ( !/\S{1,15}[^0-9]/.test(input.name)) {
        errors.name = "Nombre invalido"
    } else if(activity2.length){
        errors.name="La Actividad ya Existe!"
    }    
    if (input.dificultad < 1) {
        errors.duracion = "Debe seleccionar una dificultad!"
    }
    if (!input.duracion) {
        errors.duracion = "Debe completar este campo"
    }
    if (input.duracion < 1) {
        errors.duracion = "Debe ingresar la cantidad de horas!"
    }
    if (input.duracion > 24) {
        errors.duracion = "Debe ser menor a 24hs"
    }
    if (!input.temporada) {
        errors.temporada = "Debe seleccionar una temporada!"
    }
    if (!input.idPais.length) {
        errors.idPais = "Debe seleccionar un Pais"
    }
    return errors
}