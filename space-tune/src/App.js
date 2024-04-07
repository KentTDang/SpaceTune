import './App.css';
import {NavBar} from './Components/NavBar.js'
import { Banner } from './Components/Banner.js'
import { Song } from './Components/Song.js'
import Review from './Components/Review.jsx';
import Spotify from './Components/Spotify.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <div className="App">
      <NavBar/>
      <Banner/>
      <Song/>
      <Review/>

      
  
  </div>
  );
}
export default App;
