import React, { Component } from "react";
import Typed from "typed.js";
import "./MessageBox.css";
class MessageBox extends Component {
    state = {
        lastString: ""
    };
    componentDidMount() {
        // If you want to pass more options as props, simply add
        // your desired props to this destructuring assignment.
        const { string } = this.props;
        // You can pass other options here, such as typing speed, back speed, etc.
        const options = {
            strings: [string],
            typeSpeed: 50,
            backSpeed: 50,
            showCursor: false
        };
        // this.el refers to the <span> in the render() method
        this.typed = new Typed(this.el, options);
    }
    componentDidUpdate() {
        const { string } = this.props;
        if (string !== this.state.lastString) {
            // You can pass other options here, such as typing speed, back speed, etc.
            const options = {
                strings: [string],
                typeSpeed: 50,
                backSpeed: 50,
                showCursor: false
            };
            this.typed.destroy();
            this.typed = new Typed(this.el, options);
            this.typed.start();
            this.setState({ lastString: string });
        }
    }
    componentWillUnmount() {
        // Make sure to destroy Typed instance on unmounting
        // to prevent memory leaks
        this.typed.destroy();
    }

    render() {
        return (
            <div className="messageBox">
                <div className="type-wrap">
                    <div
                        style={{
                            whiteSpace: "pre",
                            width: "100%",
                            textAlign: "left"
                        }}
                        ref={el => {
                            this.el = el;
                        }}
                    />
                </div>
            </div>
        );
    }
}
export default MessageBox;
