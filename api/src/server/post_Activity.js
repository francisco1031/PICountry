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

      // const country = await Country.findAll({
      //   where:{
      //     id: idPais
      //   }
     // })  
      //if(country){
        await act.addCountry(idPais)
     // }      
      res.status(200).send(act)
    }catch (error){
      console.log("Eror en el post", error);
    }
    //console.log('Actividad')
  //   idPais.forEach((e)=>{
  //     crearActividad(name, dificultad, duracion, temporada, e)
  //     })

  //   return res.status(201).json({
  //         msg: `Actividad '${name} creada correctamente!`
  //     })
  // }else{
  //   return res.status(400).send({
  //       msg: "Faltan completar el formulario para agregar la actividad."
  //   })
  // }
})



route.get('/', async (req, res) => {
    
  const activities = await TouristActivity.findAll({
    include: Country
  })
  res.json(activities)
})

module.exports = route;