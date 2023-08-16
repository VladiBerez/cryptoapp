import React from "react";
import "./App.css";
import "antd/dist/reset.css";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Cryptocurrencies from "./components/Cryptocurrencies";
import CryptoDetails from "./components/CryptoDetails";
const App = () => {
  return (
    <div className="app">
      <>
        <div className="navbar">
          <Navbar />
        </div>
        <div className="main">
          <Layout>
            <div className="routes">
              <Routes>
                <Route path="/" element={<Homepage />}></Route>
                <Route
                  path="/cryptocurrencies"
                  element={<Cryptocurrencies />}
                ></Route>
                <Route path="/crypto/:uuid" element={<CryptoDetails />}></Route>
              </Routes>
            </div>
          </Layout>
        </div>
      </>
      <div
        className="footer"
        level={5}
        style={{ color: "white", textAlign: "center" }}
      >
        <Typography.Title>
          Cryptoverse <br /> All rights reserved
        </Typography.Title>
        <Space>
          <Link to="/">Home</Link>
          <Link to="/cryptocurrencies">Сryptocurrencies</Link>
        </Space>
      </div>
    </div>
  );
};

export default App;
