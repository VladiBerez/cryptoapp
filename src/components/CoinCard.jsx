import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Col } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import {
  addToFavouriteCoinId,
  removeFavouriteCoinId
} from "../redux/slices/sliceFavourites";
import { pushToFavouriteCoinFull, deleteFromFavouriteCoinFull } from "../redux/slices/sliceFavouritesCoins";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const CoinCard = ({ currency }) => {
  const dispatch = useDispatch();

  const addCoinToFavouriteLocalStorage = (uuid) => {
    const favourites = JSON.parse(localStorage.getItem("favouritesId") || "[]");
    if (!favourites.includes(uuid)) {
      favourites.push(uuid);
      localStorage.setItem("favouritesId", JSON.stringify(favourites));
    }
  };
  
  const removeCoinToFavouriteLocalStorage = (uuid) => {
    const favourites = JSON.parse(localStorage.getItem("favouritesId") || "[]");
    const index = favourites.indexOf(uuid);
    if (index !== -1) {
      favourites.splice(index, 1);
      localStorage.setItem("favouritesId", JSON.stringify(favourites));
    }
  };
  

  const isFavourite = useSelector((state) =>
    state.favouritesId.includes(currency.uuid)
  );
  
  useEffect(() => {
    const favouritesFromStorage = JSON.parse(
      localStorage.getItem("favouritesId") || "[]"
    );

    if (favouritesFromStorage.includes(currency.uuid) && !isFavourite ) {
      dispatch(addToFavouriteCoinId(currency.uuid));
      dispatch(pushToFavouriteCoinFull(currency));
      
    }
  }, [currency.uuid, dispatch, isFavourite]);
  

  const handleFavourite = (e) => {
    e.preventDefault();
    if (isFavourite) {
      dispatch(removeFavouriteCoinId(currency.uuid));
      dispatch(deleteFromFavouriteCoinFull(currency));
      removeCoinToFavouriteLocalStorage(currency.uuid);
      console.log('dispathced remove from LocalStorage')

    } else {
      dispatch(addToFavouriteCoinId(currency.uuid));
      dispatch(pushToFavouriteCoinFull(currency))
      addCoinToFavouriteLocalStorage(currency.uuid);
      console.log('dispathced add from click')

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
