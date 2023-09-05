import React from "react";
import { Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined, FundOutlined, HeartOutlined } from "@ant-design/icons";
import icon from "../images/cryptocurrency.png";
import { useSelector } from "react-redux";

const Navbar = () => {
  const state = useSelector((state) => state.favourites);
  const quantityFavouritesCoins = Object.keys(state).length;
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">Crypto</Link>
        </Typography.Title>
        <Menu theme="dark">
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="cryptocurrencies" icon={<FundOutlined />}>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item key="favourites" icon={<HeartOutlined />}>
            <Link to="/favourites">
              My Favourite{" "}
              <Avatar size="small" icon={quantityFavouritesCoins} />
            </Link>
          </Menu.Item>
        </Menu>
        {/* <Button className="menu-control-container"></Button> */}
      </div>
    </div>
  );
};

export default Navbar;
