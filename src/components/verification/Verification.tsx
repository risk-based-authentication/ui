import React, { ChangeEvent, useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/verificationStyle.css";

const { Title, Text } = Typography;
const apiUrl = "https://j3a4lvmip9.execute-api.eu-north-1.amazonaws.com/p";

export default function Verification() {
  const [verificationCodes, setVerificationCodes] = useState<string[]>(
    Array(6).fill("")
  );
  const [apiData, setApiData] = useState(null);
  const [id, setId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedId = localStorage.getItem("paymentId");
    setId(storedId);
  }, []);

  const getApiData = async (verificationCode: string): Promise<any> => {
    if (!id) {
      console.error("Payment ID is not available");
      return;
    }

    const requestBody = {
      input: JSON.stringify({ otp: verificationCode, id: id }),
      name: "x",
      stateMachineArn:
        "arn:aws:states:eu-north-1:915557972977:stateMachine:MyStateMachine-zuedwtw27",
    };

    try {
      const response = await axios.post(apiUrl + "/execution", requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
  const inputRefs: React.RefObject<Input>[] = Array(6)
    .fill(null)
    .map(() => React.createRef<Input>());

  const handleInputChange = (value: string, index: number) => {
    const newVerificationCodes = [...verificationCodes];
    newVerificationCodes[index] = value;
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

  const handleSubmit = async () => {
    const verificationCode = verificationCodes.join("");
    try {
      const data = await getApiData(verificationCode);
      setApiData(data.status);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const CardTitle = (
    <div className="title-container">
      <Title level={2} className="title">
        Verification
      </Title>
      <Text className="description">Please enter the OTP</Text>
    </div>
  );

  useEffect(() => {
    if (apiData === "SUCCEEDED") {
      navigate("/success");
    } else if (apiData === "FAILED") {
      navigate("/fail");
    }
  }, [apiData, navigate]);

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
                            />
                          ))}
                        </div>
                      </Col>
                    </Row>
                  </Form.Item>
                  <Button
                    onClick={handleSubmit}
                    type="primary"
                    size="large"
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
