import fetch from "isomorphic-unfetch";
// import Head from "next/head";
import HomePage from "./home";

class Main extends React.Component {
  static async getInitialProps({ req }) {
    const host = req ? `https://${req.headers.host}` : "";
    const res = await fetch(`${host}/api/profiles`);
    const { profiles } = await res.json();
    return { profiles, host };
  }
  state = {
    new: {
      name: "",
      address: "",
      email: "",
      avatar: ""
    }
  };
  addProfile = async () => {
    const res = await fetch(`${this.props.host}/api/profiles/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.new)
    });
    this.resetState();
    if (res.status === 200) {
      const profile = await res.json();
      const profiles = this.state.profiles
        ? [...this.state.profiles, profile]
        : [...this.props.profiles, profile];
      this.setState({ profiles });
    }
  };
  handleChange = e => {
    this.setState({
      new: {
        ...this.state.new,
        [e.target.name]: e.target.value
      }
    });
  };
  resetState = () => {
    this.setState({
      new: {
        name: "",
        address: "",
        email: "",
        avatar: ""
      }
    });
  };
  render() {
    const { profiles } = this.state;
    const { name, address, email, avatar } = this.state.new;
    return (
      <>
        <input name="name" onChange={this.handleChange} value={name} />
        <input name="address" onChange={this.handleChange} value={address} />
        <input name="email" onChange={this.handleChange} value={email} />
        <input name="avatar" onChange={this.handleChange} value={avatar} />
        <button onClick={this.addProfile}>ADD</button>
        <HomePage profiles={profiles || this.props.profiles} />
      </>
    );
  }
}
export default Main;
