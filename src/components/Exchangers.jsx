import React from "react";
import { Typography, Col, Row, Collapse, Avatar } from "antd";
import millify from "millify";
import parse from "html-react-parser";
import Loader from "./Loader";
import { useGetExchangesQuery } from "../services/cryptoApi";

const { Text } = Typography;
const { Panel } = Collapse;

const Exchangers = ({ uuid }) => {
  const { data: coinExchanges, isFetching: isFetchingDataExchanges } =
    useGetExchangesQuery(uuid);

  console.log(coinExchanges);
  const exchangeDeatails = coinExchanges?.data?.exchanges;

  if (isFetchingDataExchanges) return <Loader />;

  return (
    <>
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
    </>
  );
};

export default Exchangers;
