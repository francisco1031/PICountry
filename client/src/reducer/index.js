
const initialState = {
    countries : [],
    copyCountries : [],
    country: {},
    activity : [],
    detail: {},
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_ALL_COUNTRIES':
            return{
                ...state,
                countries: action.payload,
                copyCountries: action.payload
            }

        case 'SEARCH_NAME_COUNTRY':
            return{
                ...state,
                countries: action.payload

             }
             
        case 'GET_ACTIVITY':
            return{
                ...state,
                activity: action.payload
            }

        case "COUNTRY_DETAIL":{
                return {
                    ...state,
                    detail: action.payload
                }
            }

        case "RESET_COUNTRY":
                return {
                    ...state,
                    detail: {}
                }

        case "CLEAR_DETAIL":
            return{

            }

        case "POST_ACTIVITY":
            return{
                ...state,
            }

        case 'FILTER_BY_CONTINENT':
        const filterByContinent = state.copyCountries
        const continentFiltered = action.payload === 'All' ? filterByContinent : filterByContinent.filter(e=>e.continents === action.payload)
            return{
                    ...state,
                    countries: continentFiltered
            }

        case 'GET_ACTIVITY':
            return{
                ...state,
                activity: action.payload
            }

        case 'FILTER_BY_ACT':
            const filterActivi = state.copyCountries
            const actividadFilt = action.payload === 'All' ? filterActivi : filterActivi.filter(e => { return e.touristActivities.find(e=>{return e.name === action.payload})})
            return{
                ...state,
                countries: actividadFilt
            }
        case 'ORDER_BY_NAME':

            if (action.payload === 'All') {
                return {
                    ...state,
                    countries: state.copyCountries
                }
            }
            let orderAlf = action.payload === 'asc'? state.countries.sort(function (a,b){
                if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0;
                }) :
                state.countries.sort(function(a,b){
                    if(a.name > b.name){
                        return -1;
                    }
                    if(b.name > a.name){
                    return 1;
                    }
                return 0;
                }) 
            return{
                ...state,
                countries:orderAlf
                }


            case 'ORDER_BY_POP':
                if (action.payload === 'All') {
                    return {
                        ...state,
                        countries: state.copyCountries
                    }
                }
                let orderByPop = action.payload === 'asc' ? state.countries.sort((a, b) => {
                    if (Number(a.population) > Number(b.population)) {
                        return -1;
                    }
                    if (Number(b.population) < Number(a.population)) {
                        return 1;
                    }
                    return 0
                }) :
                state.countries.sort((a, b) => {
                    if (Number(a.population) < Number(b.population)) {
                        return -1;
                    }
                    if (Number(b.population) > Number(a.population)) {
                        return 1;
                    }
                    return 0
                })
                
    
                return {
                    ...state,
                    countries: orderByPop
                }      
        default:
                return state;
    }
}

export default rootReducer;