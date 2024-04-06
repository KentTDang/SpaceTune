import './App.css';
import {NavBar} from './Components/NavBar.js'
import Review from './Components/Review';
import Spotify from './Spotify'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Spotify/>
      <Review/>
    </div>
  );
}
export default App;
