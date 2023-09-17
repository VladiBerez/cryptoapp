import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
// import { useGetCryptoQuery } from "../services/cryptoApi";
import { useGetCoinsQuery } from "../services/cryptoApi";
import Cryptocurrencies from "./Cryptocurrencies";

const Homepage = () => {
  // const { data: coinsData, isFetching: isCoinsFetching  } = useGetCryptoQuery();
  const { data: coinsData, isFetching: isCoinsFetching } = useGetCoinsQuery(10);

  if (isCoinsFetching) return "loading";
  const globalStats = coinsData?.data?.stats || [];
  return (
    <>
      <Typography.Title level="2" className="heading">
        Global Crypto Statistics
      </Typography.Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={millify(globalStats.totalCoins)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h value"
            value={millify(globalStats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Typography.Title level={2} className="home-title">
          Top 10 cryptocurrencies in the world
        </Typography.Title>
        <Typography.Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show more</Link>
        </Typography.Title>
      </div>
      <Cryptocurrencies simplified />
    </>
  );
};

export default Homepage;
