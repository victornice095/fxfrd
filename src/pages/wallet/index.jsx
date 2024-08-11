import React from "react";
import "./style.css";
import i18next from "i18next";
import Topbar from "../../components/usertopbar/Topbar";
import UserFooter from "../../components/minorfooter";
import { Col, Row } from "antd";
import { Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useGetCryptoByIdQuery } from "../../redux/service/cryptoApi";
import { useSelector } from "react-redux";
import DocumentTitle from "react-document-title";
import { useGetExchangeQuery } from "../../redux/service/exchangeRates";

const Wallet = () => {
  const { data: btcdata } = useGetCryptoByIdQuery("bitcoin");
  const { data: ethdata } = useGetCryptoByIdQuery("ethereum");
  const { data: bnbdata } = useGetCryptoByIdQuery("binancecoin");
  const { data: usdtdata } = useGetCryptoByIdQuery("tether");
  const { data: ltcdata } = useGetCryptoByIdQuery("litecoin");
  const { data: bchdata } = useGetCryptoByIdQuery("bitcoin-cash");

  const { data: exchangedata } = useGetExchangeQuery();

  const { user } = useSelector((state) => state.auth);

  const menu1 = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <Link
              className="wallet-link"
              to="/funds/deposit"
              state={{ from: "bitcoin" }}
            >
              {i18next.t("tfunds60")}
            </Link>
          ),
        },
        {
          key: "2",
          label: (
            <Link
              className="wallet-link"
              to="/funds/withdraw"
              state={{ from: "bitcoin" }}
            >
              {i18next.t("tfunds62")}
            </Link>
          ),
        },
        {
          key: "3",
          label: (
            <Link
              className="wallet-link"
              to="/funds/transfer"
              state={{ from: "bitcoin" }}
            >
              {i18next.t("twallet66a")}
            </Link>
          ),
        },
      ]}
    />
  );

  const menu2 = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <Link
              className="wallet-link"
              to="/funds/deposit"
              state={{ from: "ethereum" }}
            >
              {i18next.t("tfunds60")}
            </Link>
          ),
        },
        {
          key: "2",
          label: (
            <Link
              className="wallet-link"
              to="/funds/withdraw"
              state={{ from: "ethereum" }}
            >
              {i18next.t("tfunds62")}
            </Link>
          ),
        },
        {
          key: "3",
          label: (
            <Link
              className="wallet-link"
              to="/funds/transfer"
              state={{ from: "ethereum" }}
            >
              {i18next.t("twallet66a")}
            </Link>
          ),
        },
      ]}
    />
  );

  const menu3 = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <Link
              className="wallet-link"
              to="/funds/deposit"
              state={{ from: "binancecoin" }}
            >
              {i18next.t("tfunds60")}
            </Link>
          ),
        },
        {
          key: "2",
          label: (
            <Link
              className="wallet-link"
              to="/funds/withdraw"
              state={{ from: "binancecoin" }}
            >
              {i18next.t("tfunds62")}
            </Link>
          ),
        },
        {
          key: "3",
          label: (
            <Link
              className="wallet-link"
              to="/funds/transfer"
              state={{ from: "binancecoin" }}
            >
              {i18next.t("twallet66a")}
            </Link>
          ),
        },
      ]}
    />
  );

  const menu4 = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <Link
              className="wallet-link"
              to="/funds/deposit"
              state={{ from: "tether" }}
            >
              {i18next.t("tfunds60")}
            </Link>
          ),
        },
        {
          key: "2",
          label: (
            <Link
              className="wallet-link"
              to="/funds/withdraw"
              state={{ from: "tether" }}
            >
              {i18next.t("tfunds62")}
            </Link>
          ),
        },
        {
          key: "3",
          label: (
            <Link
              className="wallet-link"
              to="/funds/transfer"
              state={{ from: "tether" }}
            >
              {i18next.t("twallet66a")}
            </Link>
          ),
        },
      ]}
    />
  );

  const menu5 = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <Link
              className="wallet-link"
              to="/funds/deposit"
              state={{ from: "litecoin" }}
            >
              {i18next.t("tfunds60")}
            </Link>
          ),
        },
        {
          key: "2",
          label: (
            <Link
              className="wallet-link"
              to="/funds/withdraw"
              state={{ from: "litecoin" }}
            >
              {i18next.t("tfunds62")}
            </Link>
          ),
        },
        {
          key: "3",
          label: (
            <Link
              className="wallet-link"
              to="/funds/transfer"
              state={{ from: "litecoin" }}
            >
              {i18next.t("twallet66a")}
            </Link>
          ),
        },
      ]}
    />
  );

  const menu6 = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <Link
              className="wallet-link"
              to="/funds/deposit"
              state={{ from: "bitcoincash" }}
            >
              {i18next.t("tfunds60")}
            </Link>
          ),
        },
        {
          key: "2",
          label: (
            <Link
              className="wallet-link"
              to="/funds/withdraw"
              state={{ from: "bitcoincash" }}
            >
              {i18next.t("tfunds62")}
            </Link>
          ),
        },
        {
          key: "3",
          label: (
            <Link
              className="wallet-link"
              to="/funds/transfer"
              state={{ from: "bitcoincash" }}
            >
              {i18next.t("twallet66a")}
            </Link>
          ),
        },
      ]}
    />
  );

  const euro = exchangedata?.rates?.USD;

  const btcbalanceusd = user?.user?.BTC?.deposit.toFixed(2);
  const btcbalanceeur = (btcbalanceusd / euro).toFixed(2);

  const balancebtc =
    Math.round(
      (btcbalanceusd / btcdata?.market_data?.current_price?.usd) * 1000000
    ) / 1000000;

  const ethbalanceusd = user?.user?.ETH?.deposit.toFixed(2);

  const ethbalanceeur = (ethbalanceusd * euro).toFixed(2);
  const balanceeth =
    Math.round(
      (ethbalanceusd / ethdata?.market_data?.current_price?.usd) * 1000000
    ) / 1000000;

  const bnbbalanceusd = user?.user?.BNB?.deposit.toFixed(2);
  const bnbbalanceeur = (bnbbalanceusd * euro).toFixed(2);
  const balancebnb =
    Math.round(
      (bnbbalanceusd / bnbdata?.market_data?.current_price?.usd) * 1000000
    ) / 1000000;

  const usdtbalanceusd = user?.user?.USDT?.deposit.toFixed(2);
  const usdtbalanceeur = (usdtbalanceusd * euro).toFixed(2);
  const balanceusdt =
    Math.round(
      (usdtbalanceusd / usdtdata?.market_data?.current_price?.usd) * 1000000
    ) / 1000000;

  const ltcbalanceusd = user?.user?.LTC?.deposit.toFixed(2);
  const ltcbalanceeur = (ltcbalanceusd * euro).toFixed(2);
  const balanceltc =
    Math.round(
      (ltcbalanceusd / ltcdata?.market_data?.current_price?.usd) * 1000000
    ) / 1000000;

  const bchbalanceusd = user?.user?.BCH?.deposit.toFixed(2);
  const bchbalanceeur = (bchbalanceusd * euro).toFixed(2);

  const balancebch =
    Math.round(
      (bchbalanceusd / bchdata?.market_data?.current_price?.usd) * 1000000
    ) / 1000000;

  return (
    <DocumentTitle title="Wallet | Binance FX Trading">
      <div className="wallet-main">
        <Topbar />
        <div className="wallet-main-1">
          <div>
            <Row
              className="wallet-main-1-1"
              gutter={{
                xs: 6,
                sm: 18,
                md: 24,
                lg: 32,
              }}
            >
              <Col className="wallet-main-1-2-1">
                <div className="wallet-sub-1">
                  <div className="wallet-sub-1-1">
                    <div>
                      <img
                        src="https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579"
                        alt="bitcoin"
                      />
                      &nbsp;
                      <p>Bitcoin(BTC)</p>
                    </div>
                    <div>
                      <Dropdown placement="bottom" overlay={menu1}>
                        <BsThreeDotsVertical className="dropdown-icon" />
                      </Dropdown>
                    </div>
                  </div>
                  <p>
                    1 BTC = {btcdata?.market_data?.current_price?.usd}{" "}
                    <span>USD</span>
                  </p>
                </div>
                <div className="wallet-sub-2">
                  <p className="wallet-balance">{i18next.t("twallet66")}</p>
                  <p className="wallet-coin-value">
                    {" "}
                    {btcbalanceusd} <span>USD</span>{" "}
                  </p>
                  <p className="wallet-coin-value-eur">
                    {" "}
                    {btcbalanceeur} <span>EUR</span>{" "}
                  </p>
                  <p className="wallet-coin-value-1">{balancebtc} BTC</p>
                </div>
              </Col>
              <Col className="wallet-main-1-2-1">
                <div className="wallet-sub-1">
                  <div className="wallet-sub-1-1">
                    <div>
                      <img
                        src="https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880"
                        alt="ethereum"
                      />
                      &nbsp;
                      <p>Ethereum(ETH)</p>
                    </div>
                    <div>
                      <Dropdown placement="bottom" overlay={menu2}>
                        <BsThreeDotsVertical className="dropdown-icon" />
                      </Dropdown>
                    </div>
                  </div>
                  <p>
                    1 ETH = {ethdata?.market_data?.current_price?.usd}{" "}
                    <span>USD</span>
                  </p>
                </div>
                <div className="wallet-sub-2">
                  <p className="wallet-balance">{i18next.t("twallet66")}</p>
                  <p className="wallet-coin-value">
                    {" "}
                    {ethbalanceusd} <span>USD</span>{" "}
                  </p>
                  <p className="wallet-coin-value-eur">
                    {" "}
                    {ethbalanceeur} <span>EUR</span>{" "}
                  </p>
                  <p className="wallet-coin-value-1">{balanceeth} ETH</p>
                </div>
              </Col>
              <Col className="wallet-main-1-2-1">
                <div className="wallet-sub-1">
                  <div className="wallet-sub-1-1">
                    <div>
                      <img
                        src="https://assets.coingecko.com/coins/images/825/thumb/bnb-icon2_2x.png?1644979850"
                        alt="binance coin"
                      />
                      &nbsp;
                      <p>Binance coin(BNB)</p>
                    </div>
                    <div>
                      <Dropdown placement="bottom" overlay={menu3}>
                        <BsThreeDotsVertical className="dropdown-icon" />
                      </Dropdown>
                    </div>
                  </div>
                  <p>
                    1 BNB = {bnbdata?.market_data?.current_price?.usd}{" "}
                    <span>USD</span>
                  </p>
                </div>
                <div className="wallet-sub-2">
                  <p className="wallet-balance">{i18next.t("twallet66")}</p>
                  <p className="wallet-coin-value">
                    {" "}
                    {bnbbalanceusd} <span>USD</span>{" "}
                  </p>
                  <p className="wallet-coin-value-eur">
                    {" "}
                    {bnbbalanceeur} <span>EUR</span>{" "}
                  </p>
                  <p className="wallet-coin-value-1">{balancebnb} BNB</p>
                </div>
              </Col>
              <Col className="wallet-main-1-2-1">
                <div className="wallet-sub-1">
                  <div className="wallet-sub-1-1">
                    <div>
                      <img
                        src="https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png?1598003707"
                        alt="Tether"
                      />
                      &nbsp;
                      <p>Tether(USDT)</p>
                    </div>
                    <div>
                      <Dropdown placement="bottom" overlay={menu4}>
                        <BsThreeDotsVertical className="dropdown-icon" />
                      </Dropdown>
                    </div>
                  </div>
                  <p>
                    1 USDT = {usdtdata?.market_data?.current_price?.usd}{" "}
                    <span>USD</span>
                  </p>
                </div>
                <div className="wallet-sub-2">
                  <p className="wallet-balance">{i18next.t("twallet66")}</p>
                  <p className="wallet-coin-value">
                    {" "}
                    {usdtbalanceusd} <span>USD</span>{" "}
                  </p>
                  <p className="wallet-coin-value-eur">
                    {" "}
                    {usdtbalanceeur} <span>EUR</span>{" "}
                  </p>
                  <p className="wallet-coin-value-1">{balanceusdt} USDC</p>
                </div>
              </Col>
              <Col className="wallet-main-1-2-1">
                <div className="wallet-sub-1">
                  <div className="wallet-sub-1-1">
                    <div>
                      <img
                        src="https://assets.coingecko.com/coins/images/2/thumb/litecoin.png?1547033580"
                        alt="litecoin"
                      />
                      &nbsp;
                      <p>Litecoin(LTC)</p>
                    </div>
                    <div>
                      <Dropdown placement="bottom" overlay={menu5}>
                        <BsThreeDotsVertical className="dropdown-icon" />
                      </Dropdown>
                    </div>
                  </div>
                  <p>
                    1 LTC = {ltcdata?.market_data?.current_price?.usd}{" "}
                    <span>USD</span>
                  </p>
                </div>
                <div className="wallet-sub-2">
                  <p className="wallet-balance">{i18next.t("twallet66")}</p>
                  <p className="wallet-coin-value">
                    {" "}
                    {ltcbalanceusd} <span>USD</span>
                  </p>
                  <p className="wallet-coin-value-eur">
                    {" "}
                    {ltcbalanceeur} <span>EUR</span>{" "}
                  </p>
                  <p className="wallet-coin-value-1">{balanceltc} LTC</p>
                </div>
              </Col>
              <Col className="wallet-main-1-2-1">
                <div className="wallet-sub-1">
                  <div className="wallet-sub-1-1">
                    <div>
                      <img
                        src="https://assets.coingecko.com/coins/images/780/thumb/bitcoin-cash-circle.png?1594689492"
                        alt="bitcoin cash"
                      />
                      &nbsp;
                      <p>Bitcoin cash(BCH)</p>
                    </div>
                    <div>
                      <Dropdown placement="bottom" overlay={menu6}>
                        <BsThreeDotsVertical className="dropdown-icon" />
                      </Dropdown>
                    </div>
                  </div>
                  <p>
                    1 BCH = {bchdata?.market_data?.current_price?.usd}{" "}
                    <span>USD</span>
                  </p>
                </div>
                <div className="wallet-sub-2">
                  <p className="wallet-balance">{i18next.t("twallet66")}</p>
                  <p className="wallet-coin-value">
                    {" "}
                    {bchbalanceusd} <span>USD</span>{" "}
                  </p>
                  <p className="wallet-coin-value-eur">
                    {" "}
                    {bchbalanceeur} <span>EUR</span>{" "}
                  </p>
                  <p className="wallet-coin-value-1">{balancebch} BCH</p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <UserFooter />
      </div>
    </DocumentTitle>
  );
};

export default Wallet;
