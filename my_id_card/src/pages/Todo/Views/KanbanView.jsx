import React, { useState } from "react";
import { Row, Col, Card, Typography, Tag, Button, Input, Select, Space } from "antd";

const { Title } = Typography;

const TAG_COLOR = {
  High: "red",
  Medium: "gold",
  Low: "blue",
};

const initialData = {
  todo: [
    { id: "1", title: "기획서 작성", tag: "High" },
    { id: "2", title: "UI 디자인", tag: "Medium" },
  ],
  doing: [
    { id: "3", title: "API 설계", tag: "Low" },
  ],
  done: [],
};

function KanbanView() {
  const [tasks, setTasks] = useState(initialData);
  const [newTitle, setNewTitle] = useState("");
  const [newTag, setNewTag] = useState("Medium");
  const [newColumn, setNewColumn] = useState("todo");

  const addTask = () => {
    if (!newTitle.trim()) return;
    const newTask = {
      id: Date.now().toString(),
      title: newTitle,
      tag: newTag,
    };
    setTasks(prev => ({
      ...prev,
      [newColumn]: [...prev[newColumn], newTask]
    }));
    setNewTitle("");
  };

  const removeTask = (colKey, taskId) => {
    setTasks(prev => ({
      ...prev,
      [colKey]: prev[colKey].filter(t => t.id !== taskId)
    }));
  };

  return (
    <div style={{ padding: "8px" }}>
      {/* 카드 추가 입력창 */}
      <Card style={{ marginBottom: 16 }}>
        <Space wrap>
          <Input
            placeholder="작업 제목"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ width: 200 }}
          />
          <Select
            value={newTag}
            onChange={setNewTag}
            style={{ width: 120 }}
            options={[
              { value: "High", label: "High" },
              { value: "Medium", label: "Medium" },
              { value: "Low", label: "Low" },
            ]}
          />
          <Select
            value={newColumn}
            onChange={setNewColumn}
            style={{ width: 150 }}
            options={[
              { value: "todo", label: "To Do" },
              { value: "doing", label: "In Progress" },
              { value: "done", label: "Done" },
            ]}
          />
          <Button type="primary" onClick={addTask}>추가</Button>
        </Space>
      </Card>

      {/* 칸반 컬럼 */}
      <Row gutter={16}>
        {[
          { key: "todo", title: "To Do" },
          { key: "doing", title: "In Progress" },
          { key: "done", title: "Done" }
        ].map(col => (
          <Col span={8} key={col.key}>
            <Card
              title={<Title level={4}>{col.title}</Title>}
              bordered
              style={{ minHeight: "300px" }}
            >
              {tasks[col.key].map(task => (
                <Card
                  key={task.id}
                  size="small"
                  style={{ marginBottom: 8 }}
                  extra={
                    <Button size="small" danger onClick={() => removeTask(col.key, task.id)}>
                      삭제
                    </Button>
                  }
                >
                  {task.title} <Tag color={TAG_COLOR[task.tag]}>{task.tag}</Tag>
                </Card>
              ))}
              {tasks[col.key].length === 0 && (
                <div style={{ color: "#999", textAlign: "center", padding: "16px 0" }}>
                  작업 없음
                </div>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default KanbanView;
