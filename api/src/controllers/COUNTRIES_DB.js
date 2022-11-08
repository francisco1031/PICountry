const {Country, TouristActivity } = require('../db');

const info_DB = async () =>{
    try{
        let countries_db = await Country.findAll(
            {include: TouristActivity} );
        return countries_db;
    }catch (error){

    }
}

module.exports = {info_DB}