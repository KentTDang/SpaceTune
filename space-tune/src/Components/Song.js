import { Swiper, SwiperSlide } from 'swiper/react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'
import headerImg from './../Assets/img/header-img.svg'

import { Row, Container, Col } from 'react-bootstrap'
import React from 'react';

export const Song = () => {
  

  const clientID="ccc21638bb6e4577a2bfa7a4fe26c6ae"; // client id for using api
  const redirectURI="http://localhost:3000"; // redirects back to home page after authorization
  const responseType= "token"; // token for api  
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize" // link for authorizing spotify usage


  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")

  var imgURL = ""

  var songImage = ""
  var topTracks = {}
  

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
    
    const getTopTracks = async () => {
      try {
        topTracks = await axios.get("https://api.spotify.com/v1/playlists/37i9dQZF1DWXRqgorJj26U/tracks", {
          headers: {
            Authorization: `Bearer ${token}`
          }
          
        })
      } catch (error) {
        console.error("Erorr fetching", error)
        return[]
      }
      
     };

   getTopTracks()

  


    var songbox = document.getElementById("songbox");

    // const displayWheel = async () => {
    //   for (let i = 0; i < 25; i++) {
    //     const newWheel = document.createElement('div'); // Use uppercase for element tag name
    //     newWheel.src = topTracks.data.items[i].track.album.images[0]
    //     // Optionally, you can add some content or attributes to each slide here
        
    //     songbox.appendChild(newWheel); // Use appendChild instead of append
    //   }
    //  };
    
 
    const displayWheel = () => {
      for (let i = 0; i < 25; i++) {
        // Create a new <div> element to represent the Swiper slide
        const newSwiperSlide = document.createElement('swiper-slide');
              
        const imgElement = document.createElement('img');
        
        imgElement.src = topTracks.data.items[i].track.album.images[0].url; // Replace with your image URL
        
        newSwiperSlide.appendChild(imgElement);
        
        songbox.appendChild(newSwiperSlide);
      }
    };

  

  const searchArtists = async (e) => {
    e.preventDefault()
    console.log(token)
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
    
      headers: {
        Authorization: `Bearer ${token}` // required to authorize usage, without you receive error 401
      },
       
      params: {
        q: searchKey, // query, adds onto  the end ofthe url, see await axios.get()
        type: "artist" // type of search, in this case it's the artist
      }
      });
  
      console.log(searchKey)

      // console.log(data.tracks.items[0].album.images[0].url)
      console.log(data)
      // console.log(data.tracks.items[0].name)
      var imageElement = document.getElementById("artist-image")
      var songTitleElement = document.getElementById("song-title")


      imgURL = data.tracks.items[0].album.images[0].url
      songTitleElement.innerHTML = data.tracks.items[0].name
      imageElement.src = imgURL
    }


  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  console.log(topTracks)
  return (
    <section className='song' id='songs'>
      
      <Container>
        <Row>
          <Col>
            <div className="song-bx" id = "songbox">
              <h2>
                Trending Songs
              </h2>
              <p>TOP 25 SONGS</p>
              <Swiper 
              effect={'coverflow'} 
              grabCursor={true} 
              centeredSlides={true} 
              loop={true} 
              slidesPerView={'auto'} 
              coverflowEffect={
                {
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5
                }
              }
              paginatio={{el:'.swiper-pagination',clickable:true}}
              navigation={{
                nextEl:'.swiper-button-next',
                prevEl:'.swiper-button-prev',
                clickable: true,
              }}
              modules={[EffectCoverflow,Pagination,Navigation]} 
              className='swiper_container'>
                {displayWheel}
                {/* {getTopTracks}
                {topTracks.map((track, index) => (
                  <SwiperSlide key={index}>
                    <img src={track.track.album.images[0].url} alt={`slide_image_${index}`} />
                  </SwiperSlide>
                ))}  */}
              
                 {/* <SwiperSlide>
                  <img src={headerImg} alt="slide_image"/>
                </SwiperSlide>
                <SwiperSlide>
                  <img src={headerImg} alt="slide_image"/>
                </SwiperSlide>
                <SwiperSlide>
                <img src={headerImg} alt="slide_image"/>
                </SwiperSlide>
                <SwiperSlide>
                <img src={headerImg} alt="slide_image"/>
                </SwiperSlide>
                <SwiperSlide>
                  <img src={headerImg} alt="slide_image"/>
                </SwiperSlide>
                <SwiperSlide>
                  <img src={headerImg} alt="slide_image"/>
                </SwiperSlide>
                <SwiperSlide>
                  <img src={headerImg} alt="slide_image"/>
                </SwiperSlide>
                <SwiperSlide>
                  <img src={headerImg} alt="slide_image"/>
                </SwiperSlide>  */}

                <div className="slider-container">
                  <div className="swiper-button-prev slider-arrow">
                    <ion-icon name="arrow-back-outline"></ion-icon>
                  </div>
                  <div className="swiper-button-next slider-arrow">
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                  </div>
                </div>
              </Swiper>

            </div>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <div className="song-bx1">
              <h2>
                Trending Songs
              </h2>
              <p>FAT FAT FAT FAT FATFA FATFTGSYTBXUBWUYBXU</p>
              <Swiper 
              effect={'coverflow'} 
              grabCursor={true} 
              centeredSlides={true} 
              loop={true} 
              slidesPerView={'auto'} 
              coverflowEffect={
                {
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5
                }
              }
              paginatio={{el:'.swiper-pagination',clickable:true}}
              navigation={{
                nextEl:'.swiper-button-next',
                prevEl:'.swiper-button-prev',
                clickable: true,
              }}
              modules={[EffectCoverflow,Pagination,Navigation]} 
              className='swiper_container'>
                {getTopTracks}
                <SwiperSlide>
                  <img src={headerImg} alt="slide_image"/>
                </SwiperSlide>
                <SwiperSlide>
                  <img src={headerImg} alt="slide_image"/>
                </SwiperSlide>
                <SwiperSlide>
                <img src={headerImg} alt="slide_image"/>
                </SwiperSlide>
                <SwiperSlide>
                <img src={headerImg} alt="slide_image"/>
                </SwiperSlide>
                <SwiperSlide>
                  <img src={headerImg} alt="slide_image"/>
                </SwiperSlide>
                <SwiperSlide>
                  <img src={headerImg} alt="slide_image"/>
                </SwiperSlide>
                <SwiperSlide>
                  <img src={headerImg} alt="slide_image"/>
                </SwiperSlide>
                <SwiperSlide>
                  <img src={headerImg} alt="slide_image"/>
                </SwiperSlide>

                <div className="slider-container">
                  <div className="swiper-button-prev slider-arrow">
                    <ion-icon name="arrow-back-outline"></ion-icon>
                  </div>
                  <div className="swiper-button-next slider-arrow">
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                  </div>
                </div>
              </Swiper>

            </div>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <div className="song-bx1">
              <h2>
                Trending Songs
              </h2>
              <p>FAT FAT FAT FAT FATFA FATFTGSYTBXUBWUYBXU</p>
              <Swiper 
              effect={'coverflow'} 
              grabCursor={true} 
              centeredSlides={true} 
              loop={true} 
              slidesPerView={'auto'} 
              coverflowEffect={
                {
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5
                }
              }
              paginatio={{el:'.swiper-pagination',clickable:true}}
              navigation={{
                nextEl:'.swiper-button-next',
                prevEl:'.swiper-button-prev',
                clickable: true,
              }}
              modules={[EffectCoverflow,Pagination,Navigation]} 
              className='swiper_container'>
                <SwiperSlide>
                  <img src={headerImg} alt="slide_image"/>
                </SwiperSlide>
                <SwiperSlide>
                  <img src={headerImg} alt="slide_image"/>
                </SwiperSlide>
                <SwiperSlide>
                <img src={headerImg} alt="slide_image"/>
                </SwiperSlide>
                <SwiperSlide>
                <img src={headerImg} alt="slide_image"/>
                </SwiperSlide>
                <SwiperSlide>
                  <img src={headerImg} alt="slide_image"/>
                </SwiperSlide>
                <SwiperSlide>
                  <img src={headerImg} alt="slide_image"/>
                </SwiperSlide>
                <SwiperSlide>
                  <img src={headerImg} alt="slide_image"/>
                </SwiperSlide>
                <SwiperSlide>
                  <img src={headerImg} alt="slide_image"/>
                </SwiperSlide>

                <div className="slider-container">
                  <div className="swiper-button-prev slider-arrow">
                    <ion-icon name="arrow-back-outline"></ion-icon>
                  </div>
                  <div className="swiper-button-next slider-arrow">
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                  </div>
                </div>
              </Swiper>

            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}