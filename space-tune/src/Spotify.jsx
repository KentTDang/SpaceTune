import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'





export default function Spotify() {

    const clientID="ccc21638bb6e4577a2bfa7a4fe26c6ae"; // client id for using api
    const redirectURI="http://localhost:3000"; // redirects back to home page after authorization
    const responseType= "token"; // token for api  
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize" // link for authorizing spotify usage


    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")


    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")
    
        
        if(!token && hash) {
          token = hash.substring(1).split("&").find(elem=>elem.startsWith("access_token")).split("=")[1] // parses token from url
    
          window.location.hash = ""
          window.localStorage.setItem("token", token)
          
        }
    
        setToken(token)
    
      }, [])
    
      const logout = () => {
    
        setToken("")
    
        window.localStorage.removeItem("token")
    
      }
    
      const searchArtists = async (e) => {
        e.preventDefault()
        const {data} = await axios.get("https://api.spotify.com/v1/search ", {
    
    
    
          headers: {
            Authorization: `Bearer ${token}` // required to authorize usage, without you receive error 401
          },
           
          params: {
            q: searchKey, // query, adds onto  the end ofthe url, see await axios.get()
            type: "artists" // type of search, in this case it's the artist
          }
    
        });
    
        console.log(data)
    
       }
  


  return (
    <div>
     
        <h1>
          LINK YOUR SPOTIFY ACCOUNT
        </h1>
        {!token ? 
       <a href={`${AUTH_ENDPOINT}?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=${responseType}`}>login to spotify</a>
          : <button onClick={logout}>Logout </button> }

          {token ?
            <form onSubmit={searchArtists}>  

              <input type="text" onChange={e => setSearchKey(e.target.value)} />

              <button type = {"submit"}>Search</button>

            </form>  

            :<h2>Please Login</h2>
        }

      </div>

  )
}
