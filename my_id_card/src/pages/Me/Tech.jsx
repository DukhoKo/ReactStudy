import React from "react";
import { Typography, Tag, Divider } from "antd";
import {CodeOutlined, Html5Outlined, DatabaseOutlined} from '@ant-design/icons';

const { Title, Text } = Typography;

const techStack = {
  Frontend: [
    { name: "Vue.js", color: "cyan" },
    { name: "React.js", color: "blue" },
    { name: "HTML", color: "magenta", icon: <Html5Outlined /> },
    { name: "JavaScript", color: "green" },
  ],
  Backend: [
    { name: "Spring", color: "geekblue" },
    { name: "JPA", color: "purple" },
    { name: "QueryDsl", color: "lime" },
  ],
  Database: [
    { name: "MySQL", color: "gold", icon: <DatabaseOutlined /> },
    { name: "Oracle", color: "volcano" },
    { name: "PostgreSQL", color: "lime" },
  ],
};

function Tech() {
  return (
    <>
      {Object.entries(techStack).map(([category, items]) => (
        <div key={category}>
          <Text strong>{category}</Text>
          <div style={{ marginTop: 4 }}>
            {items.map((tech) => (
              <Tag icon={tech.icon} key={tech.name} color={tech.color} style={{ marginBottom: 4 }}>
                {tech.name}
              </Tag>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default Tech;
