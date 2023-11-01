import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import './index.css';
import App from './App';
import createApolloClient from './apollo/client';
// import 'antd/dist/antd.css'
import { ConfigProvider, theme } from 'antd'

const apolloClient = createApolloClient();

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <ConfigProvider theme={{
        algorithm: theme.defaultAlgorithm
      }}>
        <App />
      </ConfigProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

