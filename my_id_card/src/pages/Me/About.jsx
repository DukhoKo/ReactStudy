import React, { useState } from 'react';
import { Row, Col, Typography, Timeline, Divider, Descriptions, Badge, Alert, Calendar, Avatar } from "antd";
import dayjs from 'dayjs';
import Tech from './Tech.jsx';
import MapSection from './MapSection.jsx'; // 경로는 상황에 맞게 수정

const career = [
  {
    period: '2018-09-02 ~ 2023-04-30',
    company: 'PnpSoft',
    tasks: ['애자일 업무 협업 플랫폿 개발','급식 재료 관리 및 메뉴 자동 추천 웹/앱 개발']
  },
  {
    period: '2023-05-01 ~ 2024-08-31',
    company: 'DataStreams',
    tasks: ['근로복지공단 산재보험료율 시뮬레이션 시스템 고도화 사업','국방부 AI 데이터 플랫폼 구축 사업','베트남 비대면 원격진료 플랫폼 구축']
  },
  {
    period: '2024-09-02 ~ ',
    company: 'Woongjin',
    tasks: ['BMW CCB 프로젝트','EU KIA MyService']
  }
];

const timelineItems = career.map((item) => ({
  label: item.period,
  children: (
    <>
      <strong>{item.company}</strong>
      <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
        {item.tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </>
  ),
}));

function About() {
  const [value, setValue] = useState(() => dayjs('1992-12-28'));
  
  const onSelect = newValue => {
    setValue(newValue);
  };
  const onPanelChange = newValue => {
    setValue(newValue);
  };
  
  const introduces = [
    { key: '1', label: 'Picture', children: (
        <Avatar
          src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA4MTZfNzcg%2FMDAxNjkyMTY1NDAyNzA4._QoCBoyO8lfzan2BC6btQT3Erly8hgZDdxV2-6ZINYIg.PDXYtAp-APbB828eSwpQieW1V1Ar2Z_DD3n9ZeOpyXQg.PNG.whdpcks1%2Fimage.png&type=a340"
          size={100}
          shape="circle"
          alt="Profile"
        />
      ),
    },
    { key: '2', label: 'Name', children: 'Dukho KO' },
    { key: '3', label: 'Age', children: '34' },
    { key: '4', label: 'Email', children: 'dukho.ko@woongjin.co.kr', span: 2 },
    {
      key: '5',
      label: 'Status',
      children: <Badge status="processing" text="Running" />,
      span: 2,
    },
    { key: '6', label: 'Phone', children: '010-9734-1550' },
    { key: '7', label: 'Address', children: 'Seoul, South Korea' },
    { key: '8', label: 'Birth Date', children: <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} fullscreen={false} style={{ width: 300 }}/>, span: 2, },
    {
      key: '11',
      label: 'Career',
      children: (
        <Timeline
          mode="left"
          items={timelineItems}
          style={{ marginTop: '8px', marginBottom: '8px' }}
        />
      ),
      span: 2,
    },
    { key: '12', label: 'Tech Stack', 
      children: (
        <Tech />
      )
    }
  ];

  return (
    <>
      <Divider plain>
        <Typography.Title type="secondary" level={4}>
          Introduce Myself
        </Typography.Title>
      </Divider>

      <Row style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Descriptions title="Dukho Ko - Profile" bordered items={introduces} column={2} labelStyle={{ width: 120 }} contentStyle={{ whiteSpace: 'normal' }} />
        </Col>
      </Row>

      <Divider plain>
        <Typography.Title type="secondary" level={4}>
          여행지
        </Typography.Title>
      </Divider>

      <Row style={{ marginBottom: 24 }}>
        <Col span={24}>
          <MapSection />
        </Col>
      </Row>
    </>
  );
}

export default About;
