import React, { useState, useEffect } from "react";
import MakersDataService from "../services/maker";
import { Link } from "react-router-dom";

const Maker = props => {
  const initialMakerState = {
    id: null,
    name: "",
    address: {},
    clothesItem: "",
    reviews: []
  };
  const [maker, setMaker] = useState(initialMakerState)

  const getMaker = id => {
    MakersDataService.get(id)
    .then(response => {
      setMaker(response.data);
    console.log(response.data);
    })
    .catch(e =>{
      console.log(e);
    });   
  };

  useEffect(()=> {
    getMaker(props.match.params.id);
  }, [props.match.params.id]);

  const deleteReview= (reviewId, index) => {
    MakersDataService.deleteReview(reviewId)
    .then(response => {
      setMaker((prevState) => {
        prevState.reviews.splice(index,1)
        return({
          ...prevState
        })
      })
    })
    .catch(e => {
      console.log(e);
    });
  };

  return (
    <div>
      hello world 
      
    </div>
  );
}

export default Maker;