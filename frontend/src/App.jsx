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
        <Card
        onClick={()=>window.postMessage({ type: "BUY_CLUBCARD", url: "http://localhost:3006" },
        window.location.origin)}
                className={classNames("Clubcard")}
                hoverable
                bordered
                cover={
                    <Image 
                    preview={false}
                    src="https://cdn.substack.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F458ff585-dc54-4a7c-993a-17f0ca973d16_4674x7011.jpeg"
                    />
                }
            >
                <Meta
                    description="Monero Farmers Association"
                />
            </Card>

      </header>
    </div>
  );
}

export default App;
