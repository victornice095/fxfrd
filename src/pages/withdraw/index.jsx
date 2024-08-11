import React, { useState, useEffect } from "react";
import "./style.css";
import i18next from "i18next";
import { Select, Form, Input, InputNumber, Button } from "antd";
import { useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import Spinner from "react-bootstrap/Spinner";
import DocumentTitle from "react-document-title";
import { SiCashapp } from "react-icons/si";
import { BsPaypal } from "react-icons/bs";
import { SiBitcoinsv } from "react-icons/si";

const { Option } = Select;
const { Item } = Form;

const Withdraw = () => {
  const [form] = Form.useForm();

  const [amount, setAmount] = useState();
  const [busy, setBusy] = useState(false);
  const [isCrypto, setIsCrypto] = useState(false);
  const [isPaypal, setIsPaypal] = useState(false);
  const [isCashapp, setIsCashapp] = useState(false);

  const [withdrawalData, setWithdrawalData] = useState([]);

  const { user } = useSelector((state) => state.auth);

  const location = useLocation();

  const { BTC, ETH, BNB, USDT, LTC, BCH } = user?.user;
  const withdrawProfit =
    BTC?.profit +
    USDT?.profit +
    ETH?.profit +
    BNB?.profit +
    LTC?.profit +
    BCH?.profit +
    BTC?.bonus +
    ETH?.bonus +
    BNB?.bonus +
    USDT?.bonus +
    LTC?.bonus +
    BCH?.bonus;

  const onMethodSelect = (value) => {
    switch (value) {
      case "crypto":
        setIsCrypto(true);
        setIsPaypal(false);
        setIsCashapp(false);
        break;

      case "paypal":
        setIsPaypal(true);
        setIsCrypto(false);
        setIsCashapp(false);
        break;
      case "cashapp":
        setIsCashapp(true);
        setIsPaypal(false);
        setIsCrypto(false);
        break;

      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchWithdrawalData = async () => {
      setBusy(true);
      try {
        const res = await axios.get(
          process.env.REACT_APP_BASE_URI +
            `/auth/withdrawals/${user?.user?.id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        setBusy(false);
        setWithdrawalData(res.data);
      } catch (error) {
        if (error?.response?.data) {
          const { data } = error.response;
          if (!data.success) {
            toast.error(data.msg);
          }

          return console.log(error.response.data);
        }
        console.log(error);
      }
      setBusy(false);
    };
    fetchWithdrawalData();
  }, [user?.token, user?.user?.id]);

  const onFinish = async (values) => {
    let newValues = { ...values, email: user?.user?.email };
    setBusy(true);
    try {
      await axios.post(
        process.env.REACT_APP_BASE_URI + `/auth/withdrawal/${user?.user?.id}`,
        newValues,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setBusy(false);
      toast.success(i18next.t("twithdraw88"));
      form.resetFields();
    } catch (error) {
      if (error?.response?.data) {
        const { data } = error.response;
        if (!data.success) {
          toast.error(data.msg);
        }
        setBusy(false);
        form.resetFields();

        return console.log(error.response.data);
      }

      setBusy(false);
      form.resetFields();

      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <DocumentTitle title="Withdraw Funds | Binance FX Trading">
      <div className="withdraw-main">
        <Form
          form={form}
          initialValues={{
            coin: location?.state?.from
              ? location?.state?.from
              : i18next.t("twithdraw90"),
            type: [i18next.t("tnuser28")],
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className="withdraw-main-1">
            <Item
              className="withdraw-form-item withdraw-select-item"
              name="type"
            >
              <Select
                className="deposit-select"
                optionFilterProp="children"
                onChange={onMethodSelect}
              >
                <Option value="crypto">
                  <SiBitcoinsv />
                  {i18next.t("tnuser29")}
                </Option>
                <Option value="paypal">
                  <BsPaypal />
                  {i18next.t("tnuser30")}
                </Option>
                <Option value="cashapp">
                  <SiCashapp />
                  {i18next.t("tnuser31")}
                </Option>
              </Select>
            </Item>
          </div>
          {isCrypto && (
            <div className="withdraw-main-1">
              <div className="withdraw-main-1-1">
                <Item
                  className="withdraw-amount-form-item withdraw-form-item"
                  name="amount"
                  rules={[
                    {
                      required: true,
                      message: [i18next.t("twithdraw91")],
                    },
                  ]}
                >
                  <InputNumber
                    min={1000}
                    addonAfter="$"
                    className="withdraw-amount-form-input"
                    placeholder={i18next.t("twithdraw92")}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Item>
                <Item
                  className="withdraw-form-item withdraw-select-item"
                  name="coin"
                  rules={[
                    {
                      required: true,
                      message: [i18next.t("twithdraw93")],
                    },
                  ]}
                >
                  <Select
                    className="deposit-select"
                    optionFilterProp="children"
                  >
                    <Option value="bitcoin">
                      <img
                        src="https://i.imgur.com/Lh9hdU2.png"
                        alt="bitcoin"
                        className="crypto-coin-logo"
                      />
                      Bitcoin
                    </Option>
                    <Option value="ethereum">
                      <img
                        src="https://i.imgur.com/VSGKPLd.png"
                        alt="etheruem"
                        className="crypto-coin-logo"
                      />
                      Etheruem
                    </Option>
                    <Option value="binancecoin">
                      <img
                        src="https://i.imgur.com/zxO0qlv.png"
                        alt="binance coin"
                        className="crypto-coin-logo"
                      />
                      Binance coin
                    </Option>
                    <Option value="tether">
                      <img
                        src="https://i.imgur.com/Sjieype.png"
                        alt="tether"
                        className="crypto-coin-logo"
                      />
                      Tether
                    </Option>
                    <Option value="litecoin">
                      <img
                        src="https://i.imgur.com/RsAjmtR.png"
                        alt="litecoin"
                        className="crypto-coin-logo"
                      />
                      Litecoin
                    </Option>
                    <Option value="bitcoincash">
                      <img
                        src="https://i.imgur.com/QrVLidk.png"
                        alt="bitcoin cash"
                        className="crypto-coin-logo"
                      />
                      Bitcoin cash
                    </Option>
                  </Select>
                </Item>
                <Item
                  className="withdraw-form-item"
                  name="walletAddress"
                  rules={[
                    {
                      type: "string",
                    },
                    {
                      required: true,
                      message: [i18next.t("twithdraw94")],
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    className="withdraw-form-input"
                    placeholder={i18next.t("twithdraw95")}
                  />
                </Item>
                <Item className="withdraw-form-item" name="comment">
                  <Input
                    className="withdraw-form-input"
                    placeholder={i18next.t("twithdraw96")}
                  />
                </Item>
              </div>
            </div>
          )}
          {isPaypal && (
            <div className="withdraw-main-1">
              <div className="withdraw-main-1-1">
                <Item
                  className="withdraw-amount-form-item withdraw-form-item"
                  name="amount"
                  rules={[
                    {
                      required: true,
                      message: [i18next.t("twithdraw91")],
                    },
                  ]}
                >
                  <InputNumber
                    min={2000}
                    addonAfter="$"
                    className="withdraw-amount-form-input"
                    placeholder={i18next.t("twithdraw92")}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Item>
                <Item
                  className="withdraw-form-item"
                  name="details"
                  rules={[
                    {
                      type: "string",
                    },
                    {
                      required: true,
                      message: [i18next.t("tnuser13")],
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    className="withdraw-form-input"
                    placeholder={i18next.t("tnuser14")}
                  />
                </Item>
                <Item className="withdraw-form-item" name="comment">
                  <Input
                    className="withdraw-form-input"
                    placeholder={i18next.t("twithdraw96")}
                  />
                </Item>
              </div>
            </div>
          )}
          {isCashapp && (
            <div className="withdraw-main-1">
              <div className="withdraw-main-1-1">
                <Item
                  className="withdraw-amount-form-item withdraw-form-item"
                  name="amount"
                  rules={[
                    {
                      required: true,
                      message: [i18next.t("twithdraw91")],
                    },
                  ]}
                >
                  <InputNumber
                    min={2000}
                    addonAfter="$"
                    className="withdraw-amount-form-input"
                    placeholder={i18next.t("twithdraw92")}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Item>
                <Item
                  className="withdraw-form-item"
                  name="details"
                  rules={[
                    {
                      type: "string",
                    },
                    {
                      required: true,
                      message: [i18next.t("tnuser15")],
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    className="withdraw-form-input"
                    placeholder={i18next.t("tnuser16")}
                  />
                </Item>
                <Item className="withdraw-form-item" name="comment">
                  <Input
                    className="withdraw-form-input"
                    placeholder={i18next.t("twithdraw96")}
                  />
                </Item>
              </div>
            </div>
          )}
          <div className="withdraw-main-new">
            {withdrawProfit < 1000 && (
              <div>
                <p className="deposit-short-note">
                  {i18next.t("twithdraw101")}
                </p>
              </div>
            )}
            <Item
              shouldUpdate
              className="withraw-button-item"
              wrapperCol={{
                span: 6,
              }}
            >
              {() => (
                <Button
                  className="withdraw-button"
                  htmlType="submit"
                  disabled={
                    withdrawProfit < 50 ||
                    amount > withdrawProfit ||
                    busy ||
                    !!form
                      .getFieldsError()
                      .filter(({ errors }) => errors.length).length
                  }
                >
                  {busy && (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  )}{" "}
                  &nbsp; {i18next.t("twithdraw102")}
                </Button>
              )}
            </Item>
          </div>
        </Form>
        <div className="withdraw-table">
          <h4>{i18next.t("twithdraw103")}</h4>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th className="invest-head">S/N</th>
                <th className="invest-head">{i18next.t("tnuser17")}</th>

                <th className="invest-head">{i18next.t("twithdraw104")}</th>

                <th className="invest-head">{i18next.t("twithdraw105")}</th>

                <th className="invest-head">{i18next.t("tnuser18")}</th>

                <th className="invest-head">{i18next.t("twithdraw107")}</th>
                <th className="invest-head">{i18next.t("twithdraw108")}</th>
                <th className="invest-head">{i18next.t("twithdraw109")}</th>
              </tr>
            </thead>
            <tbody>
              {withdrawalData?.map((withdrawal, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="table-data-1">{withdrawal?.type}</td>
                  <td className="table-data-1">{withdrawal?.coin}</td>
                  <td>${withdrawal?.amount} </td>
                  <td>{withdrawal?.walletAddress || withdrawal?.details}</td>
                  <td>{withdrawal?.status}</td>
                  <td className="table-data">{withdrawal?.reference}</td>
                  <td>
                    {moment(withdrawal?.createdAt).format(
                      "YYYY-MM-DD HH:MM:SS"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </DocumentTitle>
  );
};

export default Withdraw;
