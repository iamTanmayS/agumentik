import { ArrowLeftOutlined, PlusOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, InputNumber, Select, Typography, message } from "antd";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../services/api";
import { getToken } from "../services/auth";

const { Title, Text } = Typography;
const { Option } = Select;

const AddProduct = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const token = getToken();
            await addProduct(values, token);
            message.success('Product added successfully!');
            form.resetFields();
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>
            {/* HEADER */}
            <div style={styles.header}>
                <Button 
                    icon={<ArrowLeftOutlined />} 
                    onClick={() => navigate('/')}
                    style={styles.backBtn}
                >
                    Back to Home
                </Button>
            </div>

            <div style={styles.container}>
                {/* LEFT SIDE - INFO */}
                <div style={styles.leftSection}>
                    <div style={styles.iconBox}>
                        <ShoppingOutlined style={styles.icon} />
                    </div>
                    <Title level={2} style={styles.mainTitle}>
                        Add New Product
                    </Title>
                    <Text style={styles.subtitle}>
                        Fill in the details below to add a new product to your inventory. All fields are required.
                    </Text>
                    <div style={styles.features}>
                        <div style={styles.feature}>
                            <div style={styles.featureDot}></div>
                            <Text style={styles.featureText}>Real-time inventory updates</Text>
                        </div>
                        <div style={styles.feature}>
                            <div style={styles.featureDot}></div>
                            <Text style={styles.featureText}>Automatic stock tracking</Text>
                        </div>
                        <div style={styles.feature}>
                            <div style={styles.featureDot}></div>
                            <Text style={styles.featureText}>Category management</Text>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE - FORM */}
                <Card style={styles.card} bodyStyle={{ padding: 40 }}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label={<span style={styles.label}>Product Name</span>}
                            name="name"
                            rules={[{ required: true, message: "Product name is required" }]}
                        >
                            <Input
                                size="large"
                                placeholder="e.g., Wireless Mouse"
                                style={styles.input}
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span style={styles.label}>Category</span>}
                            name="category"
                            rules={[{ required: true, message: "Category is required" }]}
                        >
                            <Select
                                size="large"
                                placeholder="Select category"
                                style={styles.input}
                            >
                                <Option value="Electronics">Electronics</Option>
                                <Option value="Furniture">Furniture</Option>
                                <Option value="Accessories">Accessories</Option>
                                <Option value="Stationery">Stationery</Option>
                            </Select>
                        </Form.Item>

                        <div style={styles.row}>
                            <Form.Item
                                label={<span style={styles.label}>Price (₹)</span>}
                                name="price"
                                rules={[{ required: true, message: "Price is required" }]}
                                style={{ flex: 1 }}
                            >
                                <InputNumber
                                    size="large"
                                    style={{ ...styles.input, width: '100%' }}
                                    placeholder="0.00"
                                    min={0}
                                />
                            </Form.Item>

                            <Form.Item
                                label={<span style={styles.label}>Stock Quantity</span>}
                                name="stock"
                                rules={[{ required: true, message: "Stock is required" }]}
                                style={{ flex: 1 }}
                            >
                                <InputNumber
                                    size="large"
                                    style={{ ...styles.input, width: '100%' }}
                                    placeholder="0"
                                    min={0}
                                />
                            </Form.Item>
                        </div>

                        <Form.Item style={{ marginTop: 32, marginBottom: 0 }}>
                            <Button
                                type="primary"
                                size="large"
                                icon={<PlusOutlined />}
                                htmlType="submit"
                                block
                                loading={loading}
                                style={styles.submitBtn}
                            >
                                Add Product to Inventory
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default AddProduct;


const styles = {
    page: {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
    },

    header: {
        maxWidth: 1200,
        margin: "0 auto 20px",
    },

    backBtn: {
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        border: 'none',
        color: '#fff',
        fontWeight: 500,
    },

    container: {
        maxWidth: 1200,
        margin: "0 auto",
        display: "flex",
        gap: 40,
        alignItems: "center",
    },

    leftSection: {
        flex: 1,
        color: '#fff',
    },

    iconBox: {
        width: 80,
        height: 80,
        borderRadius: 20,
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },

    icon: {
        fontSize: 40,
        color: '#fff',
    },

    mainTitle: {
        color: '#fff',
        marginBottom: 16,
        fontSize: 42,
        fontWeight: 700,
    },

    subtitle: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 16,
        lineHeight: 1.6,
        display: 'block',
        marginBottom: 32,
    },

    features: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
    },

    feature: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
    },

    featureDot: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: '#fff',
    },

    featureText: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 15,
    },

    card: {
        flex: 1,
        maxWidth: 500,
        borderRadius: 24,
        border: "none",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    },

    label: {
        fontSize: 14,
        fontWeight: 600,
        color: '#374151',
    },

    input: {
        borderRadius: 12,
        border: '2px solid #e5e7eb',
    },

    row: {
        display: 'flex',
        gap: 16,
    },

    submitBtn: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: 'none',
        borderRadius: 12,
        height: 50,
        fontSize: 16,
        fontWeight: 600,
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
    },
};
