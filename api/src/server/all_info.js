const {GET_ALL_COUNTRIES} = require('../controllers/GET_ALL_COUNTRIES');
const {Router} = require('express');
const {Country, TouristActivity} = require('../db')

const route = Router();




route.get('/', async (req, res)=>{
//ME TRAIGA TODOS LOS COUNTRIES DE LA DB O BUSQUE
     
        const{name} = req.query;
        const countries = await GET_ALL_COUNTRIES();
        if(name){
         //res.send(`Estas buscando el pais ${name}`);
         let countriesName = await countries.filter( el => el.name.toLowerCase().includes(name.toLowerCase()))
        
         countriesName.length ?
         res.status(200).send(countriesName) :
         res.status(404).send('No se encontro el pais')
         
        } else{
         res.status(200).send(countries);
     }
 })

 route.get('/:idPais', async (req, res)=>{
 //TRAE EL DETALLE DEL PAIS CON EL ID ESPECIFICO
     const{idPais} = req.params
     //console.log(idPais)
    const encontrado = await Country.findAll({
        where:{
            id: idPais
        },
        include: TouristActivity
    })
    if(encontrado){
        res.json(encontrado)
    }
    else return res.status(404).json({
        msg: "País no encontrado"
    })


  

 })



module.exports = route;