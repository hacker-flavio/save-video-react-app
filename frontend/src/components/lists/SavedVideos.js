import React from "react";
import axios from "axios";

function SavedVideos({ tasks }) {
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

  return (
    <div>
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
          <div key={index}>
            •{" "}
            <a href={task} target="_blank" rel="noreferrer">
              {task}
            </a>
          </div>
          <button onClick={() => downloadVideo(task)}>download</button>
        </div>
      ))}
    </div>
  );
}

export default SavedVideos;
