import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";

const Favourites = () => {
  const favouriteCards = useSelector((state) => state.favouritesCoin);
  console.log(favouriteCards);
  return (
    <Row gutter={[32, 32]} className="crypto-card-container">
      {favouriteCards.map((currency) => (
        <Col xs={24} sm={12} lg={6} className="crypto-card">
          <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
            <Card
              title={`${currency.rank}. ${currency.name}`}
              extra={
                <img
                  className="crypto-image"
                  alt="coin"
                  src={currency.iconUrl}
                />
              }
              hoverable
            >
              <p>Price: {millify(currency.price)}</p>
              <p>Market cap: {millify(currency.marketCap)}</p>
              <p>Daily change: {millify(currency.change)}</p>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
};

export default Favourites;
