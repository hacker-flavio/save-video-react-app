import "./App.css";
import axios from "axios";
import CreateTask from "./components/createTask";

function App() {
  function sendRequest() {
    axios
      .get(`/testing`, {
        withCredentials: true,
      })
      .then((res) => {
        alert(res.data);
        console.log(res.data);
      });
  }
  const outerDiv = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  return (
    <div className="App">
      <div style={outerDiv}>
        <span>This is a template</span>
        <button onClick={sendRequest} class="btn">
          test
        </button>

        <CreateTask />
      </div>
    </div>
  );
}

export default App;
