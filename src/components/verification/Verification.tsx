import React, { ChangeEvent, useState } from "react";
import {
  Row,
  Col,
  Layout as AntdLayout,
  Card,
  Typography,
  Form,
  Input,
  Button,
  ConfigProvider,
} from "antd";
import "../style/verificationStyle.css";

const { Title, Text } = Typography;

export default function Verification() {
  const CardTitle = (
    <div className="title-container">
      <Title level={2} className="title">
        Verification
      </Title>
      <Text className="description">Please enter the OTP</Text>
    </div>
  );

  const [verificationCodes, setVerificationCodes] = useState<string[]>(
    Array(6).fill("")
  );
  const inputRefs: React.RefObject<Input>[] = Array(6)
    .fill(null)
    .map(() => React.createRef<Input>());

  const handleInputChange = (value: string, index: number) => {
    const newVerificationCodes = [...verificationCodes];
    newVerificationCodes[index] = value;

    if (value && index < verificationCodes.length - 1) {
      inputRefs[index + 1].current?.focus();
    }

    setVerificationCodes(newVerificationCodes);
  };

  const handleInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace" && !verificationCodes[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

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
                  <Form.Item name="" label="" className="verification-code">
                    <Row
                      justify="center"
                      align="top"
                      style={{ height: "10vh" }}
                    >
                      <Col>
                        <div style={{ display: "flex", gap: "10px" }}>
                          {verificationCodes.map((code, index) => (
                            <Input
                              key={index}
                              ref={inputRefs[index]}
                              value={code}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handleInputChange(e.target.value, index)
                              }
                              onKeyDown={(
                                e: React.KeyboardEvent<HTMLInputElement>
                              ) => handleInputKeyDown(e, index)}
                              style={{
                                width: "45px",
                                height: "45px",
                                textAlign: "center",
                                borderRadius: 10,
                              }}
                              maxLength={1}
                              disabled
                            />
                          ))}
                        </div>
                      </Col>
                    </Row>
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
