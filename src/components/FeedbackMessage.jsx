import React from 'react';
import { Card, Typography, Space } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

const cores = {
  sucesso: { color: '#52c41a', background: '#f6ffed', borderColor: '#b7eb8f', icon: <CheckCircleOutlined /> },
  erro: { color: '#ff4d4f', background: '#fff1f0', borderColor: '#ffa39e', icon: <CloseCircleOutlined /> },
  aviso: { color: '#faad14', background: '#fffbe6', borderColor: '#ffe58f', icon: <ExclamationCircleOutlined /> },
};

const FeedbackMessage = ({ tipo, mensagem }) => {
  const style = cores[tipo] || {
    color: '#595959',
    background: '#fafafa',
    borderColor: '#d9d9d9',
    icon: null,
  };

  return (
    <Card
      size="small"
      bordered={true}
      style={{
        backgroundColor: style.background,
        borderLeft: `6px solid ${style.borderColor}`,
        marginBottom: 16,
        borderRadius: 8,
        boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
      }}
    >
      <Space>
        <span style={{ color: style.color, fontSize: 24 }}>
          {style.icon}
        </span>
        <Text style={{ color: style.color, fontWeight: 600 }}>
          {mensagem}
        </Text>
      </Space>
    </Card>
  );
};

export default FeedbackMessage;
