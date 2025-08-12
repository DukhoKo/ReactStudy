import React, { useEffect, useState } from "react";
import { Table } from "antd";

function ListView() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // 가이드대로 fetch 사용, 상위 20개만
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=20")
      .then((res) => res.json())
      .then((todos) => {
        console.log("원본 todos 데이터:", todos); 
        // 테이블 컬럼에 맞게 간단히 매핑
        const mapped = todos.map((t) => ({
          key: String(t.id),
          name: t.title,
          status: t.completed ? "완료" : "진행중",
          "due date": "",                   
        }));
        setRows(mapped);
      })
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { key: "title", title: "Title", dataIndex: "name" },
    { key: "status", title: "Status", dataIndex: "status" },
    { key: "due date", title: "Due date", dataIndex: "due date", render: v => v || "-" },
  ];

  return (
    <Table
      dataSource={rows}
      columns={columns}
      loading={loading}
      scroll={{ x: "max-content" }}
      style={{ width: "100%" }}
      size="middle"
    />
  );
}

export default ListView;
