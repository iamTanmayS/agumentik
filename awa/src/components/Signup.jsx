import { Button, Card, Form, Input, Select, Typography, message } from "antd";
import { IdcardOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import React, { useState } from "react";

import { handleSignup } from "../services/auth";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { Option } = Select;

const Signup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        const result = await handleSignup(values.name, values.password, values.role);
        setLoading(false);

        if (result.success) {
            message.success('Account created successfully!');
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
                        alt="signup visual"
                        style={styles.image}
                    />
                    <div style={styles.overlayText}>
                        <Title level={2} style={{ color: "#fff" }}>
                            Join Us
                        </Title>
                        <Text style={{ color: "#cbd5f5" }}>
                            Create your account and get started
                        </Text>
                    </div>
                </div>

                {/* RIGHT SIDE – FORM */}
                <Card style={styles.formSection} bordered={false}>
                    <Title level={3}>Create Account</Title>
                    <Text type="secondary" style={{ marginBottom: 24, display: "block" }}>
                        It only takes a minute
                    </Text>

                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: "Name is required" }]}
                        >
                            <Input
                                size="large"
                                prefix={<UserOutlined />}
                                placeholder="Your full name"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: "Password is required" },
                                { min: 6, message: "Minimum 6 characters" },
                            ]}
                        >
                            <Input.Password
                                size="large"
                                prefix={<LockOutlined />}
                                placeholder="Create a password"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Role"
                            name="role"
                            rules={[{ required: true, message: "Select a role" }]}
                        >
                            <Select size="large" placeholder="Choose your role">
                                <Option value="user">User</Option>
                                
                                <Option value="admin">Admin</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                htmlType="submit"
                                size="large"
                                block
                                loading={loading}
                                style={{
                                    borderRadius: 8,
                                    background: "#6366f1",
                                    color: "#fff",
                                }}
                            >
                                Sign Up
                            </Button>
                        </Form.Item>

                        <Text
                            type="secondary"
                            style={{ textAlign: "center", display: "block", margin: "12px 0" }}
                        >
                            — already have an account? —
                        </Text>

                        <Button
                            type="text"
                            block
                            size="large"
                            onClick={() => navigate("/login")}
                            style={{ color: "#475569", fontWeight: 500 }}
                        >
                            Go to Login
                        </Button>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default Signup;

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
        background: "rgba(255, 255, 255, 0.9)",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderRadius: 0,
    },

};
