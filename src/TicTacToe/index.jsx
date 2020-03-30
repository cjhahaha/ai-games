import React from 'react';
import { Switch } from 'antd';
import { Wrapper } from '../components/Wrapper';
import { AI, PLAYER, CANNOT_CLICK, TIE } from "../common/constant";

import './index.css';
import '../common/common.css';

/* import functions */
let _ = require('./minimax.js')
const is_full = _.is_full;
const is_just_started= _.is_just_started;
const win_check = _.win_check;
const ai_move = _.ai_move;



/* for responsive layout */
const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;
const BASE = HEIGHT < WIDTH ? HEIGHT : WIDTH;
const BORDER_CSS = 'solid #FFF 2.5vmin';

/*
class Index extends React.Component {
    state = {
        chessboard: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],                     // chessboard
        displayBoard: ['', '', '', '', '', '', '', '', ''],                // display board
        colorIdx: 0,                                                       // background color index
        clickStatus: AI,                                                   // 0 -> nobody move, 1 -> ai move, 2 -> human move
        firstHand: AI,                                                     // who plays first
        result: 'Let\'s play!'                                             // help text
    };


    componentDidMount() {
        this.randomStart();
    }


    handleTie = () => {                                                    // if tie, display message and reset game
        this.setState({
            clickStatus: 0,
            result: 'Tie🤷‍️'
        });
    };


    handleWin = () => {                                                    // if player win, display message and reset game
        this.setState({
            clickStatus: 0,
            result: 'Good for you!🤘'
        });
    };


    handleLose = () => {                                                   // if player lose, display message and reset game
        this.setState({
            clickStatus: 0,
            result: 'Loser comes to bite me🤪'
        });
    };


    handleClick = (pos) => {                                               // when player places chess
        let x = (pos - pos % 3) / 3, y = pos % 3;

        if (this.state.chessboard[x][y] === 0 &&                           // available place
            this.state.clickStatus !== CANNOT_CLICK) {                     // available status
            let new_chessboard = this.state.chessboard,
                new_displayboard = this.state.displayBoard;

            new_chessboard[x][y] = PLAYER;                                 // update chessboard
            new_displayboard[pos] = '⭕️';                                  // update displayBoard

            this.setState({                                                // update state
                clickStatus: PLAYER,
                chessboard: new_chessboard,
                displayBoard: new_displayboard
            });

            if (win_check(new_chessboard) === PLAYER)                      // Win
                this.handleWin();
            else if (win_check(new_chessboard) === AI)                     // Lose
                this.handleLose();
            else if (is_full(new_chessboard))                              // Tie
                this.handleTie();
            else {                                                         // let AI move
                let res = ai_move(this.state.chessboard, PLAYER, AI);
                console.log(this.state.chessboard, res.best_move);
                x = res.best_move[0]; y = res.best_move[1];

                new_chessboard[x][y] = AI;                                 // update chessboard
                new_displayboard[x * 3 + y] = '❌';                        // update displayBoard

                this.setState({                                            // update state
                    chessboard: new_chessboard,
                    displayBoard: new_displayboard
                });

                if (win_check(new_chessboard) === PLAYER)                  // Win
                    this.handleWin();
                else if (win_check(new_chessboard) === AI)                 // Lose
                    this.handleLose();
                else if (is_full(new_chessboard))                          // Tie
                    this.handleTie();
            }
        }
    };


    handleClickMsg = () => {
        if (this.state.clickStatus === CANNOT_CLICK) {
            this.setState({
                clickStatus: this.state.firstHand,
                chessboard: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                displayBoard: ['', '', '', '', '', '', '', '', ''],
                result: 'Let\'s play again!'
            });

            if (this.state.firstHand === AI)
                this.randomStart();
        }
    };


    randomStart = () => {                                                  // random start a new game
        let pos = Math.round(Math.random() * 863) % 9;
        let x = (pos - pos % 3) / 3, y = pos % 3;

        let new_chessboard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            new_displayboard = ['', '', '', '', '', '', '', '', ''];

        new_chessboard[x][y] = AI;                                         // update chessboard
        new_displayboard[pos] = '❌';                                      // update displayBoard

        this.setState({                                                    // update state
            result: 'Let\'s play!',
            chessboard: new_chessboard,
            displayBoard: new_displayboard,
            clickStatus: PLAYER
        });

    };


    handleSwitch = (checked) => {                                          // switch first hand
        this.setState({ firstHand: checked ? AI : PLAYER });

        if (is_just_started(this.state.chessboard)) {
            if (checked)
                this.randomStart();                                        // random start a new game
            else
                this.setState({                                            // clear, let PLAYER play
                    clickStatus: this.state.firstHand,
                    chessboard: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                    displayBoard: ['', '', '', '', '', '', '', '', ''],
                });
        }
    };


    render() {                                                             // html
        return (
            <div className="container" style={{ background: getBackgroundColor(), width: WIDTH, height: HEIGHT }}>
                <div className="chessboard"><table>
                    <tr className="row" style={{ height: '22.5vmin'}}>
                        <td className="gird" style={{ height: '22.5vmin', width: '20vmin',
                            borderBottom: BORDER_CSS }}
                            onClick={this.handleClick.bind(this, 0)}>
                            <div style={{ fontSize: '14.7vmin' }} className="chess"> {this.state.displayBoard[0]} </div>
                        </td>

                        <td className="gird" style={{ height: '22.5vmin', width: '25vmin',
                            borderLeft: BORDER_CSS, borderRight: BORDER_CSS, borderBottom: BORDER_CSS }}
                            onClick={this.handleClick.bind(this, 1)} >
                            <div style={{ fontSize: '14.7vmin' }} className="chess"> {this.state.displayBoard[1]} </div>
                        </td>

                        <td className="gird" style={{ height: '22.5vmin', width: '20vmin',
                            borderBottom: BORDER_CSS }}
                            onClick={this.handleClick.bind(this, 2)} >
                            <div style={{ fontSize: '14.7vmin' }} className="chess"> {this.state.displayBoard[2]} </div>
                        </td>
                    </tr>


                    <tr className="row" style={{ height: '22.5vmin' }}>
                        <td className="gird" style={{ height: '22.5vmin', width: '20vmin',
                            borderBottom: BORDER_CSS }}
                            onClick={this.handleClick.bind(this, 3)}>
                            <div style={{ fontSize: '14.7vmin' }} className="chess"> {this.state.displayBoard[3]} </div>
                        </td>

                        <td className="gird" style={{ height: '22.5vmin', width: '25vmin',
                            borderLeft: BORDER_CSS, borderRight: BORDER_CSS, borderBottom: BORDER_CSS }}
                            onClick={this.handleClick.bind(this, 4)} >
                            <div style={{ fontSize: '14.7vmin' }} className="chess"> {this.state.displayBoard[4]} </div>
                        </td>

                        <td className="gird" style={{ height: '22.5vmin', width: '20vmin',
                            borderBottom: BORDER_CSS }}
                            onClick={this.handleClick.bind(this, 5)} >
                            <div style={{ fontSize: '14.7vmin' }} className="chess"> {this.state.displayBoard[5]} </div>
                        </td>
                    </tr>


                    <tr className="row" style={{ height: '22.5vmin' }}>
                        <td className="gird" style={{ height: '20vmin', width: '20vmin' }}
                            onClick={this.handleClick.bind(this, 6)}>
                            <div style={{ fontSize: '14.7vmin' }} className="chess"> {this.state.displayBoard[6]} </div>
                        </td>

                        <td className="gird" style={{ height: '20vmin', width: '25vmin',
                            borderLeft: BORDER_CSS, borderRight: BORDER_CSS }}
                            onClick={this.handleClick.bind(this, 7)} >
                            <div style={{ fontSize: '14.7vmin' }} className="chess"> {this.state.displayBoard[7]} </div>
                        </td>

                        <td className="gird" style={{ height: '20vmin', width: '20vmin' }}
                            onClick={this.handleClick.bind(this, 8)} >
                            <div style={{ fontSize: '14.7vmin' }} className="chess"> {this.state.displayBoard[8]} </div>
                        </td>
                    </tr>

                </table>
                    <div className="status">
                        You &nbsp; <Switch defaultChecked onChange={this.handleSwitch} /> &nbsp; AI go first.
                    </div>
                    <br/>
                    <div className="status" style={{ fontSize: '6.7vmin' }} onClick={this.handleClickMsg}>
                        {this.state.result}
                    </div>
                </div>


            </div>
        )
    }

}
*/


export function TicTacToe() {
    return (
        <Wrapper>

        </Wrapper>
    );
}
