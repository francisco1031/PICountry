import axios from 'axios';
export const FILTER_BY_CONTINENT ="FILTER_BY_CONTINENT";
export const ORDER_BY_NAME ="ORDER_BY_NAME"

//CONECTO EL FRONT CON BACK
export function getCountries(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/countries",{
        });
        return dispatch({
            type: 'GET_ALL_COUNTRIES',
            payload: json.data
        })
    }
}

export function nameCountry(name){

    return async function(dispatch){
        try{
        var search = await axios.get(`http://localhost:3001/countries?name=${name}`)
            return dispatch({
                type: 'SEARCH_NAME_COUNTRY',
                payload: search.data
        })} catch (error){
            console.log(error)
        }
    }
}

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}


export function postActivity(payload){
    return async function (dispatch){
    try{
        const data = await axios.post('http://localhost:3001/activity', payload)
        alert('Actividad agregada correctamente!')
        return dispatch({
            type: "POST_ACTIVITY",
        })
    } catch (error) {
        alert('NO se pudo realizar el POST')
        console.log(error)
    }
    }
}

export function clearDetail(){
    return{
        type: 'CLEAR_DETAIL'
    }
}


export function filterCountryByContinent(payload){
    return{
        type: 'FILTER_BY_CONTINENT',
        payload
    }
}

export function filterAct(payload){
    return{
        type: 'FILTER_BY_ACT',
        payload
    }
}

export function getActivity(){
    return async function (dispatch){
        const resp = (await axios.get('http://localhost:3001/activity')).data
        dispatch({
            type: 'GET_ACTIVITY',
            payload: resp
        })
    }
}


export function orderByPop(payload) {
    return {
      type: 'ORDER_BY_POP',
      payload
    }
  }


export function detailId(id){
    return function(dispatch){
        axios.get(`http://localhost:3001/countries/${id}`)
        
        .then((country) => {
            dispatch({
              type: "COUNTRY_DETAIL",
              payload: country.data[0],
            });
        });
    };
  };
