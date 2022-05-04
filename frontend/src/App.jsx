import monero_farmer from './monero_farmer.jpg'
import monero_farmer2 from './monero_farmer2.png'
import monero_farmer3 from './monero_farmer3.png'

import './App.less';
import {Card, Avatar, Image} from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import classNames from 'classnames';

const {Meta } = Card;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div  className={classNames("ClubcardGrid")}>
        <Card
        onClick={()=>window.postMessage({ type: "BUY_CLUBCARD", url: "http://localhost:3006" },
        window.location.origin)}
                className={classNames("Clubcard")}
                hoverable
                bordered
                cover={
                    <Image 
                    preview={false}
                    src={monero_farmer3}
                    />
                }
            >
                <Meta
                    description="Monero Farmers Association"
                />
            </Card>
        <Card
        onClick={()=>window.postMessage({ type: "BUY_CLUBCARD", url: "http://localhost:3006" },
        window.location.origin)}
                className={classNames("Clubcard")}
                hoverable
                bordered
                cover={
                    <Image 
                    preview={false}
                    src={monero_farmer}
                    />
                }
            >
                <Meta
                    description="Monero Farmers Association"
                />
            </Card>

            <Card
        onClick={()=>window.postMessage({ type: "BUY_CLUBCARD", url: "http://localhost:3006" },
        window.location.origin)}
                className={classNames("Clubcard")}
                hoverable
                bordered
                cover={
                    <Image 
                    preview={false}
                    src={monero_farmer2}
                    />
                }
            >
                <Meta
                    description="Monero Farmers Association"
                />
            </Card>
        </div>
    
      </header>
    </div>
  );
}

export default App;
