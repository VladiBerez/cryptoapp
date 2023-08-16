import React from "react";
import { useParams } from "react-router-dom";
import millify from "millify";
import parse from "html-react-parser";
import { Row, Col, Select, Typography, Avatar, Collapse } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { useGetCryptoDetailsQuery } from "../services/cryptoApi";
import { useGetExchangesQuery } from "../services/cryptoApi";
import Loader from "./Loader";
// import LineChart from "./LineChart";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const CryptoDetails = () => {
  const { uuid } = useParams();
  const { data, isFetching } = useGetCryptoDetailsQuery(uuid);
  const { data: coinExchanges, isFetching: isFetchingDataExchanges } =
    useGetExchangesQuery(uuid);

  const cryptoDetails = data?.data?.coin;
  const exchangeDeatails = coinExchanges?.data?.exchanges;

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails?.["24hVolume"] && millify(cryptoDetails?.["24hVolume"])
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  if (isFetching) return <Loader />;
  if (isFetchingDataExchanges) return <Loader />;

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails.name} ({cryptoDetails.symbol}) Price
        </Title>
        <p>
          {cryptoDetails.name} Live price in US dollar. View value statistic,
          market cap and supply.
        </p>

        <Col className="stats-container">
          <Col className="coin-value-statistics">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">
                {cryptoDetails.name} Value Statistics
              </Title>
              <p>An overview showing statistics of {cryptoDetails.name}</p>
              {stats.map(({ icon, title, value }) => (
                <Col className="coin-stats" key={title}>
                  <Col className="coin-stats-name">
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                  </Col>
                  <Text className="stats">{value}</Text>
                </Col>
              ))}
            </Col>
          </Col>
          <Col className="other-stats-info">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">
                Other Statistics
              </Title>
              <p>An overview showing statistics of all cryptocurrencies</p>
              {genericStats.map(({ icon, title, value }) => (
                <Col className="coin-stats" key={title}>
                  <Col className="coin-stats-name">
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                  </Col>
                  <Text className="stats">{value}</Text>
                </Col>
              ))}
            </Col>
          </Col>
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {cryptoDetails.name}?
          </Title>
          {parse(cryptoDetails.description)}
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails?.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
      <Row style={{ marginTop: "8vh" }}>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Volume</Col>
        <Col span={6}>Price</Col>
        <Col span={6}>Number of Markets</Col>
      </Row>
      <Col style={{ marginTop: "3vh" }}>
        {exchangeDeatails.map((exchange) => (
          <Row key={exchange.uuid}>
            <Col span={24}>
              <Collapse>
                <Panel
                  key={exchange.uuid}
                  showArrow={false}
                  header={
                    <Row>
                      <Col span={6}>
                        <Avatar
                          className="exchange-name"
                          src={exchange.iconUrl}
                        ></Avatar>
                        <Text style={{ marginLeft: "15px" }}>
                          <strong>{exchange.name}</strong>
                        </Text>
                      </Col>
                      <Col span={6}>$ {millify(exchange?.["24hVolume"])}</Col>
                      <Col span={6}>{millify(exchange?.price)}</Col>
                      <Col span={6}>{millify(exchange?.numberOfMarkets)}</Col>
                    </Row>
                  }
                >
                  <a href={exchange?.coinrankingUrl}>
                    {parse(exchange?.coinrankingUrl || "")}
                  </a>
                </Panel>
              </Collapse>
            </Col>
          </Row>
        ))}
      </Col>
    </Col>
  );
};

export default CryptoDetails;
