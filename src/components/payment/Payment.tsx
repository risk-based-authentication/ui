import React from "react";
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
import "./style.css";

const { Title, Text } = Typography;

export default function Payment() {
  const CardTitle = (
    <div className="title-container">
      <Title level={2} className="title">
        Payment
      </Title>
      <Text className="subtitle">Please enter your card details</Text>
    </div>
  );

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
                <Form
                  layout="vertical"
                  requiredMark={false}
                  initialValues={{
                    remember: false,
                  }}
                >
                  <Form.Item
                    name="cardnumber"
                    label="Card Number"
                    style={{ fontWeight: "" }}
                  >
                    <Input size="large" disabled />
                  </Form.Item>
                  <Form.Item name="cardholder" label="Card Holder">
                    <Input size="large" disabled />
                  </Form.Item>

                  <Form.Item name="Expiration Date" label="Expiration Date">
                    <Form.Item noStyle>
                      <Row gutter={8}>
                        <Col span={8}>
                          <Form.Item noStyle>
                            <Select size="large" placeholder="Month" disabled />
                          </Form.Item>
                        </Col>

                        <Col span={8}>
                          <Form.Item noStyle>
                            <Select size="large" placeholder="Year" disabled />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item>
                            <Input
                              maxLength={10}
                              size="large"
                              placeholder="CVV/CVC"
                              disabled
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form.Item>
                  </Form.Item>
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
