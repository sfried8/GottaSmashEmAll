import React from "react";
import "./Fighter.css";
import FighterData from "../FighterData";
const Fighter = props => {
    const f = FighterData.find(f1 => f1.name == props.name);

    return f ? <div className="Fighter">
            <img src={f.image} />
            <div style={{ flexGrow: 2, transform: "scaleX(1.25) translateX(40px)" }}>
                {props.name}
                <div className="rocker">
                    <div onClick={() => props.rockerClick(-1)}>➖</div>
                    <div className="outerHealth">
                        <div className="innerHealth" style={{ backgroundColor: props.lives === 1 ? "#EDA86D" : "#288359", width: (100 * props.lives) / 2 + "%" }} />
                    </div>
                    <div onClick={() => props.rockerClick(1)}>➕</div>
                </div>
            </div>
        </div> : null;
};

export default Fighter;
