import React, { useState, useRef, useEffect } from 'react'
import '../Styles/Review.css'
import { db } from '../Auth/firebase'
import { addDoc, collection, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowUp,
  faArrowDown,
  faTrash,
  faStar,
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import Popup from 'reactjs-popup';

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


  return (
    <>
      <div className="review-dialog">
        <Popup trigger={<button><FontAwesomeIcon icon={faPlus} /></button>}
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
                  <br/>
                  <button className="button-main" type="submit">Save</button >
                </form>
                
              </div>
            )
          }
        </Popup>
      </div>

      <div className="content-container">
        <div className="song-review-container">
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            songReviews.map((songs) => (
              <div className="review" key={songs.id}>
                <span>{songs.song} - {songs.album} - {songs.artist} - {songs.review}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}
