import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'
import headerImg from './../Assets/img/header-img.svg'

import { Row, Container, Col } from 'react-bootstrap'

export const Song = () => {

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

  return (
    <section className='song' id='songs'>
      
      <Container>
        <Row>
          <Col>
            <div className="song-bx">
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