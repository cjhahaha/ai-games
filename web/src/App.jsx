import React from 'react';
import { Switch, HashRouter as Router, Route } from 'react-router-dom';
/* pages */
import { Home } from './pages/Home';
import { TicTacToe } from './pages/TicTacToe/index'
import { Gomoku } from "./pages/Gomoku";
/* styles */
import './App.css'

export default function App() {
    return (
        <div className='page-container'>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/go-bang" component={Gomoku} />
                    <Route path="/tic-tac-toe" component={TicTacToe} />
                </Switch>
            </Router>
        </div>
    );
}
