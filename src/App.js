import React from "react";
import "./App.css";
import "antd/dist/reset.css";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Exchanges from "./components/Exchanges";
import Cryptocurrencies from "./components/Cryptocurrencies";
import CryptoDetails from "./components/CryptoDetails";
import News from "./components/News";
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
                <Route path="/exchanges" element={<Exchanges />}></Route>
                <Route
                  path="/cryptocurrencies"
                  element={<Cryptocurrencies />}
                ></Route>
                <Route
                  path="/crypto/:coindId"
                  element={<CryptoDetails />}
                ></Route>
                <Route path="/news" element={<News />}></Route>
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
          <Link to="/exchanges">Exchanges</Link>
          <Link to="/news">News</Link>
        </Space>
      </div>
    </div>
  );
};

export default App;
