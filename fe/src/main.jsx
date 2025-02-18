import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './styles/main.css';
import { ConfigProvider } from 'antd';

const theme = {
  token: {
    colorPrimary: '#FFCD1C',
    colorBgLayout: 'linear-gradient(to left, #bcbcbc, #444444)',
    colorTextPlaceholder: 'silver.200',
    colorBgInput: 'white',
    addonBg: 'white',
  },
  components: {
    Button: {
      algorithm: true,
      colorText: 'black',
      variants: {
        primary: {
          backgroundColor: '#FFCD1C',
          color: 'white', // text color when the button has the primary color
        },
      },
    },
  },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
