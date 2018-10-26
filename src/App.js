import React, { Component } from "react";
import "./App.css";
import Player from "./Player/Player";
import fighterData from "./FighterData";
import Util from "./Util";

const NUM_SLOTS = 6;
class App extends Component {
    state = {
        players: [
            { name: "Sam", fighters: [] },
            { name: "Aaron", fighters: [] }
        ]
    };
    addFighter = playerIndex => val => {
        const oldPlayer = { ...this.state.players[playerIndex] };
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
        fighter.lives = Math.min(Math.max(0, fighter.lives + value),2);

        oldFighters[fighterIndex] = fighter;
        oldPlayers[playerIndex] = {
            ...oldPlayers[playerIndex],
            fighters: oldFighters
        };
        this.setState({
            players: oldPlayers
        });
    };
    render() {
        return (
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
        );
    }
}

export default App;
