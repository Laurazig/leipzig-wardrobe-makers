import React, { useState, useEffect } from "react";
import MakerDataService from "../services/maker";
import { Link } from "react-router-dom";

const MakersList = props => {
  const [maker, setMaker] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchClothesItem, setSearchClothesItem] = useState("");
  const [clothes, setClothes] = useState(["All Clothes"]);

  useEffect(() => {
    retrieveMakers();
    retrieveclothes();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchZip = e => {
    const searchZip = e.target.value;
    setSearchZip(searchZip);
  };

  const onChangeSearchClothesItem = e => {
    const searchClothesItem = e.target.value;
    setSearchClothesItem(searchClothesItem);

  };

  const retrieveMakers = () => {
    MakerDataService.getAll()
      .then(response => {
        console.log(response.data);
        setMaker(response.data.makers);

      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveclothes = () => {
    MakerDataService.getClothes()
      .then(response => {
        console.log(response.data);
        setClothes(["All Clothes"].concat(response.data));

      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveMakers();
  };

  const find = (query, by) => {
    MakerDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setMaker(response.data.makers);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    find(searchName, "name")
  };

  const findByZip = () => {
    find(searchZip, "zipcode")
  };

  const findByClothesItem = () => {
    if (searchClothesItem === "All Clothes") {
      refreshList();
    } else {
      find(searchClothesItem, "clothesItem")
    }
  };

  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="search by zip"
            value={searchZip}
            onChange={onChangeSearchZip}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByZip}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4">

          <select onChange={onChangeSearchClothesItem}>
            {clothes.map((clothesItem, index) => {
              return (
                <option value={clothesItem} key={index}> {clothesItem.substring(0, 20)} </option>
              )
            })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByClothesItem}
            >
              Search
            </button>
          </div>

        </div>
      </div>
      <div className="row">
        {maker.map((maker, index) => {
          const address = `${maker.address.building} ${maker.address.street}, ${maker.address.zipcode}`;
          return (
            <div className="col-lg-4 pb-1" key={index}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{maker.name}</h5>
                  <p className="card-text">
                    <strong>ClothesItem: </strong>{maker.clothesItem}<br/>
                    <strong>Address: </strong>{address}
                  </p>
                  <div className="row">
                    <Link to={"/makers/"+maker._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                      View Reviews
                    </Link>
                    <a target="_blank"  rel="noreferrer" href={"http://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}


      </div>
    </div>
  );
}

export default MakersList;