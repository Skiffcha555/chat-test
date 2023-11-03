import React, { useState } from 'react';
import { useRegisterUserMutation } from '../../generated/graphql';
import { Form, Input, Button, Alert } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Row } from 'antd';

const RegisterComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const [registerMutation, { error }] = useRegisterUserMutation();

  let errorMessage = null;
  if (error && error.graphQLErrors && error.graphQLErrors[0]) {
    errorMessage = error.graphQLErrors[0].message;
  }

  const onSubmit = async () => {
    try {
      await registerMutation({
        variables: {
          data: {
            name,
            email,
            password,
          },
        },
      });
      navigate('/login')
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
                name="register"
                initialValues={{ remember: true }}
                onFinish={onSubmit}
              >
                <h1 style={{ color: 'black', textAlign: 'center' }}>Register</h1>
                <Form.Item
                  name="name"
                  rules={[{ required: true, message: 'Please input your Name!' }]}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                  <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
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
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8
                  }}>
                    <Button type="primary" htmlType="submit" style={{ marginRight: 5 }} className="register-form-button">
                      Register
                    </Button>
                    <Link style={{ textAlign: 'center' }} to="/login">Login</Link>
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

export default RegisterComponent;
