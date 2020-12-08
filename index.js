import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';


let timerValue = 0; //current value of timer
let lastTime = 0; // last recorded time (used to calc time delta)
let timerType = "Stopwatch"; // can be stopwatch or countdown
let timerActive = false; //tracks timer state (active or not)
let countdownValue = 0; // stores value for countdown text box
setInterval(update,10); //how frequent to update page

//main loop
function update(){
  ReactDOM.render(
    page(),
    document.getElementById('root')
  );
}

//baseline page
//loads stopwatchPage or countdownPage "subpages" based on timerType's value
function page(){
  updateTimer();
  return(
    <div id="main">
      <h2>{timerType}</h2>      
      <br/>      
      <button onClick={()=>{timerType="Stopwatch";timerValue =0;timerActive=false;}}>Stopwatch</button>
      <button onClick={()=>{timerType="Countdown";timerValue =0;timerActive=false;}}>Countdown</button>
      <hr></hr>
      {timerType === "Stopwatch" ? stopwatchPage():countdownPage()}      
    </div>
  );
}

//returns stopwatch page and it's functionality (to be loaded within page())
function stopwatchPage(){  
  return(
    <div>
       {timerValue > 0 ? 
        <button onClick={()=>{timerActive=false;timerValue = 0}}>Reset</button> 
        : 
        <button onClick={()=>{timerActive=true;timerValue = 0}}>Start</button>
      }
      
      {timerValue > 0 ?
        <button onClick={()=>timerActive ? timerActive = false : timerActive = true}>{timerActive & timerValue !==0 ? "Stop": "Resume"}</button>
        :
        ""
      }
      <h1>{(timerValue/1000).toFixed(2)}s</h1>
      

     
    </div>
  );
}

//returns countdown page and it's functionality (to be loaded within page())
function countdownPage(){
  
  if(countdownValue*1000-timerValue<0){
    timerActive = false;
    timerValue = countdownValue*1000;
    playDing(); //play sound effect when countdown reaches 0
  }
  return(
    <div>
      {timerValue > 0 ? "":<input type="text" placeholder="for how long?(sec)" onChange={(event)=>countdownValue=event.target.value}></input>}
      
      

      {timerValue > 0 ? 
        <button onClick={()=>{timerActive=false;timerValue = 0}}>Reset</button> 
        : 
        <button onClick={()=>{timerActive=true;timerValue = 0}}>Start</button>
      }
      
      {timerValue > 0 ?
        <button onClick={()=>timerActive ? timerActive = false : timerActive = true}>{timerActive & timerValue !==0 ? "Stop": "Resume"}</button>
        :
        ""
      }
      <h1>{(countdownValue-(timerValue/1000)).toFixed(2)}s</h1>
      
    </div>
  );
}

//updates timer by adding the difference of time between now and previous recorded time
//only changes timer value if timer is active
function updateTimer(){
  if(timerActive){
    timerValue += Date.now()-lastTime;    
  }
  lastTime=Date.now();

}

//play sound effect
function playDing(){
  let audio = new Audio("https://raw.githubusercontent.com/xue021/unsorted-python-scripts/master/ding.mp3");
  audio.play();
}