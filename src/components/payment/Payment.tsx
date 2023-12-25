import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Layout as AntdLayout,
  Card,
  Typography,
  Form,
  Input,
  Button,
  Select,
  ConfigProvider,
} from "antd";
import "../style/paymentStyle.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Title, Text } = Typography;

const apiUrl = "https://j3a4lvmip9.execute-api.eu-north-1.amazonaws.com/p";

export const getApiData = async (cardNumber: string): Promise<any> => {
  const requestBody = {
    input: JSON.stringify({
      queryStringParameters: { cardNumber: cardNumber },
    }),
    name: "x",
    stateMachineArn:
      "arn:aws:states:eu-north-1:915557972977:stateMachine:MyStateMachine-2a361ayvt",
  };

  try {
    const response = await axios.post(
      `${apiUrl}/execution?cardNumber=${encodeURIComponent(cardNumber)}`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default function Payment() {
  const [form] = Form.useForm();
  const [apiData, setApiData] = useState(null);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const data = await getApiData(values.cardnumber);

      if (data && data.output) {
        const apires = JSON.parse(data.output);
        const id = apires.id;
        const status = apires.status;
        if (id) {
          localStorage.setItem("paymentId", id);
        }
        if (status) {
          setApiData(status);
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    if (apiData === "SUCCEEDED") {
      navigate("/success");
    } else if (apiData === "FAILED") {
      navigate("/verification");
    }
  }, [apiData, navigate]);

  const CardTitle = (
    <div className="title-container">
      <Title level={2} className="title">
        Payment
      </Title>
      <Text className="description">Please enter your card details</Text>
    </div>
  );

  const { Option } = Select;

  const years = Array.from(
    { length: 10 },
    (_, index) => new Date().getFullYear() + index
  );
  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#005B96",
          borderRadius: 2,

          colorBgContainer: "#f6ffed",
        },
      }}
    >
      <AntdLayout className="layout">
        <Row
          justify="center"
          align="middle"
          style={{
            height: "1010px",
            backgroundColor: "#FCFCFC",
          }}
        >
          <Col xs={22}>
            <div className="container">
              <Card
                title={CardTitle}
                headStyle={{ borderBottom: 0, marginTop: 12 }}
                className="highlighted-square"
              >
                <Form form={form} layout="vertical" onFinish={onFinish}>
                  <Form.Item
                    name="cardnumber"
                    label="Card Number"
                    style={{ fontWeight: "" }}
                  >
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item name="cardholder" label="Card Holder">
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item name="Expiration Date" label="Expiration Date">
                    <Form.Item noStyle>
                      <Row gutter={8}>
                        <Col span={8}>
                          <Form.Item noStyle>
                            <Select size="large" placeholder="Month">
                              {months.map((month) => (
                                <Option key={month} value={month}>
                                  {month}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>

                        <Col span={8}>
                          <Form.Item noStyle>
                            <Select size="large" placeholder="Year">
                              {years.map((year) => (
                                <Option key={year} value={year}>
                                  {year}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item>
                            <Input
                              maxLength={10}
                              size="large"
                              placeholder="CVV/CVC"
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form.Item>
                  </Form.Item>{" "}
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    block
                    style={{ borderRadius: 15, backgroundColor: "#005B96" }}
                  >
                    Submit
                  </Button>
                </Form>
              </Card>
            </div>
          </Col>
        </Row>
      </AntdLayout>
    </ConfigProvider>
  );
}
