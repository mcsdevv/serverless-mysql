function fetchData() {
  console.log("click");
  return fetch("../api/greet.js")
    .then(res => res.text())
    .then(res => console.log(res));
}

function getGreeted() {
  console.log("click2");
  return fetch("../api/greet.js", {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ foo: "bar" }),
    method: "POST"
  })
    .then(res => res.json())
    .then(res => console.log(res));
}

function Home() {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <button onClick={getGreeted}>Get Greeted!</button>
      <button onClick={fetchData}>Get Data!</button>
    </div>
  );
}

export default Home;
