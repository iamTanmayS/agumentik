import {
    AppstoreOutlined,
    DatabaseOutlined,
    LogoutOutlined,
    PlusOutlined,
    ShoppingCartOutlined,
    TagsOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Card, Col, Row, Spin, Tag, Typography } from "antd";
import { getUser, handleLogout } from "../services/auth";

import React from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

const { Title, Text } = Typography;

const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFwdG9wfGVufDB8fDB8fHww";

const Home = () => {
    const { products, loading } = useProducts();
    const navigate = useNavigate();
    const user = getUser();

    const onLogout = () => {
        handleLogout();
        navigate('/login');
    };

    if (loading) {
        return (
            <div style={{ ...styles.page, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Spin size="large" tip="Loading products..." />
            </div>
        );
    }
    return (
        <div style={styles.page}>
            {/* TOP NAV BAR */}
            <div style={styles.navbar}>
                <div style={styles.navLeft}>
                    <ShoppingCartOutlined style={styles.logo} />
                    <Title level={4} style={{ margin: 0, color: '#fff' }}>Agumentik</Title>
                </div>
                <div style={styles.navRight}>
                    <Badge count={products.length} style={{ backgroundColor: '#52c41a' }}>
                        <Avatar style={{ backgroundColor: '#fff', color: '#4f46e5' }}>
                            {user?.username?.charAt(0).toUpperCase()}
                        </Avatar>
                    </Badge>
                    <Text style={{ color: '#fff', marginLeft: 12, fontWeight: 500 }}>{user?.username}</Text>
                    <Button 
                        icon={<LogoutOutlined />} 
                        onClick={onLogout}
                        style={styles.logoutBtn}
                    >
                        Logout
                    </Button>
                </div>
            </div>

            <div style={styles.content}>
                {/* STATS CARDS */}
                <Row gutter={[20, 20]} style={{ marginBottom: 40 }}>
                    <Col xs={24} sm={8}>
                        <Card style={styles.statCard} bodyStyle={{ padding: '24px' }}>
                            <div style={styles.statContent}>
                                <div style={{ ...styles.iconBox, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                                    <AppstoreOutlined style={styles.statIconNew} />
                                </div>
                                <div>
                                    <Text style={styles.statLabel}>Total Products</Text>
                                    <Title level={2} style={{ margin: 0, color: '#1f2937' }}>{products.length}</Title>
                                </div>
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} sm={8}>
                        <Card style={styles.statCard} bodyStyle={{ padding: '24px' }}>
                            <div style={styles.statContent}>
                                <div style={{ ...styles.iconBox, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                                    <TagsOutlined style={styles.statIconNew} />
                                </div>
                                <div>
                                    <Text style={styles.statLabel}>Categories</Text>
                                    <Title level={2} style={{ margin: 0, color: '#1f2937' }}>
                                        {[...new Set(products.map((p) => p.category))].length}
                                    </Title>
                                </div>
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} sm={8}>
                        <Card style={styles.statCard} bodyStyle={{ padding: '24px' }}>
                            <div style={styles.statContent}>
                                <div style={{ ...styles.iconBox, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                                    <DatabaseOutlined style={styles.statIconNew} />
                                </div>
                                <div>
                                    <Text style={styles.statLabel}>Total Stock</Text>
                                    <Title level={2} style={{ margin: 0, color: '#1f2937' }}>
                                        {products.reduce((acc, p) => acc + p.quantity, 0)}
                                    </Title>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>

                {/* PRODUCTS HEADER */}
                <div style={styles.productsHeader}>
                    <div>
                        <Title level={3} style={{ margin: 0, color: '#1f2937' }}>Products Catalog</Title>
                        <Text style={{ color: '#6b7280' }}>Browse and manage your inventory</Text>
                    </div>
                    <Button
                        type="primary"
                        size="large"
                        icon={<PlusOutlined />}
                        style={styles.addButton}
                        onClick={() => navigate('/addproduct')}
                    >
                        Add Product
                    </Button>
                </div>

                {/* PRODUCTS GRID */}
                <Row gutter={[20, 20]}>
                    {products.map((product) => (
                        <Col key={product._id} xs={24} sm={12} lg={8} xl={6}>
                            <Card
                                hoverable
                                style={styles.productCard}
                                bodyStyle={{ padding: 0 }}
                                cover={
                                    <div style={styles.imageWrapper}>
                                        <img
                                            src={product.image || DEFAULT_IMAGE}
                                            alt={product.name}
                                            style={styles.productImage}
                                        />
                                        <div style={styles.imageOverlay}>
                                            <Tag color={product.quantity > 10 ? "success" : "error"} style={styles.stockBadge}>
                                                {product.quantity > 10 ? 'In Stock' : 'Low Stock'}
                                            </Tag>
                                        </div>
                                    </div>
                                }
                            >
                                <div style={styles.cardBody}>
                                    <Tag color="blue" style={styles.categoryTag}>{product.category}</Tag>
                                    <Title level={5} style={styles.productName} ellipsis={{ rows: 1 }}>
                                        {product.name}
                                    </Title>
                                    <div style={styles.priceRow}>
                                        <Text style={styles.price}>₹{product.price.toLocaleString()}</Text>
                                        <Text style={styles.stock}>{product.quantity} units</Text>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default Home;

const styles = {
    page: {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #dee3fcff 0%, #090112ff 100%)",
    },

    navbar: {
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        padding: '16px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    },

    navLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
    },

    logo: {
        fontSize: 28,
        color: '#fff',
    },

    navRight: {
        display: 'flex',
        alignItems: 'center',
        gap: 16,
    },

    logoutBtn: {
        background: 'rgba(255, 255, 255, 0.2)',
        border: 'none',
        color: '#fff',
        fontWeight: 500,
    },

    content: {
        padding: '40px',
        maxWidth: 1400,
        margin: '0 auto',
    },

    statCard: {
        borderRadius: 16,
        background: '#fff',
        border: 'none',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
    },

    statContent: {
        display: 'flex',
        alignItems: 'center',
        gap: 20,
    },

    iconBox: {
        width: 64,
        height: 64,
        borderRadius: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },

    statIconNew: {
        fontSize: 28,
        color: '#fff',
    },

    statLabel: {
        display: 'block',
        color: '#6b7280',
        fontSize: 14,
        marginBottom: 4,
    },

    productsHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        flexWrap: 'wrap',
        gap: 16,
    },

    addButton: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: 'none',
        borderRadius: 12,
        height: 44,
        fontWeight: 600,
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
    },

    productCard: {
        borderRadius: 16,
        overflow: 'hidden',
        border: 'none',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
    },

    imageWrapper: {
        position: 'relative',
        overflow: 'hidden',
        height: 200,
    },

    productImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.3s ease',
    },

    imageOverlay: {
        position: 'absolute',
        top: 12,
        right: 12,
    },

    stockBadge: {
        fontWeight: 600,
        fontSize: 12,
        padding: '4px 12px',
        border: 'none',
    },

    cardBody: {
        padding: 16,
    },

    categoryTag: {
        marginBottom: 8,
        borderRadius: 6,
        fontSize: 11,
        fontWeight: 600,
    },

    productName: {
        margin: '8px 0',
        color: '#1f2937',
        fontWeight: 600,
    },

    priceRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },

    price: {
        fontSize: 20,
        fontWeight: 700,
        color: '#667eea',
    },

    stock: {
        fontSize: 13,
        color: '#6b7280',
        fontWeight: 500,
    },
};
