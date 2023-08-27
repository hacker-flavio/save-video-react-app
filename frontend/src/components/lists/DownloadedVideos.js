// import React from "react";
// import vid from "./videoFiles/vid.mp4";
// // import vid from "/Users/herre/Desktop/code-2023/save-videos-react-app/frontend/src/components/lists/vid.mp4";
// // import vid from "/Users/herre/Desktop/code-2023/download-videos-nodejs/videoFiles/vid.mp4";
// function DownloadedVideos() {
//   return (
//     <div>
//       <video controls>
//         <source src={vid} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//     </div>
//   );
// }

// export default DownloadedVideos;

import React from "react";
import "../../styles/Downloaded.css";
// import Vid from "./videoFiles/vid.mp4";
const images = require.context("./videoFiles", true);
const imageList = images.keys().map((image) => images(image));
const listOfVideos = require.context(
  "./videoFiles", // Specify the path to your video folder
  false,
  /\.(mp4|webm|ogg)$/ // Specify the file extensions you want to include
);

const videoFiles = listOfVideos.keys().map(listOfVideos);
// const videoFiles = listOfVideos.keys().map((videoPath) => {
//   // Extract the file name from the path
//   const fileName = videoPath.split("/").pop();
//   return fileName;
// });
// import vid from "./vid.mp4";
//import videoList from "frontend/src/components/lists/videoFiles"; // Import your list of video file paths or URLs
//import videoList from "/Users/herre/Desktop/code-2023/save-videos-react-app/frontend/src/components/lists/videoFiles/";

// import vid from "/Users/herre/Desktop/code-2023/download-videos-nodejs/videoFiles/vid.mp4";
function DownloadedVideos() {
  console.log(imageList);
  return (
    <div>
      {/* <video controls>
        <source src={vid} type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
      <div>
        {/* <video controls>
          <source src={videoFiles[0]} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}

        {imageList.map((image, index) => (
          <div>
            {/* <img key={index} src={image.default} alt={`image-${index}`} /> */}
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
