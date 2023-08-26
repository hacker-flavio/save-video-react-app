import React, { useState, useEffect } from "react";
import axios from "axios";

function CreateTask() {
  const [prompt, setPrompt] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch all tasks on component load
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/saveVideo/getVideos"
      );
      setTasks(response.data.videos);
    } catch (error) {
      console.error(error);
    }
  };

  const downloadVideo = async (url) => {
    try {
      // Make a POST request to create a new task
      await axios
        .post("http://localhost:3050/downloadVideo", {
          videoUrl: url,
        })
        .then((response) => {
          console.log(response);
          if (response.data.message === "success") {
            alert("Video downloaded successfully");
          } else {
            alert("Video download failed");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const createNewTask = async () => {
    try {
      // Make a POST request to create a new task
      await axios.post("/appTasks/createTask", { prompt });

      // Clear the input field after creating the task
      setPrompt("");

      // Fetch updated tasks list
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="videoContainer">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={createNewTask}>Add Task</button>

      <ul>
        {tasks.slice(0, 10).map((task, index) => (
          <div>
            <div>
              <iframe
                width="560" // Set the desired width
                height="315" // Set the desired height
                src={`https://www.youtube.com/embed/${task.substring(
                  task.length - 11,
                  task.length
                )}`} // Replace with your YouTube video URL
                key={index}
                title={task}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <li key={index}>{task}</li>
            <button onClick={() => downloadVideo(task)}>download</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default CreateTask;
