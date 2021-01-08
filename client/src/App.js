import React, { Component } from "react";
import ReadList from "./components/ReadList";
import CreateList from "./components/CreateList";

import "./App.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: "updated",
		};
	}

	createHandler() {
		this.setState({ mode: "created" });
	}

	readHandler() {
		this.setState({ mode: "updated" });
	}

	render() {
		return (
			<div id="container">
				<CreateList onChange={this.createHandler.bind(this)}></CreateList>
				<ReadList
					onChange={this.readHandler.bind(this)}
					mode={this.state.mode}
				></ReadList>
			</div>
		);
	}
}

export default App;
