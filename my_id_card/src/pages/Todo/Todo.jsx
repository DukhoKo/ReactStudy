import React from "react";
import { Header, Content } from "antd/es/layout/layout";
import { Col, Row, Typography, Breadcrumb, Layout, Menu } from "antd";
import Menus from "./Menus.jsx"

function Todo() {
    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center', background: '#fff' }}>
                <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]} />
            </Header>
            <Content>
                <Row>
                    <Col span={6}>
                        <Menus />
                    </Col>
                    <Col span={18}>
                        <Typography.Title type="secondary" level={2}>
                            리스트
                        </Typography.Title>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default Todo;