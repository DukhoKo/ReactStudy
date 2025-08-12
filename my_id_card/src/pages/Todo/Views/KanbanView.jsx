import React, { useEffect, useState } from "react";
import { Row, Col, Card, Typography, Button, Input, Select, Space, message } from "antd";

const { Title } = Typography;

function KanbanView() {
  const [tasks, setTasks] = useState({ inProgress: [], done: [] });
  const [loading, setLoading] = useState(false);

  // 새 카드 추가용(간단)
  const [newTitle, setNewTitle] = useState("");
  const [newStatus, setNewStatus] = useState("inProgress"); // inProgress | done

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=20")
      .then((res) => res.json())
      .then((todos) => {
        console.log("Kanban 원본 todos:", todos); 

        const mapped = todos.map((t) => ({
          id: String(t.id),
          title: t.title,
          completed: t.completed,
        }));

        setTasks({
          inProgress: mapped.filter((t) => !t.completed),
          done: mapped.filter((t) => t.completed),
        });
      })
      .catch(() => message.error("데이터를 불러오는 중 오류가 발생했어요."))
      .finally(() => setLoading(false));
  }, []);

  const addTask = () => {
    if (!newTitle.trim()) return;
    const item = { id: Date.now().toString(), title: newTitle, completed: newStatus === "done" };
    setTasks((prev) => ({
      inProgress: newStatus === "inProgress" ? [...prev.inProgress, item] : prev.inProgress,
      done: newStatus === "done" ? [...prev.done, item] : prev.done,
    }));
    setNewTitle("");
  };

  const removeTask = (colKey, id) => {
    setTasks((prev) => ({
      ...prev,
      [colKey]: prev[colKey].filter((t) => t.id !== id),
    }));
  };

  return (
    <div style={{ padding: 8 }}>
      {/* 카드 추가 (아주 단순 버전) */}
      <Card style={{ marginBottom: 16 }}>
        <Space wrap>
          <Input
            placeholder="작업 제목"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ width: 240 }}
          />
          <Select
            value={newStatus}
            onChange={setNewStatus}
            style={{ width: 140 }}
            options={[
              { value: "inProgress", label: "진행중" },
              { value: "done", label: "완료" },
            ]}
          />
          <Button type="primary" onClick={addTask}>추가</Button>
        </Space>
      </Card>

      {/* 진행중 / 완료 두 컬럼 */}
      <Row gutter={16}>
        {[
          { key: "inProgress", title: "진행중" },
          { key: "done", title: "완료" },
        ].map((col) => (
          <Col span={12} key={col.key}>
            <Card
              title={<Title level={4} style={{ margin: 0 }}>{col.title}</Title>}
              bordered
              loading={loading}
              style={{ minHeight: 320 }}
            >
              {tasks[col.key].map((task) => (
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
                  {task.title}
                </Card>
              ))}
              {tasks[col.key].length === 0 && !loading && (
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
