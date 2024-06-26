import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import axios from 'axios';

import {
  BrowserRouter as Router
} from "react-router-dom";



export const NavBar = () => {

  const clientID = "ccc21638bb6e4577a2bfa7a4fe26c6ae"; // client id for using api
  const redirectURI = "http://localhost:3000"; // redirects back to home page after authorization
  const responseType = "token"; // token for api  
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize" // link for authorizing spotify usage


  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [isTyping, setIsTyping] = useState(false);


  var imgURL = ""

  let typingTimeout;

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };




  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")


    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1] // parses token from url

      window.location.hash = ""
      window.localStorage.setItem("token", token)
      return () => clearTimeout(typingTimeout);

    }

    setToken(token)

    const searchSongs = async () => {
      try {
        console.log("this is response")

        const response = await axios.get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            q: searchTerm,
            type: "track"
          }
        })
        setSearchResults(response.data.tracks.items.slice(0, 5))

      } catch (error) {
        console.error("Error searching ")
      }
    }
    searchSongs()

  }, [searchTerm])

  const logout = () => {

    setToken("")

    window.localStorage.removeItem("token")

  }

  const handleSongSelect = (selectedSong) => {
    console.log('Selected Song', selectedSong)
  }



  const searchArtists = async (e) => {
    e.preventDefault()
    console.log(token)
    const { data } = await axios.get("https://api.spotify.com/v1/search", {

      headers: {
        Authorization: `Bearer ${token}`
      },

      params: {
        q: searchKey,
        type: "artist"
      }
    });

    console.log(searchKey)

    console.log(data)
    var imageElement = document.getElementById("artist-image")
    var songTitleElement = document.getElementById("song-title")
  }

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  const handleLogin = () => {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=${responseType}`;
  };


  return (
    <Router>
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>


          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">

            <div className="search-bar">
              <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search Song..."
                id="songSearch"
              />
              {searchTerm && (
                <ul>
                  {searchResults.map((song) => (
                    <li key={song.id} onClick={() => handleSongSelect(song)}>
                      {song.name} - {song.artists.map((artist) => artist.name).join(', ')}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* <input id = "songSearch" placeholder = "search.." type="text" onChange={e => setSearchKey(e.target.value)} /> */}

            <Nav className="ms-auto">
              <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
              <Nav.Link href="#songs" className={activeLink === 'songs' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('songs')}>Songs</Nav.Link>
              <Nav.Link href="#reviews" className={activeLink === 'reviews' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('reviews')}>Reviews</Nav.Link>
            </Nav>
            <span className="navbar-text">
              {!token ? (
                <button className="vvd" onClick={handleLogin}>
                  <span>Login</span>
                </button>
              ) : (
                <button className="vvd" onClick={logout}>
                  <span>Logout</span>
                </button>
              )}
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>
  )
}