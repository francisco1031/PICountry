import React from 'react'
import { Link } from 'react-router-dom'
import style from './Card.module.css'
//import { detailId } from '../../actions'
//import { useDispatch } from 'react-redux'








export default function Card(props) {
  
  //const dispatch = useDispatch();
  //  onClick={e => dispatch(detailId(props.id))}>
  
  return (
    <div className={style.card}>
      <Link className={style.link} to={`/countries/${props.id}`}>
      <img src={props.flags} alt={props.name}  />
         
      <h1>{props.name}</h1>
      
      <h3>{props.continents}</h3>
      </Link>
    </div>
  )
}