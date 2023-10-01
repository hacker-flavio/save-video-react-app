const express = require("express");
const cors = require("cors");
const port = 3050; // Replace with the desired port number
const youtubedl = require("youtube-dl-exec");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors middleware
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true, // Don't forget to enable credentials
  })
);
// // Custom middleware to reject requests from unauthorized origins
// app.use((req, res, next) => {
//   const allowedOrigins = [
//     "http://localhost:3050",
//     "http://localhost:3000",
//     "chrome-extension://jjoicfpbcklniccpchgngaibfnjbjkfb",
//   ];
//   const origin = req.headers.origin;
//   console.log(req.headers);
//   console.log("origin: " + origin);
//   // Check if the request is coming from Postman
//   const isPostmanRequest = req.headers["user-agent"].includes("Postman");

//   if (isPostmanRequest || allowedOrigins.includes(origin)) {
//     // Allow the request to proceed
//     // res.setHeader("Access-Control-Allow-Origin", origin || "*");
//     res.setHeader("Access-Control-Allow-Origin", origin || "*");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST");
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     next();
//   } else {
//     // Reject the request
//     res.status(403).send("Forbidden");
//   }
// });

// // CORS middleware
// app.use(
//   cors({
//     methods: ["GET", "POST"],
//     credentials: true,
//     maxAge: 86400, // cache for one day
//   })
// );

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  // res.setHeader(
  //   "Access-Control-Allow-Origin",
  //   `chrome-extension://jjoicfpbcklniccpchgngaibfnjbjkfb`
  // );
  res.setHeader("Access-Control-Allow-Origin", `*`);
  next(); // call next() to move on to the next middleware or route handler
});

// Serve files from the 'uploads' directory
app.use("/videoFiles", express.static(path.join(__dirname, "videoFiles")));

// Define an API endpoint to list video files and their URLs
app.get("/api/videos", (req, res) => {
  // res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  // res.setHeader(
  //   "Access-Control-Allow-Origin",
  //   `chrome-extension://${process.env.CHROME_EXTENSION_THREE_ID}`
  // );
  console.log("request made to get videos");
  const videoDirectory = path.join(__dirname, "videoFiles");
  fs.readdir(videoDirectory, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error reading directory" });
      return;
    }

    // Filter for video files (e.g., .mp4, .avi, etc.)
    const videoFiles = files.filter((file) =>
      /\.(mp4|avi|mov|mkv)$/i.test(file)
    );

    // Create an array of video URLs
    const videoURLs = videoFiles.map((videoFile) => ({
      name: videoFile,
      url: `/videoFiles/${videoFile}`,
    }));

    res.json(videoURLs);
  });
});

app.post("/downloadVideo", async (req, res) => {
  const { videoUrl } = req.body;
  console.log(videoUrl);
  if (!videoUrl) {
    res.status(400).send("Missing video URL.");
  }
  // Generate an 8-digit random ID
  const id = Math.floor(10000000 + Math.random() * 90000000);
  console.log(id);

  // const videoOutputDir = path.resolve(
  //   __dirname,
  //   "../frontend/src/components/lists/videoFiles"
  // );
  // const thumbnailOutputDir = path.resolve(
  //   __dirname,
  //   "../frontend/src/components/lists/thumbnailFiles"
  // );
  const videoOutputDir = path.resolve(__dirname, "./videoFiles");
  const thumbnailOutputDir = path.resolve(__dirname, "./thumbnailFiles");

  const videoFilename = `${id}.%(ext)s`;
  const thumbnailFilename = `${id}.jpg`;

  const videoOptions = {
    output: path.join(videoOutputDir, videoFilename), // Specify video output directory with ID in filename
    format: "best", // Get the best available quality
  };

  const thumbnailOptions = {
    output: path.join(thumbnailOutputDir, thumbnailFilename), // Specify thumbnail output directory with ID in filename
    writeThumbnail: true,
    skipDownload: true, // Skip downloading the video itself
  };

  try {
    await youtubedl(videoUrl, videoOptions); // Download the video
    await youtubedl(videoUrl, thumbnailOptions); // Download the thumbnail
    console.log("Video and thumbnail downloaded successfully.");
    res.status(200).json({ message: "success" }); // Send success status code
  } catch (error) {
    console.error("Error downloading video:", error);
    res.status(500).send("Error downloading video.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
