const axios = require('axios');
const {Country, TouristActivity} = require('../db')


const createActivity = async ( name, dificultad, duracion, temporada, idPais)=>{
    //idPais,
    try {
        const actividad = await TouristActivity.create({
            name,
            dificultad,
            duracion,
            temporada
        })
        await actividad.addCountry(idPais)
        console.log('Actividad:'+ name + 'agregada al pais'+ idPais);
        
    } catch (error) {
        console.log(error);
    }
}


    
    module.exports = {createActivity}