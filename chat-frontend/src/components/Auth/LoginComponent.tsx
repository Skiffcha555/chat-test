import React, { useState } from 'react';
import { useLoginUserMutation } from '../../generated/graphql';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from './AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Row } from 'antd';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin } = useAuth()

  const [loginMutation] = useLoginUserMutation()

  const navigate = useNavigate()

  const onSubmit = async () => {
    const result = await loginMutation({
      variables: {
        data: {
          email,
          password,
        }
      }
    })
    handleLogin(result.data?.signIn.token || '')
    localStorage.setItem('token', result.data?.signIn.token || '')
    navigate('/')
  };

  return (
    <Row>
      <Col span={8}></Col>
      <Col span={8}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
        >
          <h1>Login</h1>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <Link to="/register">register now!</Link>
          </Form.Item>
        </Form></Col>
      <Col span={8}></Col>
    </Row>
  );
};

export default LoginComponent;
