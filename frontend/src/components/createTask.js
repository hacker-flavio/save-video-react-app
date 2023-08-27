import React, { useState, useEffect } from "react";
import SavedVideos from "./lists/SavedVideos";
import DownloadedVideos from "./lists/DownloadedVideos";

import "../styles/Feed.css";
import axios from "axios";

function CreateTask() {
  const [tasks, setTasks] = useState([]);
  const [currentTab, setCurrentTab] = useState("saved");

  useEffect(() => {
    // Fetch all tasks on component load
    fetchTasks();
  }, []);

  useEffect(() => {
    if (currentTab) {
      console.log(currentTab);
    }
  }, [currentTab]);

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

  return (
    <div className="videoContainer">
      <div className="tabs">
        <div>
          <button className="tabBtn" onClick={() => setCurrentTab("saved")}>
            saved
          </button>
        </div>
        <div>
          <button
            className="tabBtn"
            onClick={() => setCurrentTab("downloaded")}
          >
            downloaded
          </button>
        </div>
      </div>
      {currentTab === "saved" ? (
        <SavedVideos tasks={tasks} />
      ) : currentTab === "downloaded" ? (
        <DownloadedVideos />
      ) : null}
    </div>
  );
}

export default CreateTask;
