//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Country } = require('./src/db.js');
const axios = require ('axios')


const loadDB = async()=>{
  const exists = await Country.count();
  if(!exists){
    axios.get('https://restcountries.com/v3/all')
    .then(resp => {
      resp.data.forEach(async(el)=>{
        let cap = "None";
        if(Array.isArray(el.capital)){
          cap = el.capital.pop();
        }
       console.log("url api traida");

        await Country.create({
            id : el.cca3,
            name : el.name.common,
            flags : el.flags[1],
            continents : el.region,
            capital : cap,
            subregion: el.subregion ? el.subregion : "Subregion not avaible",
            area: el.area,
            population: el.population
        })
      })
      console.log("api y db")
    })
    .catch (el =>{
      console.log(el)
    })
  }else{
    console.log("db cargada")

  }
}


// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
  console.log('Listening at 3001'); // eslint-disable-line no-console
 
  loadDB()
  });
});
 