
import monero_farmer from './monero_farmer.png'
import monerochan from './monerochan.gif'
import temperance from './temperance.png'

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
                    src={monerochan}
                    />
                }
            >
                <Meta
                    description="Monerochan's Parlour"
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
                    src={temperance}
                    />
                }
            >
                <Meta
                    description="Woman's Monero Temperance Union"
                />
            </Card>
        </div>
    
      </header>
    </div>
  );
}

export default App;
