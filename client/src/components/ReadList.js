import React, { Component, memo } from "react";
import axios from "axios";
import "../ReadList.css";

class ReadList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			memos: [{ key: 0, description: "" }],
			mode: "updated",
		};
	}

	readMemo = async () => {
		await axios.get("/memo").then((res) => {
			const memos = res.data.memos;
			const _memos = [];
			memos.forEach((memo) => {
				const _memo = { key: memo.seq, description: memo.description };
				_memos.push(_memo);
			});
			this.setState({ memos: _memos });
			this.props.onChange();
		});
	};

	deleteMemo = async (e) => {
		const _data = { key: e.target.dataset.key };
		console.log("here?");
		await axios.delete("/memo", { data: _data }).then((res) => {
			this.setState({ mode: "deleted" });
		});
	};

	componentDidMount() {
		this.readMemo();
	}

	componentDidUpdate() {
		if (this.props.mode === "created") {
			this.readMemo();
		} else if (this.state.mode === "deleted") {
			this.readMemo();
			this.setState({ mode: "updated" });
		}
	}

	render() {
		return (
			<ul id="read-container">
				{this.state.memos.map((memo) => {
					return (
						<li key={memo.key}>
							<button data-key={memo.key} onClick={this.deleteMemo.bind(this)}>
								X
							</button>
							{memo.description}
						</li>
					);
				})}
			</ul>
		);
	}
}

export default ReadList;
