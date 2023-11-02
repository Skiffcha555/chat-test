import { useState, useEffect } from 'react';
import { useGetRoomsQuery, useGetMessagesQuery, useCreateMessageMutation, useCreateRoomMutation, useRoomsMessagesSubscription } from '../generated/graphql';
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

  const scrollToBottom = () => {
    window.scrollBy({
      top: 10000,
      left: 0, 
      behavior: 'smooth'
    });
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedRoom) {
      await createMessage({
        variables: { data: { room_id: selectedRoom, text: newMessage } },
      });
      setNewMessage('');
      scrollToBottom();
    } else if (newMessage.trim() && !selectedRoom) {
      createRoom({
        variables: {
          data: {
            name: 'room',
            users_ids: [1]
          }
        },
        context: {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
          },
        }
      }).then(() => {
        refetchRooms();
        scrollToBottom();
      })
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
    refetchRooms();
    refetch();
  }, []);

  return (
    <Layout>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ position: 'fixed', width: '100%', zIndex: 1, background: '#1890ff', color: 'white', textAlign: 'center' }}>
          <Button size='large' type="default" onClick={handleLogOut}>Log Out</Button>
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
                          textAlign: item?.user?.name === user?.email ? 'right' : 'left' 
                        }}
                      >
                        <List.Item.Meta
                          // @ts-ignore
                          title={item?.user?.name === user?.email ? 'Me' : item?.user?.name}
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
