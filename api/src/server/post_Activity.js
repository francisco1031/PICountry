//const {createActivity} = require('../controllers/ACTIVITY_CREATE');
const {Router} = require('express');
const {Country, TouristActivity} = require('../db')

const route = Router();



route.post('/', async (req, res)=>{
//CREAR UNA ACTIVIDAD TURISTICA
  const{
      name,
      dificultad,
      duracion,
      temporada,
      idPais
  } = req.body;


  try{
  if(!name || !dificultad || !duracion || !temporada || !idPais) 
      { return res.status(404).send('Faltan datos obligatorios'); }  

  //console.log('prueba')
      const act = await TouristActivity.create({
                  name,
                  dificultad,
                  duracion,
                  temporada
                })

        await act.addCountry(idPais)
          
      res.status(200).send(act)
    }catch (error){
      console.log("Eror en el post", error);
    }
   
})



route.get('/', async (req, res) => {
    
  const activities = await TouristActivity.findAll({
    include: Country
  })
  res.json(activities)
})


module.exports = route;