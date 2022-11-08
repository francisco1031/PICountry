const axios = require('axios');
const URL_API= 'https://restcountries.com/v3/all'
const {info_DB} = require ('../controllers/COUNTRIES_DB')

const GET_ALL_COUNTRIES = async ()=>{
   // let total = await Country.findAll()

    let data_DB = await info_DB();
    let apiUrl = await axios.get(`${URL_API}`);
    let get_country = [];

    apiUrl.data.map(el =>{
        get_country.push({
            id : el.cca3,
            name : el.name.common,
            flags : el.flags[1],
            continents : el.region,
            capital : el.capital,
            subregion: el.subregion,
            area: el.area,
            population: el.population
        });
    });

   //get_country = data_DB.concat(get_country)
    //return apiUrl.data
    //return get_country;
    return data_DB
}
module.exports = {GET_ALL_COUNTRIES}