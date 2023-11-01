import { useState, useEffect } from 'react';
import { useGetRoomsQuery, useGetMessagesQuery, useCreateMessageMutation, useCreateRoomMutation, useRoomsMessagesSubscription } from '../generated/graphql';
import { Layout, Menu, Input, Button, List } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Divider } from 'antd';
import { useAuth } from '../components/Auth/AuthProvider';

const { Sider, Content } = Layout;
const { TextArea } = Input;

const ChatPage = () => {
  const navigate = useNavigate()
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { data: roomsData, refetch: refetchRooms } = useGetRoomsQuery();
  const [createRoom] = useCreateRoomMutation()
  const { data: messagesData, refetch } = useGetMessagesQuery({
    variables: { data: { room_id: selectedRoom, orderBy: 'asc' } },
    skip: !selectedRoom,
  });
  const { data: newMessages } = useRoomsMessagesSubscription();
  const [createMessage] = useCreateMessageMutation();
  const { user } = useAuth()

  const handleRoomClick = (roomId: number | undefined) => {
    if (roomId) {
      setSelectedRoom(roomId);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedRoom) {
      await createMessage({
        variables: { data: { room_id: selectedRoom, text: newMessage } },
      });
      setNewMessage('');
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
      }).then(() => refetchRooms)
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  useEffect(() => {
    if (roomsData?.rooms?.length) {
      setSelectedRoom(1)
    }
  }, [roomsData?.rooms])

  useEffect(() => {
    if (selectedRoom) {
      refetch();
    }
  }, [selectedRoom, refetch]);

  useEffect(() => {
    if (messagesData?.messages) {
      // @ts-ignore
      setMessages((v) => [...v, ...messagesData?.messages])
    }
  }, [messagesData?.messages])

  useEffect(() => {
    if (newMessages) {
      // @ts-ignore
      setMessages((v) => [...v, newMessages.roomsMessages])
    }
  }, [newMessages])

  console.log(user);
  

  useEffect(() => {
    refetchRooms()
    refetch()
  }, [])

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider width={200} >
        <Menu mode="vertical"
          // @ts-ignore 
          selectedKeys={[selectedRoom]}>
          <Menu.Item onClick={() => handleRoomClick(roomsData?.rooms[0]?.id)}>
            {roomsData?.rooms[0]?.name}
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content>
          <List
            dataSource={messages}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  // @ts-ignore
                  title={item?.user?.name}
                  // @ts-ignore
                  description={item?.text}
                />
              </List.Item>
            )}
          />
          <div className="message-input" style={{ position: 'sticky', bottom: 0, background: '#fff', padding: '10px' }}>
            <TextArea rows={2} value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
            <Divider />
            <Button size='large' type="primary" onClick={handleSendMessage}>Send</Button>
          </div>
        </Content>
      </Layout>
      <Button type="primary" onClick={handleLogOut}>Log Out</Button>
    </Layout>
  );
};

export default ChatPage;
