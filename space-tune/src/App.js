import './App.css';
import {Home} from './Components/Home.js'
import Review from './Components/Review';
import Spotify from './Spotify'

function App() {
  return (
    <div className="App">
      <Home/>
      <Spotify/>
      <Review/>
    </div>
  );
}
export default App;
