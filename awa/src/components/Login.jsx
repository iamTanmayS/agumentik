import { Button, Card, Form, Input, Select, Typography, message } from "antd";
import { IdcardOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../services/auth";

const { Title, Text } = Typography;
const { Option } = Select;

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        const result = await handleLogin(values.name, values.password);
        setLoading(false);

        if (result.success) {
            message.success('Login successful!');
            navigate('/');
        } else {
            message.error(result.error);
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.glassContainer}>

                {/* LEFT SIDE – IMAGE */}
                <div style={styles.imageSection}>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7w9Jh0wAucczr-bSx_bqGiF1DB_JW2rxxGw&s"
                        alt="login visual"
                        style={styles.image}
                    />
                    <div style={styles.overlayText}>
                        <Title level={2} style={{ color: "#fff" }}>
                            Welcome Back
                        </Title>
                        <Text style={{ color: "#ddd" }}>
                            Agumentik Ecommerce Experience
                        </Text>
                    </div>
                </div>

                
                <Card style={styles.formSection} bordered={false}>
                    <Title level={3}>Login</Title>

                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: "Name is required" }]}
                        >
                            <Input
                                size="large"
                                prefix={<UserOutlined />}
                                placeholder="Enter your name"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: "Password is required" }]}
                        >
                            <Input.Password
                                size="large"
                                prefix={<LockOutlined />}
                                placeholder="Enter password"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Role"
                            name="role"
                            rules={[{ required: true, message: "Select your role" }]}
                        >
                            <Select
                                size="large"
                                placeholder="Select role"
                                prefix={<IdcardOutlined />}
                            >
                                <Option value="admin">Admin</Option>
                                <Option value="user">User</Option>
                                
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                block
                                loading={loading}
                                style={{ borderRadius: 8 }}
                            >
                                Continue
                            </Button>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="text"
                                block
                                size="large"
                                onClick={() => navigate("/signup")}
                                style={{
                                    color: "#475569",
                                    fontWeight: 500,
                                }}
                            >
                                New here? Create an account
                            </Button>
                        </Form.Item>

                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default Login;

const styles = {
    page: {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #654ea3, #eaafc8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    glassContainer: {
        width: "900px",
        height: "520px",
        display: "flex",
        borderRadius: 20,
        overflow: "hidden",
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(18px)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
    },

    imageSection: {
        flex: 1,
        position: "relative",
    },

    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },

    overlayText: {
        position: "absolute",
        bottom: 40,
        left: 40,
        maxWidth: 260,
    },

    formSection: {
        flex: 1,
        background: "rgba(255, 255, 255, 0.85)",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderRadius: 0,
    },
};
