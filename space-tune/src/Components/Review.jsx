import React, { useState, useEffect } from 'react';
import { addDoc, collection, onSnapshot, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import '../Styles/Review.css';
import { db } from '../Auth/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faTrash, faStar, faPlus } from '@fortawesome/free-solid-svg-icons';
import Popup from 'reactjs-popup';
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export default function Review() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [songReviews, setSongReviews] = useState([]);
  const [filter, setFilter] = useState("");

  // Update state for form fields
  const [song, setSong] = useState("");
  const [album, setAlbum] = useState("");
  const [artist, setArtist] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(null);

  const collectionRef = collection(db, "song-reviews");

  useEffect(() => {
    setLoading(true);

    const q = filter ? query(collectionRef, where('artist', '==', filter)) : collectionRef;

    const unsub = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSongReviews(data);
      setLoading(false);
    }, (error) => {
      setError("Failed to fetch data from Firestore.");
      setLoading(false);
    });

    return () => unsub();
  }, [filter]);

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent refresh on action

    const data = {
      song: song,
      album: album,
      artist: artist,
      review: review,
      votes: 0,
      rating: rating
    };

    try {
      await addDoc(collectionRef, data);
      // Reset form fields after successful save
      setSong("");
      setAlbum("");
      setArtist("");
      setReview("");
      setRating(null);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Keep your update and delete functions as they are

  async function queryCollection(searchArtist) {
    setFilter(searchArtist);
  }

  // Return statement with updated controlled components
  // You will need to update the input elements in the Popup to use the new state variables
  // and set their onChange handlers accordingly.





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
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2 className="review-header" >Reviews</h2>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Search</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Display</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Add</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                      <Tab.Pane eventKey="first">

                        <div className="d-flex align-items-center justify-content-center">
                          <form onSubmit={(e) => { e.preventDefault(); queryCollection(artist); }}>
                            <div className="review-search-bar">
                              <input
                                type="text"
                                value={artist}
                                onChange={(e) => setArtist(e.target.value)}
                                placeholder="Search by Artist..."
                              // id="songSearch"
                              />
                              <button type="submit"></button>
                            </div>
                          </form>
                        </div>


                        <div className="d-flex align-items-center justify-content-center">
                          <div className="review-dialog">
                            <div className='song-review-container'>
                              {loading ? (
                                <h1>Loading...</h1>
                              ) : songReviews.length > 0 ? (
                                songReviews.map((song) => (
                                  <div className="review" key={song.id}>
                                    <h3>{song.song} - {song.album}</h3>
                                    <p>Artist: {song.artist}</p>
                                    <p>{song.review}</p>
                                    <div className="rating">
                                      {[...Array(5)].map((_, index) => {
                                        return (
                                          <FontAwesomeIcon
                                            key={index}
                                            icon={faStar}
                                            color={index < song.rating ? "#ffc107" : "#e4e5e9"}
                                          />
                                        );
                                      })}
                                    </div>
                                    <div className="utility">
                                      <div className="vote-container">
                                        <button className="vote-button" onClick={() => upVoteSongReview(song.id, song.votes)}><FontAwesomeIcon icon={faArrowUp} /></button>
                                        {song.votes}
                                        <button className="vote-button" onClick={() => downVoteSongReview(song.id, song.votes)}><FontAwesomeIcon icon={faArrowDown} /></button>
                                      </div>
                                      <button className="trash-button" onClick={() => deleteSongReview(song.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p>No reviews found.</p>
                              )}
                            </div>
                          </div>
                        </div>


                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <div className="d-flex align-items-center justify-content-center">
                          <div className="review-dialog">
                            {/* <Popup trigger={<button className='add-review-btn'><FontAwesomeIcon icon={faPlus} /></button>} modal nested>
                            {close => ( */}
                            <div className='song-review' >
                              <div className="review-top">
                                <span style={{ color: 'var(--dark-purple)' }}>Song Review</span>
                                {/* <button onClick={() => close()}>CLOSE</button> */}
                              </div>
                              <form onSubmit={handleSave}>
                                <label>Song Name</label>
                                <input type="text" value={song} onChange={(e) => setSong(e.target.value)} />
                                <br />
                                <label>Album</label>
                                <input type="text" value={album} onChange={(e) => setAlbum(e.target.value)} />
                                <br />
                                <label>Artist</label>
                                <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} />
                                <br />
                                <label>Review</label>
                                <input type="text" value={review} onChange={(e) => setReview(e.target.value)} />
                                <br />
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
                                        checked={currentRating === rating}
                                      />
                                      <FontAwesomeIcon
                                        className="star"
                                        icon={faStar}
                                        color={currentRating <= (rating ? rating : 0) ? "#ffc107" : "#e4e5e9"}
                                      />
                                    </label>
                                  );
                                })}
                                <br />
                                <button className="button-main" type="submit">Save</button>
                              </form>
                            </div>
                            {/* )} */}
                            {/* </Popup> */}
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second" className="d-flex align-items-center justify-content-center">
                        <div className='song-review-container'>
                          {loading ? (
                            <h1>Loading...</h1>
                          ) : songReviews.length > 0 ? (
                            songReviews.map((song) => (
                              <div className="review" key={song.id}>
                                <h3>{song.song} - {song.album}</h3>
                                <p>Artist: {song.artist}</p>
                                <p>{song.review}</p>
                                <div className="rating">
                                  {[...Array(5)].map((_, index) => {
                                    return (
                                      <FontAwesomeIcon
                                        key={index}
                                        icon={faStar}
                                        color={index < song.rating ? "#ffc107" : "#e4e5e9"}
                                      />
                                    );
                                  })}
                                </div>
                                <div className="utility">
                                  <div className="vote-container">
                                    <button className="vote-button" onClick={() => upVoteSongReview(song.id, song.votes)}><FontAwesomeIcon icon={faArrowUp} /></button>
                                    {song.votes}
                                    <button className="vote-button" onClick={() => downVoteSongReview(song.id, song.votes)}><FontAwesomeIcon icon={faArrowDown} /></button>
                                  </div>
                                  <button className="trash-button" onClick={() => deleteSongReview(song.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p>No reviews found.</p>
                          )}
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
}  