import React, { useState, useEffect } from "react";
import { Row, Input } from "antd";
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
          <CoinCard key={currency.uuid} currency={currency} />
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
