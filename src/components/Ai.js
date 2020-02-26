import React, { Component } from "react";
import axios from "axios";

export class Ai extends Component {
  handleSubmit = e => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", e.target.img.files[0]);
    axios
      .post("https://curey-ai.herokuapp.com/ai", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json"
        }
      })
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="file" name="img" />
          <button type="submit"> Submit </button>
        </form>
      </div>
    );
  }
}

export default Ai;
