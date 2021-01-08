import React, { Component } from "react";
import axios from "axios";
import "../CreateList.css";

class CreateList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			description: "",
		};
		this._onClick = this._onClick.bind(this);
	}

	_onClick = async (e) => {
		e.preventDefault();
		const data = {
			description: e.target.description.value,
		};
		await axios
			.post("/memo", data)
			.then((res) => {
				this.setState({
					description: res.data.description,
				});
			})
			.catch((res) => console.log(res));
		this.props.onChange();
		e.target.description.value = "";
	};

	render() {
		return (
			<form action="/test" method="POST" onSubmit={this._onClick}>
				<p>
					<textarea
						name="description"
						id=""
						placeholder="Add something plz"
					></textarea>
				</p>
				<p>
					<input type="submit" value="+" />
				</p>
			</form>
		);
	}
}

export default CreateList;
