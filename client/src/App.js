import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/landing/LandingPage';
import Home from './components/Home';
import Navbar from './components/navbar/NavBar';
import ActivityCreate from './components/createActivity/ActivityCreate';
import Detail from './components/detail/Detail.jsx';



function App() {
  return (
    <BrowserRouter>    
    <div className="App">
      
      
      
        <Route exact path= '/' component={LandingPage} />
      <Switch>


        <Route path = '/home' component={Home}/>
        <Route path='/countries/:idPais' component={Detail } />
        
         <Route path = '/activity' component={ActivityCreate}/> 
        
      </Switch>
    </div>
    </BrowserRouter>

  );
}

export default App;
