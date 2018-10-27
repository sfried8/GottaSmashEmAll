import React, { Component } from "react";
import Fighter from "../Fighter/Fighter";
import "./Player.css";
import fighterData from "../FighterData";
import Autocomplete from "react-autocomplete";
import Util from "../Util";

class Player extends Component {
    state = {
        pendingValue: ""
    };
    sortItems = (itemA, itemB, value) => {
        if (!value) {
            return itemA.name < itemB.name
                ? -1
                : itemA.name === itemB.name
                    ? 0
                    : 1;
        }
        const valueChars = [...value.toUpperCase()];

        const mapFunc = item => v => item.name.toUpperCase().indexOf(v);
        const charIndexesA = valueChars.map(mapFunc(itemA));
        const charIndexesB = valueChars.map(mapFunc(itemB));

        const differenceReducer = (acc, cur, idx, src) =>
            idx < src.length - 1 ? acc + (src[idx + 1] - cur) : acc;
        const sum = arr => arr.reduce((acc, cur) => acc + cur, 0);

        const deltaSumA = charIndexesA.reduce(differenceReducer, 0);
        const deltaSumB = charIndexesB.reduce(differenceReducer, 0);
        console.log({
            a: itemA.name,
            b: itemB.name,
            charIndexesA,
            charIndexesB,
            deltaSumA,
            deltaSumB
        });
        if (deltaSumA === deltaSumB) {
            return charIndexesA[0] - charIndexesB[0];
        }
        return deltaSumA - deltaSumB;
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
                        shouldItemRender={(item, value) => {
                            if (!value) {
                                return false;
                            }
                            const valueChars = [...value.toUpperCase()];
                            const charIndexes = valueChars.map(v =>
                                item.name.toUpperCase().indexOf(v)
                            );
                            console.log(charIndexes);
                            return (
                                charIndexes.every(v => v >= 0) &&
                                Util.isSorted(charIndexes)
                            );
                        }}
                        sortItems={this.sortItems}
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
                        style={{ display: "inline-block", marginLeft: "10px" }}
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
