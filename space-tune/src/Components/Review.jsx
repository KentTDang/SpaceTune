import React, { useState, useRef, useEffect } from 'react'
import { addDoc, collection, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import '../Styles/Review.css'
import { db } from '../Auth/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowUp,
  faArrowDown,
  faTrash,
  faStar,
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import Popup from 'reactjs-popup';
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import 'animate.css';
import TrackVisibility from 'react-on-screen';


export default function Review() {

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [songReviews, setSongReviews] = useState([]);

  const collectionRef = collection(db, "song-reviews");

  const songRef = useRef();
  const albumRef = useRef();
  const artistRef = useRef();
  const reviewRef = useRef();
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  /**  Display Function Firebase **/
  useEffect(() => {
    setLoading(true);

    const unsub = onSnapshot(collectionRef, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      try {
        setLoading(true);
        setSongReviews(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data from Firestore.");
        setLoading(false);
      }
    });
    return () => {
      unsub();
    };
  }, []);

  /** Create Function Firebase **/
  const handleSave = async (e) => {
    e.preventDefault(); // Prevent refresh on action

    let data = {
      song: songRef.current.value,
      album: albumRef.current.value,
      artist: artistRef.current.value,
      review: reviewRef.current.value,
      votes: 0,
      rating: rating
    }

    try {
      addDoc(collectionRef, data);
    } catch (error) {
      console.log("Error : ", error);
    }
  }

  /**  Update Function Firebase **/
  const upVoteSongReview = async (id, votes) => {
    const songReviewDoc = doc(db, "song-reviews", id);
    const newFields = { votes: votes + 1 }
    await updateDoc(songReviewDoc, newFields)
  }

  const downVoteSongReview = async (id, votes) => {
    const songReviewDoc = doc(db, "song-reviews", id);
    const newFields = { votes: votes - 1 }
    await updateDoc(songReviewDoc, newFields)
  }

  /** Delete Function Firebase **/
  const deleteSongReview = async (id) => {
    const songReviewDoc = doc(db, "song-reviews", id);
    await deleteDoc(songReviewDoc);
  }

  return (
    <section className="review" id="reviews">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Reviews</h2>
                  <div className="review-dialog">
                    <Popup trigger={<button className='add-review-btn'><FontAwesomeIcon icon={faPlus} /></button>}
                      modal nested>
                      {
                        close => (

                          <div className='song-review'>
                            <div className="review-top">
                              <span>Song Review</span>
                              <button button onClick={() => close()}>CLOSE</button>
                            </div>
                            <form onSubmit={handleSave}>
                              <label>Song Name</label>
                              <input type="text" ref={songRef} />
                              <br />
                              <label>Album</label>
                              <input type="text" ref={albumRef} />
                              <br />
                              <label>Artist</label>
                              <input type="text" ref={artistRef} />
                              <br />
                              <label>Review</label>
                              <input type="text" ref={reviewRef} />
                              <br />
                              {[...Array(5)].map((_, index) => {
                                const currentRating = index + 1;
                                return (
                                  <label key={index}>
                                    <input
                                      type="radio"
                                      name="rating"
                                      value={currentRating}
                                      onClick={() => setRating(currentRating)}
                                      checked={currentRating === rating} // Set checked based on current rating
                                    />
                                    <FontAwesomeIcon
                                      className="star"
                                      icon={faStar}
                                      color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                      onMouseEnter={() => setHover(currentRating)}
                                      onMouseLeave={() => setHover(null)}
                                    />
                                  </label>
                                );
                              })}
                              <br />
                              <button className="button-main" type="submit">Save</button >
                            </form>

                          </div>
                        )
                      }
                    </Popup>
                  </div>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Tab 1</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Tab 2</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Tab 3</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                      <Tab.Pane eventKey="section">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                        </p>
                      </Tab.Pane>
                      <Tab.Pane eventKey="first">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                        </p>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                        </p>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <div className="content-container">
                          <div className="song-review-container">
                            {loading ? (
                              <h1>Loading...</h1>
                            ) : (
                              songReviews.map((songs) => (
                                <div className="review" key={songs.id}>
                                  <span>{songs.song} - {songs.album} - {songs.artist} - {songs.review}
                                    {[...Array(5)].map((_, index) => {
                                      const currentRating = index + 1;
                                      return (
                                        <FontAwesomeIcon
                                          key={index}
                                          className="star"
                                          icon={faStar}
                                          color={currentRating <= songs.rating ? "#ffc107" : "#e4e5e9"}
                                        />
                                      );
                                    })}
                                  </span>
                                  <div className="utility">
                                    <div className="vote-container">
                                      <button className="vote-button" onClick={() => { upVoteSongReview(songs.id, songs.votes) }}><FontAwesomeIcon icon={faArrowUp} /></button>
                                      {songs.votes}
                                      <button className="vote-button" onClick={() => { downVoteSongReview(songs.id, songs.votes) }}><FontAwesomeIcon icon={faArrowDown} /></button>
                                    </div>
                                    <button className="trash-button" onClick={() => { deleteSongReview(songs.id) }}><FontAwesomeIcon icon={faTrash} /></button>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
