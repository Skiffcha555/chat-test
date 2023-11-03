import { useState, useEffect } from 'react';
import { useGetRoomsQuery, useGetMessagesQuery, useCreateMessageMutation, useCreateRoomMutation, useRoomsMessagesSubscription, useGetUserByEmailQuery } from '../generated/graphql';
import { Layout, Input, Button, List, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthProvider';

const { Header, Content } = Layout;
const { TextArea } = Input;

const ChatPage = () => {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { refetch: refetchRooms } = useGetRoomsQuery({
    onCompleted() {
      setSelectedRoom(1);
    }
  });
  const [createRoom] = useCreateRoomMutation();
  const { data: messagesData, refetch } = useGetMessagesQuery({
    variables: { data: { room_id: selectedRoom, orderBy: 'asc' } },
    skip: !selectedRoom,
  });
  const { data: newMessages } = useRoomsMessagesSubscription();
  const [createMessage] = useCreateMessageMutation();
  const { user } = useAuth();
  const { data: fullUser } = useGetUserByEmailQuery(
    {
      variables: {
        email: user?.email ? user?.email : ''
      }
    }
  )

  const scrollToBottom = (behavior: ScrollBehavior) => {
    window.scrollBy({
      top: document.documentElement.scrollHeight,
      behavior
    });
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedRoom) {
      try {
        await createMessage({
          variables: { data: { room_id: selectedRoom, text: newMessage } },
        });
        setNewMessage('');
        scrollToBottom('smooth');
      } catch (error) {
        console.log(error);
      }
    } else if (newMessage.trim() && !selectedRoom) {
      try {
        await createRoom({
          variables: {
            data: {
              name: 'room',
              users_ids: [1]
            }
          },
        })
        refetchRooms();
        scrollToBottom('smooth');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/login');
  };

  useEffect(() => {
    if (selectedRoom) {
      refetch();
    }
  }, [selectedRoom, refetch]);

  useEffect(() => {
    if (messagesData?.messages) {
      // @ts-ignore
      setMessages((v) => [...v, ...messagesData.messages]);
    }
  }, [messagesData?.messages]);

  useEffect(() => {
    if (newMessages) {
      // @ts-ignore
      setMessages((v) => [...v, newMessages.roomsMessages]);
    }
  }, [newMessages]);

  useEffect(() => {
    if (!newMessages) {
      scrollToBottom('auto');
    }
  }, [messages]);

  return (
    <Layout>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ position: 'fixed', width: '100%', height: 'auto', zIndex: 1, background: '#1890ff', color: 'white', textAlign: 'center' }}>
          <Row>
            <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: 16 }} span={4}>
              <div style={{ display: 'flex', lineHeight: 'normal' }}>
                <h4 style={{ margin: 0, marginRight: 6 }}>Email:</h4> {fullUser?.userByEmail.email}
              </div>
              <div style={{ display: 'flex', lineHeight: 'normal' }}>
                <h4 style={{ margin: 0, marginRight: 6 }}>Name:</h4> {fullUser?.userByEmail.name}
              </div>
            </Col>
            <Col span={18}></Col>
            <Col span={2}>
              <Button size='large' type="default" onClick={handleLogOut}>Log Out</Button>
            </Col>
          </Row>
        </Header>
        <Content style={{ marginTop: '64px' }}>
          <div style={{ minHeight: '80vh' }}>
            <Row>
              <Col span={6}></Col>
              <Col span={12} style={{ background: '#fff' }}>
                <Content>
                  <List
                    dataSource={messages}
                    renderItem={(item) => (
                      <List.Item
                        style={{
                          padding: 12,
                          // @ts-ignore
                          textAlign: item?.user?.email === user?.email ? 'right' : 'left'
                        }}
                      >
                        <List.Item.Meta
                          // @ts-ignore
                          title={item?.user?.email === user?.email ? 'Me' : item?.user?.name}
                          // @ts-ignore
                          description={item?.text}
                        />
                      </List.Item>
                    )}
                  />
                  <div style={{ position: 'sticky', bottom: 0, background: '#fff', padding: '10px', borderTop: '1px solid rgb(0 0 0 / 15%)' }}>
                    <TextArea rows={2} value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                      <Button style={{ width: '100%' }} size='large' type="primary" onClick={handleSendMessage}>Send</Button>
                    </div>
                  </div>
                </Content>
              </Col>
              <Col span={6}></Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ChatPage;
