import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import { filterAct, getActivity, getCountries, filterCountryByContinent, orderByName, orderByPop, detailId } from "../actions/index";
import Card from "./card/Card";
import style from "./home.module.css";
import {Paginado} from "./paginado/Paginado";
import SearchBar from "./SearchBar";
//import Detail from "./detail/Detail";




export default function Home (){
// hooks
    const dispatch=  useDispatch()
    const allCountries = useSelector(state => state.countries)
    const activities = useSelector(state => state.activity)

    const [, setOrder] = useState('')

    //paginado
    const [pagina,setPagina] = useState(1) //pagina actual
    const [porPagina,] = useState(10) //cantidad
    const startIndex = pagina === 1 ? 0 : pagina * 10 - 10 ;  //indice del primero
    const endIndex = pagina === 1 ? 9 : startIndex + 10;  //indice del ultimo
    const currentCountries = allCountries.slice(startIndex,endIndex) //paises en la pagina actual

    const paginado = (pageNumber) => {
        setPagina(pageNumber)
    }



    useEffect(()=>{
        dispatch(getCountries());
        dispatch(getActivity())
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries())
    }

    function handleName(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setOrder(e.target.value)
    }

    function handlePop(e){
        e.preventDefault()
        dispatch(orderByPop(e.target.value))
        setOrder(e.target.value)
    }

    function handleFilterContinet(e){
        dispatch(filterCountryByContinent(e.target.value))
        setPagina(1)
    }

    function handleFilterAct(e){
        dispatch(filterAct(e.target.value))
    }

    function previousPage() {
        if (pagina > 1) {
            setPagina(pagina - 1)
        }
    }

    function nextPage() {
        let ultPage = Math.ceil(allCountries.length / porPagina)

        if (pagina < ultPage) {
            setPagina(pagina + 1)
        }

    }

    return (
        // <h1>COUNTRIES EN HOME</h1>
     <div>

         <Link to='/home'><button className={style.button} onClick={e=>{handleClick(e)}}>INICIO</button></Link>
        
          <select className={style.input} onChange={e => handleFilterContinet(e)}>
            <option value="All">Alls Continents</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
            <option value="Antarctic">Antarctic</option>
         </select>
         <select className={style.input} onChange={e => handleName(e)}>
            <option value= 'All'>Orden Alfabetico</option>
            <option value= 'asc'>Ascendente</option>
            <option value= 'desc'>Descendente</option>
         </select>
         <select className={style.input} onChange={e => handlePop(e)}>
            <option value= 'All'>Orden Poblacion</option>
            <option value= 'asc'>Ascendente</option>
            <option value= 'desc'>Descendente</option>
         </select>
         <select className={style.input} onChange={(e)=>handleFilterAct(e)}>
            <option value= 'All'>Actividad Turistica</option>
            {activities?.map(el=>
                 (<option key={el.id} value={el.name}>{el.name}</option>)
            )}
         </select>

         <Link to='/activity'><button className={style.button}>Crear Actividad</button></Link>
         
         <SearchBar />

        <div className="divPag">
            <Paginado 
            porPagina= {porPagina}
            allCountries={allCountries.length}
            paginado ={paginado}
            previousPage={previousPage}
            nextPage={nextPage}
            />
            
        </div>

        <div className={style.main}>

         {currentCountries?.map( el =>{
           return (
         //  <Link  to={`/countries/`+ el.id} onClick={el => dispatch(Detail(el.id))}>
           <Card 
                    key={el.id}
                    id={el.id}
                    name={el.name} 
                    flags={el.flags}
                    continents={el.continents}/>
                  //  </Link>
                    )})}

        </div>
    </div>
    )
}