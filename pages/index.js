import fetch from "isomorphic-unfetch";
// import Head from "next/head";
import HomePage from "./home";

class Main extends React.Component {
  static async getInitialProps({ req }) {
    const host = req ? `https://${req.headers.host}` : "";
    const res = await fetch(`${host}/api/profiles`);
    const json = await res.json();
    return { profiles: json.profiles, host };
  }
  state = {
    name: "",
    address: "",
    email: "",
    avatar: ""
  };
  addProfile = async () => {
    const res = await fetch(`${this.props.host}/api/profiles/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state)
    });
    const json = await res.json();
    console.log(json);
  };
  // addProfile = async () => {
  //   const res = await fetch(`${this.props.host}/api/profiles/add`);
  //   const json = await res.json();
  //   console.log(json);
  // };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { name, address, email, avatar } = this.state;
    return (
      <>
        <input name="name" onChange={this.handleChange} value={name} />
        <input name="address" onChange={this.handleChange} value={address} />
        <input name="email" onChange={this.handleChange} value={email} />
        <input name="avatar" onChange={this.handleChange} value={avatar} />
        <button onClick={this.addProfile}>ADD</button>
        <HomePage profiles={this.props.profiles} />
      </>
    );
  }
}
export default Main;
