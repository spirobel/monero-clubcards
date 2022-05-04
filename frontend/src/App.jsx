import logo from './logo.svg';
import './App.less';
import {Card, Avatar, Image} from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import classNames from 'classnames';

const {Meta } = Card;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Card
                className={classNames("Clubcard")}
                style={{ width: 150 }}
                hoverable
                bordered
                cover={
                    <Image 
                    height={170}
                    preview={false}
                    src="https://cdn.substack.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F458ff585-dc54-4a7c-993a-17f0ca973d16_4674x7011.jpeg"
                    
                    />

                }

            >
                <Meta
                    description="Monero Farmers Association"
                />
            </Card>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
          <button onClick={()=>window.postMessage({ type: "FROM_PAGE", text: "Hello from the webpage!" },
              window.location.origin)}>
                send message
          </button>
          <button onClick={()=>window.postMessage({ type: "BUY_CLUBCARD", url: "http://localhost:3006" },
              window.location.origin)}>
                buy clubcard
          </button>
      </header>
    </div>
  );
}

export default App;
