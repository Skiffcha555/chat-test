import React, { useState } from 'react';
import { useLoginUserMutation } from '../../generated/graphql';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from './AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Row, Alert } from 'antd';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin } = useAuth()

  const [loginMutation, { error }] = useLoginUserMutation()

  let errorMessage = null;
  if (error && error.graphQLErrors && error.graphQLErrors[0]) {
    errorMessage = error.graphQLErrors[0].message;
  }

  const navigate = useNavigate()

  const onSubmit = async () => {
    try {
      const result = await loginMutation({
        variables: {
          data: {
            email,
            password,
          }
        }
      })
      handleLogin(result.data?.signIn.token || '', email)
      localStorage.setItem('token', result.data?.signIn.token || '')
      localStorage.setItem('email', email)
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
      <div style={{ width: '70%' }}>
        <Row>
          <Col span={8}></Col>
          <Col span={8}>
            <div style={{ background: 'white', padding: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '5px' }}>
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onSubmit}
              >
                <h1 style={{ color: 'black', textAlign: 'center' }}>Login</h1>
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: 'Please input your email!' }]}
                >
                  <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                  <Input
                    prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Form.Item>
                <Form.Item>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8
                  }}>
                    <Button type="primary" htmlType="submit" style={{ marginRight: 5 }}>
                      Log in
                    </Button>
                    <Link style={{ textAlign: 'center' }} to="/register">Registration</Link>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </Col>
          <Col span={8}>
          </Col>
        </Row>
      </div>
      {error ? <Alert
        message={errorMessage}
        style={{ position: 'absolute', top: 20, right: 20 }}
        type={"error"}
        closable
      /> : ''}
    </div>
  );
};

export default LoginComponent;
