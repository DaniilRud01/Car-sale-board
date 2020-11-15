import React from 'react'
import {BrowserRouter as  Router, Switch, Route} from "react-router-dom"
import './style/App.css'
import Home from "./home"

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={() => <Home />}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
