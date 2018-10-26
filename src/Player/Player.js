import React, { Component } from "react";
import Fighter from "../Fighter/Fighter";
import "./Player.css";
import fighterData from "../FighterData";
import Autocomplete from "react-autocomplete";

class Player extends Component {
    state = {
        pendingValue: ""
    };

    getFighterArray = () => {
        const fighterArray = [...this.props.fighters];
        while (fighterArray.length < this.props.numSlots) {
            fighterArray.push(null);
        }
        return fighterArray;
    };
    render() {
        return (
            <div className="Player">
                <h1>{this.props.name}</h1>
                
                {this.getFighterArray().map(
                    (f, i) =>
                        f ? (
                            <Fighter
                                name={f.name}
                                lives={f.lives}
                                key={f.name}
                                rockerClick={this.props.rockerClick(i)}
                            />
                        ) : (
                            <div className="emptyslot" />
                        )
                )}
                <div>
                    <Autocomplete
                        getItemValue={item => item.name}
                        items={fighterData}
                        renderItem={(item, isHighlighted) => (
                            <div
                                key={item.name}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    background: isHighlighted
                                        ? "lightgray"
                                        : "white"
                                }}
                            >
                                <img
                                    src={item.image}
                                    style={{
                                        maxWidth: "50px",
                                        maxHeight: "50px",
                                        margin: "10px"
                                    }}
                                />{" "}
                                {item.name}
                            </div>
                        )}
                        shouldItemRender={(item, value) =>
                            value &&
                            item.name
                                .toLowerCase()
                                .replace(/[^a-zA-z]/g, "")
                                .indexOf(value.toLowerCase()) > -1
                        }
                        value={this.state.pendingValue}
                        onChange={e =>
                            this.setState({ pendingValue: e.target.value })
                        }
                        onSelect={val => {
                            this.props.addFighter(val);
                            this.setState({
                                pendingValue: ""
                            });
                        }}
                    />
                    <div
                        style={{ display: "inline-block" }}
                        onClick={this.props.onRandomClicked}
                    >
                        Random
                    </div>
                </div>
            </div>
        );
    }
}

export default Player;
