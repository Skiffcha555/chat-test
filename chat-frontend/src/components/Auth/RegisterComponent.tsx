import React, { useState } from 'react';
import { useRegisterUserMutation } from '../../generated/graphql';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Row } from 'antd';

const RegisterComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const [registerMutation] = useRegisterUserMutation();

  const onSubmit = async () => {
    await registerMutation({
      variables: {
        data: {
          name,
          email,
          password,
        },
      },
    });
    window.alert('Succesful, please login!')
    navigate('/login')
  };

  return (
    <Row>
      <Col span={8}></Col>
      <Col span={8}>
        <Form
          name="register"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
        >
          <h1>Register</h1>
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
            <Button type="primary" htmlType="submit" className="register-form-button">
              Register
            </Button>
            Or <Link to="/login">log in now!</Link>
          </Form.Item>
        </Form>
      </Col>
      <Col span={8}></Col>
    </Row>

  );
};

export default RegisterComponent;
