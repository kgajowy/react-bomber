import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'

import bg from './game/bricks.png'
import bgTop from './game/hills.png'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

class AppWithBg extends React.Component {

    public state = {
        debugMode: false,
    }

    public render() {
        return (
            <div style={{
                width: '700px',
                height: '500px',
            }}>
                <App debugMode={this.state.debugMode}/>
                <div style={{
                    position: 'absolute',
                    width: '700px',
                    height: '375px',
                    backgroundImage: `url('${bg}')`,
                    backgroundSize: '200px',
                    top: 124,
                    zIndex: -1,
                }}/>
                <div style={{
                    position: 'absolute',
                    width: '700px',
                    height: '124px',
                    backgroundImage: `url('${bgTop}')`,
                    backgroundSize: 'cover',
                    top: 0,
                    zIndex: -1,
                }}/>
                <label>Debug Mode</label>
                <input type='checkbox' name='debugMode'
                       checked={this.state.debugMode}
                       onChange={this.handleInputChange}/>
            </div>
        )
    }

    private handleInputChange = (event: any) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log(`setting state as`, {
            [name]: value
        })
        this.setState({
            [name]: value
        });
    }
}

ReactDOM.render(
    <AppWithBg/>,
    document.getElementById('root') as HTMLElement
)
registerServiceWorker()
