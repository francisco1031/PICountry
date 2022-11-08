import React from "react";
import {Link} from 'react-router-dom';
import style from './landing.module.css'


export default function LandingPage(){
    return(
        // <div>
        //     <h1>Welcome Countries</h1>
        //     <Link to ='/home'>
        //         <button>EXPLORER</button>
        //     </Link>
        // </div>



<div className={style.container}>
      <h1 className={style.title}>Countries PI</h1>
      <br />
      <Link className={style.boton} to='/home'>Explore!</Link>
      <br />
      <a className={style.copyright} href="https://www.pexels.com/es-es/" target="_blank" rel="noreferrer">Imagen extraída de Pexels</a>
    </div>
    )
}