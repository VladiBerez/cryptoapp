import React, { useState, useEffect } from "react";
<<<<<<< Updated upstream
import { Row, Input } from "antd";
=======
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { StarOutlined} from '@ant-design/icons'

import { useGetCoinsQuery } from "../services/cryptoApi";
>>>>>>> Stashed changes
import Loader from "./Loader";
import CoinCard from "./CoinCard";

import { useGetCoinsQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoCoinsList, isFetching } = useGetCoinsQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filterData = cryptoCoinsList?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setCryptos(filterData);
  }, [cryptoCoinsList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
<<<<<<< Updated upstream
          <CoinCard key={currency.uuid} currency={currency} />
=======
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name} `}
                extra={
                  <img
                    className="crypto-image"
                    alt="coin"
                    src={currency.iconUrl}
                  />
                }
                hoverable
              >
                <>
                  <p>Price: {millify(currency.price)}</p>
                  <p>Market cap: {millify(currency.marketCap)}</p>
                  <p>Daily change: {millify(currency.change)}%</p>
                </>
                <button className="crypto-favourites" onClick={(e) => {
        e.preventDefault(); // Предотвращение перехода по ссылке
      }}>
                  <StarOutlined/>
                </button>
              </Card>
            </Link>
          </Col>
>>>>>>> Stashed changes
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
