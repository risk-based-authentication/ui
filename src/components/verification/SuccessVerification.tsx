import React from "react";
import {
  Row,
  Col,
  Layout as AntdLayout,
  Card,
  Typography,
  Form,
  ConfigProvider,
  Button,
} from "antd";
import "../style/verificationStyle.css";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function SuccessVerification() {
  const CardTitle = (
    <div className="title-container">
      <Title level={2} className="title">
        Verified!
      </Title>
      <Text className="description-2">Verification Completed Successfully</Text>
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
                  <CheckCircleOutlined
                    style={{
                      color: "green",
                      justifyContent: "center",
                      alignItems: "top",
                      width: "100%",
                      height: "100%",
                      fontSize: "100px",
                    }}
                  />
                  <Title>{CardTitle}</Title>

                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    block
                    style={{
                      borderRadius: 15,
                      marginTop: 20,
                      backgroundColor: "#005B96",
                    }}
                  >
                    Go Back
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
