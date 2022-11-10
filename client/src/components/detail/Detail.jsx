import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import style from './detail.module.css'
import { detailId } from '../../actions'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'




export default function Detail() {

    const dispatch = useDispatch();
    
    const country = useSelector(state => state.detail);
    
    
     const {idPais} = useParams();
  
    useEffect(()=>{ 
        dispatch(detailId(idPais))
        }, [dispatch]);

    console.log(country);
        
        return (
            <>
            {Object.keys(country).length ?
            
            <div className={style.card}>
                <h1 className={style.h1}>{country.name}</h1>
                <img src={country.flags} alt={country.name}/>
                <h2 className={style.h2}>Codigo: {country.id}</h2>
                <h2 className={style.h2}>Capital: {country.capital}</h2>
                <h2 className={style.h2}>Continente: {country.continents}</h2>
                <h3 className={style.h2}>Subregion: {country.subregion}</h3>
                <h3 className={style.h2}>Area: {country.area / 1000} km2</h3>
                <h3 className={style.h2}>Poblacion: {country.population}</h3>


               


                 {country.touristActivities?.length > 0 ? <p className={style.h2}>Actividades</p> : null}
                 <ul>{country.touristActivities?.map(a => {
                  return <li className={style.h2} key={a.id}>
                    Nombre: {a.name} <br /> 
                    Dificultad: {a.dificultad} <br /> 
                    Duración {a.duracion} horas <br /> 
                    Temporada: {a.temporada}</li>
                })}</ul>

            <Link to='/home'><button className={style.button}>Volver a Inicio</button></Link>
            </div>

            : <h1 className={style.h1gif}>Cargando...</h1>
          }
          </>
        )

        
    
     
}

