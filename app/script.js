import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {

  state = {
    status: 'off',
    time: 60*20*1000,
    timer: null,
  };



  giveInfo(argStatus){
    if (argStatus === 'off') {
      return <div>
        <p>According two optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p>
      </div>
    } else {
      return <div>
        <br/>
      </div>
    }
  }

  giveImg(argStatus){
    if (argStatus === 'work'){
      return <img src="./images/Work.png" />
    } else if (argStatus === 'rest'){
      return <img src="./images/Rest.png" />
    }  else {
      return <br/>
    }
  }

  giveButton(argStatus){
    if (argStatus === 'off') {
      return <div>
        <button className="btn" onClick={() => this.startTimer()}>Start</button>
      </div>
    } else {
      return <div>
        <button className="btn" onClick={()=>this.stopTimer()}>Stop</button>
      </div>
    }
  }

  giveTimer(argStatus){
    if (argStatus !== 'off') {
      return <div className="timer">
        {this.formatTime()}
      </div>
    } else {
      return <br/>
    }
  }

  formatTime(){
    const {time} = this.state;
    const min = Math.floor(time / 1000 / 60 % 60)+ '';
    const sec =  Math.floor(time / 1000 % 60) + '';

    return min.padStart(2,'0') + ':' + sec.padStart(2,'0');
  }

  closeApp(){
    window.close()
    //console.log('closed');
  }

  step = () => {
    console.log('step');
    const {time, status} = this.state;
    let newTime = time - 1000;

    if(newTime == 0) {
      if(status === 'work') {
        this.setState({
          status: 'rest',
          time: 1*20*1000,
        })
      } else if(status === 'rest'){
        this.setState({
          status: 'work',
          time: 60*20*1000,
        })
      }
    } else {
      this.setState({
        time: newTime,
      })
    }
  }

  startTimer(){
    //console.log('startTimer')
    this.setState({
      status: 'work',
      timer: setInterval(this.step, 1000)
    })
  }

  stopTimer(){
    const {timer} = this.state;
    clearInterval(timer);
    this.setState({
      status: 'off',
      time: 60*20*1000,
    })
  }


  /* giveButton(argStatus){
    if (argStatus === 'off') {
      return
      <div>
        <button className="btn">Start</button>
      </div>
    } else if (argStatus !== 'off') {
      return
      <div>
        <button className="btn">Stop</button>
      </div>
    } else {
      return
      <div>
        <br/>
      </div>
    }
  }

  giveTimer(argStatus){
    if (argStatus !== 'off'){
      return
      <div className="timer">
        18:23
      </div>
    } else {
      return
      <br/>
    }
  }

  */






  render() {
    const {status, time, timer} = this.state;
    return (
      <div>
        <h1>Protect your eyes</h1>
        {this.giveInfo(status)}
        {this.giveImg(status)}
        {this.giveTimer(status)}
        {this.giveButton(status)}
        <button className="btn btn-close" onClick={() => this.closeApp()}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
