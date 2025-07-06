import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#f2f2f2', minHeight: '100vh', padding: 24 }}>
      <Card
        style={{ borderRadius: 16, background: '#649FBF', color: '#fff', textAlign: 'center' }}
      >
        <Title level={1} style={{ color: '#fff', fontSize: '64px', marginBottom: 0 }}>404</Title>
        <Paragraph style={{ color: '#fff', fontSize: '20px', marginBottom: 24 }}>
          Página não encontrada
        </Paragraph>
        <Button
          icon={<ArrowLeftOutlined />}
          size="large"
          style={{ background: '#fff', color: '#649FBF', borderRadius: 8 }}
          onClick={() => navigate('/')}
        >
          Voltar para a Home
        </Button>
      </Card>
    </div>
  );
};

export default NotFound;
