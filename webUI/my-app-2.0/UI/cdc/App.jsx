import React from 'react';
import GEOGraph from '../lib/GEOGraph.jsx';
import Label from '../lib/Label.jsx';
import MyForm from '../lib/Form.jsx';
import MyPie from '../lib/Pies.jsx';
import MyBars from '../lib/MyBarGroup.jsx';
import MyTree from '../lib/MyTree.jsx';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data : {},
      dataArray : [0,100000],
      range: [{label: "Red",
      usage: "33.3"},{label: "Yellow",
      usage: "33.3"},{label: "Green",
      usage: "33.3"}],
      BarRed: [{letter:"Mar-3",frequency:30},{letter:"Mar-4",frequency:20},{letter:"Mar-5",frequency:10}],
      BarYellow: [{letter:"Mar-3",frequency:10},{letter:"Mar-4",frequency:20},{letter:"Mar-5",frequency:10}],
      BarGreen: [{letter:"Mar-3",frequency:10},{letter:"Mar-4",frequency:20},{letter:"Mar-5",frequency:30}]
    };

    this.update = this.update.bind(this);
  }


  componentDidMount() {
    this.update();
    //setInterval(this.update,6*1000)
  }

  update(event) {
    let mydata = {};
    /*axios.get("http://localhost:5000/data").then(function(response) {
      mydata = response.data;
    }).catch(function (error){
      console.log(error);
    });*/
    let covid19api={};
    fetch("https://api.covid19api.com/summary").then(res => res.json()).then(
      (result) => {
        console.log(result);
        var arrayLength = result.Countries.length;
        for (var i = 0; i < arrayLength; i++) {
          console.log(result.Countries[i]);
          covid19api[result.Countries[i].Country]=result.Countries[i].TotalConfirmed;
        }
        mydata.data=covid19api;
        this.setState(mydata);
      },
      (error) => {

      }
    );
    /*axios.get("https://api.covid19api.com/summary").then(function(response){
      var arrayLength = response.data.Countries.length;
      let covid19api={};
      for (var i = 0; i < arrayLength; i++) {
          covid19api[response.data.Countries[i].Country]=response.data.Countries[i].TotalConfirmed;
      }
      mydata.data=covid19api;
    }).catch(function (error){
      console.log(error);
    });*/
  }

  render() {
  return (
    <div id="layout" class="pure-g">
        <div class="sidebar pure-u-1-4 pure-u-md-1-4">
            <MyForm/>
      </div>
      <div class="content pure-u-3-4 pure-u-md-3-4">
        <div class="pure-g">
          <div class="pure-u-2-5">
            <p>My area</p>
            <p>Red as new confirm,Yellow as new maybe,Green as new cure</p>
            <GEOGraph height={300} width={600} dataArray={this.state.dataArray} data={this.state.data}/>
            <div className="Label">
                  <Label dataArray={this.state.dataArray}/>
            </div>
          </div>
          <div class="pure-u-2-5">
              <p>Percent in my area</p>
              <MyPie width={300} height={300} data={this.state.range}/>
            </div>
            <div class="pure-u-1-5">
                <p>Trends in my area</p>
                <div class="pure-u-1-3">
                  <MyBars width={100} height={300} data={this.state.BarRed} color={"red"}/>
                </div>
                <div class="pure-u-1-3">
                  <MyBars width={100} height={300} data={this.state.BarYellow} color={"yellow"}/>
                </div>
                <div class="pure-u-1-3">
                  <MyBars width={100} height={300} data={this.state.BarGreen} color={"green"}/>
                </div>
            </div>
        </div>
      </div>
      <div class="pure-g">
      <div class="pure-u-2-5">
        <h1> List of people who my need ..</h1>
        <button class="pure-button">Person X</button>
        <br/>
        <button class="pure-button">Person Y</button>
      </div>
      <div class="pure-u-3-5">
        <h1> Possible reason for he/she need check</h1>
        <MyTree width={1200} height={800}/>
      </div>
      </div>
    </div>
  )
  }
}

export default App;