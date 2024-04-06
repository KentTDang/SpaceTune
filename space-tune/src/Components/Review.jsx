import React, { useState, useRef, useEffect } from 'react'
import { addDoc, collection, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore'

import { db } from '../Auth/firebase'

export default function Review() {

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [songReviews, setSongReviews] = useState([]);

  const collectionRef = collection(db, "song-reviews");

  const songRef = useRef();
  const albumRef = useRef();
  const artistRef = useRef();
  const reviewRef = useRef();
  const voteRef = useRef();
  const ratingRef = useRef();
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

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
      // rating: parseFloat(ratingRef.current.value)
    }

    try {
      addDoc(collectionRef, data);
    } catch (error) {
      console.log("Error : ", error);
    }
  }


  return (
    <div>
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
        <button className="button-main" type="submit">Save</button >
      </form>
    </div>
  )
}
