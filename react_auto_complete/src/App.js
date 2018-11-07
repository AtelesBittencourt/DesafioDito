import React, { Component } from 'react';
import './App.css';
import Autocomplete from "./autoComplete";
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

function suggestion(sugg, callback){
  
  xhr.open('GET', 'http://localhost:3001/');
  xhr.onload = function() {
    //console.log(xhr.responseText);
    var a = JSON.parse(xhr.responseText);
    callback(sugg, a);
  };
  xhr.send();
}

var sugg = [];
suggestion(sugg, function(s, lista){
  lista.forEach(element => {
    s.push(element.event);
  });
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <form autocomplete="off">
          <div class="autocomplete" style={{ width:"300px" }}>
            <Autocomplete
              suggestions={sugg}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default App;
