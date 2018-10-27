import React, { Component } from "react";
import "./App.css";
import Player from "./Player/Player";
import fighterData from "./FighterData";
import Util from "./Util";
import MessageBox from "./MessageBox/MessageBox";

const NUM_SLOTS = 6;
class App extends Component {
    state = {
        players: [
            { name: "Sam", fighters: [] },
            { name: "Aaron", fighters: [] }
        ],
        message: ""
    };
    addFighter = playerIndex => val => {
        const oldPlayer = { ...this.state.players[playerIndex] };
        if (oldPlayer.fighters.length >= NUM_SLOTS) {
            return;
        }
        oldPlayer.fighters = [
            ...oldPlayer.fighters,
            { ...fighterData.find(f => f.name === val), lives: 2 }
        ];
        const oldPlayers = [...this.state.players];
        oldPlayers[playerIndex] = oldPlayer;
        this.setState({ players: oldPlayers });
    };
    randomize = playerIndex => () => {
        const oldPlayers = [...this.state.players];
        oldPlayers[playerIndex] = {
            ...oldPlayers[playerIndex],
            fighters: Util.shuffle([...fighterData])
                .slice(0, NUM_SLOTS)
                .map(f => ({ ...f, lives: 2 }))
        };
        this.setState({
            players: oldPlayers
        });
    };
    buttonClickedHandler = playerIndex => fighterIndex => value => {
        let oldPlayers = [...this.state.players];
        let oldFighters = [...oldPlayers[playerIndex].fighters];
        let fighter = { ...oldFighters[fighterIndex] };
        fighter.lives = Math.min(Math.max(0, fighter.lives + value), 2);
        const newState = { players: oldPlayers };
        if (fighter.lives === 0 && oldFighters[fighterIndex].lives == 1) {
            newState.message = fighter.name + " fainted!";
        }

        oldFighters[fighterIndex] = fighter;
        oldPlayers[playerIndex] = {
            ...oldPlayers[playerIndex],
            fighters: oldFighters
        };
        this.setState(newState);
    };
    render() {
        return (
            <div>
                <div
                    className="App"
                    style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    {this.state.players.map((p, i) => (
                        <div style={{ width: "50%" }}>
                            <Player
                                name={p.name}
                                fighters={p.fighters}
                                addFighter={this.addFighter(i)}
                                numSlots={NUM_SLOTS}
                                rockerClick={this.buttonClickedHandler(i)}
                                onRandomClicked={this.randomize(i)}
                            />
                        </div>
                    ))}
                </div>
                <div
                    className="App"
                    style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <MessageBox string={this.state.message} />
                </div>
            </div>
        );
    }
}

export default App;
