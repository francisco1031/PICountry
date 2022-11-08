import React from 'react';
import './Paginado.css'

export const Paginado= ({porPagina, allCountries, paginado, previousPage, nextPage})=>{
    const pageNumber = []
    
    for (let i = 1; i <= Math.ceil(allCountries /porPagina); i++) {
        pageNumber.push(i)
    }

    return(
       

        <nav className="contUl">
        <ul className="paginadoCont">
          <li className="prevAndNext" onClick={previousPage} >Prev</li>
            {pageNumber && pageNumber.map(num => (
              <li className="liNum1" key={num}>
                    <button className="liNum" onClick={()=>paginado(num)} >{num}</button>
                </li>
            ))}
            <li className="prevAndNext" onClick={nextPage} >Next</li>
        </ul>
    </nav>
    )

}

