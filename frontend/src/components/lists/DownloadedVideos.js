import React from "react";
import "../../styles/Downloaded.css";
const images = require.context("./videoFiles", true);
const imageList = images.keys().map((image) => images(image));

function DownloadedVideos() {
  console.log(imageList);
  return (
    <div>
      <div>
        {imageList.reverse().map((image, index) => (
          <div>
            <video controls key={index} class="video-resize">
              <source key={index} src={image} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DownloadedVideos;
