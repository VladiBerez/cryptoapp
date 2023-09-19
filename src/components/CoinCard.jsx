// import React, { useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Col } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import {
  addToFavouriteCoin,
  removeFavouriteCoin,
} from "../redux/slices/sliceFavourites";
import { useDispatch, useSelector } from "react-redux";

const CoinCard = ({ currency }) => {
  const dispatch = useDispatch();
  const isFavourite = useSelector((state) =>
    state.favourites.includes(currency.uuid)
  );

  const addCoinToFavouriteLocalStorage = (uuid) => {
    const favourites = JSON.parse(localStorage.getItem("favourites") || []);
    if (!favourites.includes(uuid)) {
      favourites.push(uuid);
      localStorage.setItem("favourites", JSON.stringify(favourites));
    }
  };

  const removeCoinToFavouriteLocalStorage = (uuid) => {
    const favourites = JSON.parse(localStorage.getItem("favourites") || []);
    const index = favourites.indexOf(uuid);
    if (index !== -1) {
      favourites.splice(index, 1);
      localStorage.setItem("favourites", JSON.stringify(favourites));
    }
  };

  const handleFavourite = (e) => {
    e.preventDefault();
    if (isFavourite) {
      dispatch(removeFavouriteCoin(currency.uuid));
      removeCoinToFavouriteLocalStorage(currency.uuid);
    } else {
      dispatch(addToFavouriteCoin(currency.uuid));
      addCoinToFavouriteLocalStorage(currency.uuid);
    }
  };

  return (
    <Col xs={24} sm={12} lg={6} className="crypto-card">
      <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
        <Card
          title={`${currency.rank}. ${currency.name} `}
          extra={
            <img className="crypto-image" alt="coin" src={currency.iconUrl} />
          }
          hoverable
        >
          <p>Price: {millify(currency.price)}</p>
          <p>Market cap: {millify(currency.marketCap)}</p>
          <p>Daily change: {millify(currency.change)}%</p>
          <div onClick={handleFavourite}>
            {isFavourite ? <StarFilled /> : <StarOutlined />}
          </div>
        </Card>
      </Link>
    </Col>
  );
};

export default CoinCard;
