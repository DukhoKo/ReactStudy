import React, {useState} from "react";
import { Header, Content } from "antd/es/layout/layout";
import { Col, Row, Typography, Breadcrumb, Layout, Menu } from "antd";
import Menus from "./Menus.jsx"
import ListView from "./Views/ListView.jsx";
import KanbanView from "./Views/KanbanView.jsx";
//import CalendarView from "./Views/CalendarView.jsx";
//import ChartView from "./Views/ChartView.jsx";

function Todo() {
    const [selectedMenu, setSelectedMenu] = useState("list");

    const ContentView = () => {
        switch (selectedMenu) {
        case "kanban": return <KanbanView />;
        case "calendar": return <CalendarView />;
        case "chart": return <ChartView />;
        default: return <ListView />;
        }
    };

    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center', background: '#fff',  padding: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: selectedMenu }]} />
            </Header>
            <Content style={{padding: '16px'}}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Menus onMenuClick={setSelectedMenu}/>
                    </Col>
                    <Col span={18}>
                        {selectedMenu === "list" && <ListView />}
                        {selectedMenu === "kanban" && <KanbanView />}
                        {/* {selectedMenu === "calendar" && <CalendarView />}
                        {selectedMenu === "chart" && <ChartView />} */}
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default Todo;