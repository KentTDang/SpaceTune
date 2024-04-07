import { Swiper, SwiperSlide } from 'swiper/react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'
import headerImg from './../Assets/img/header-img.svg'
import { Row, Container, Col } from 'react-bootstrap'
import React from 'react';
import benson from './../Assets/img/download.jpeg'
import arianaALB from './../Assets/img/arianaALB.jpeg'
import greedy from './../Assets/img/greedy.jpeg'
import sabrina from './../Assets/img/sabrina.jpeg'
import olivia from './../Assets/img/olivia.jpeg'
import ariana from './../Assets/img/ariana.jpeg'
import tate from './../Assets/img/tate.jpeg'
import jung from './../Assets/img/jung.jpeg'
import snooze from './../Assets/img/snooze.jpg'
import magnetic from './../Assets/img/magnetic.jpg'
import talb from './../Assets/img/talb.jpeg'
import ualb from './../Assets/img/ualb.jpeg'
import salb from './../Assets/img/salb.jpeg'

export const Song = () => {


    const clientID = "ccc21638bb6e4577a2bfa7a4fe26c6ae"; // client id for using api
    const redirectURI = "http://localhost:3000"; // redirects back to home page after authorization
    const responseType = "token"; // token for api  
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize" // link for authorizing spotify usage


    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);


    var imgURL = ""

    var songImage = ""


    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")


        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1] // parses token from url

            window.location.hash = ""
            window.localStorage.setItem("token", token)

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

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleSongSelect = (selectedSong) => {
        console.log('Selected Song', selectedSong)
    }

    const logout = () => {

        setToken("")

        window.localStorage.removeItem("token")

    }

    var songbox = document.getElementById("songbox");

    const searchArtists = async (e) => {
        e.preventDefault()
        console.log(token)
        const { data } = await axios.get("https://api.spotify.com/v1/search", {

            headers: {
                Authorization: `Bearer ${token}` // required to authorize usage, without you receive error 401
            },

            params: {
                q: searchKey, // query, adds onto  the end ofthe url, see await axios.get()
                type: "artist" // type of search, in this case it's the artist
            }
        });

        console.log(searchKey)

        console.log(data)
        var imageElement = document.getElementById("artist-image")
        var songTitleElement = document.getElementById("song-title")

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

    //   console.log(topTracks)
    return (


        <section className='song' id='songs'>

            <Container>

                <Row>
                    <Col>
                        <div className="song-bx" id="songbox">
                            <h2>
                                Trending Songs
                            </h2>
                            <p>TOP 10</p>
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
                                paginatio={{ el: '.swiper-pagination', clickable: true }}
                                navigation={{
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev',
                                    clickable: true,
                                }}
                                modules={[EffectCoverflow, Pagination, Navigation]}
                                className='swiper_container'>
                                <SwiperSlide>
                                    <img src={benson} alt="slide_image" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={greedy} alt="slide_image" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={sabrina} alt="slide_image" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={olivia} alt="slide_image" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={tate} alt="slide_image" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={ariana} alt="slide_image" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={jung} alt="slide_image" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={snooze} alt="slide_image" />
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
                                Popular Albums
                            </h2>
                            <p>TOP 10</p>
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
                                paginatio={{ el: '.swiper-pagination', clickable: true }}
                                navigation={{
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev',
                                    clickable: true,
                                }}
                                modules={[EffectCoverflow, Pagination, Navigation]}
                                className='swiper_container'>
                                <SwiperSlide>
                                    <img src={arianaALB} alt="slide_image" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={magnetic} alt="slide_image" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={talb} alt="slide_image" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={ualb} alt="slide_image" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={salb} alt="slide_image" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={tate} alt="slide_image" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={benson} alt="slide_image" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={jung} alt="slide_image" />
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