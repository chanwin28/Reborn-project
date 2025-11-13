import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCkTRy0nhb_mUOmoaGQZwouMJPCC37uRRQ",
  authDomain: "plexiform-being-471915-u1.firebaseapp.com",
  projectId: "plexiform-being-471915-u1",
  storageBucket: "plexiform-being-471915-u1.firebasestorage.app",
  messagingSenderId: "477134304630",
  appId: "1:477134304630:web:a7af00f276bdcfd2c77657",
  measurementId: "G-VDCF2TGMET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const uploadBtn = document.getElementById("uploadBtn");
const videoInput = document.getElementById("videoUpload");
const videoContainer = document.getElementById("videoContainer");

// Upload video
uploadBtn.addEventListener("click", () => videoInput.click());

videoInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const videoRef = ref(storage, `videos/${file.name}`);
  await uploadBytes(videoRef, file);

  const url = await getDownloadURL(videoRef);
  alert("✅ Video uploaded!");
  addVideoToFeed(url);
});

// Load all videos
async function loadVideos() {
  const listRef = ref(storage, "videos/");
  const res = await listAll(listRef);
  for (const item of res.items) {
    const url = await getDownloadURL(item);
    addVideoToFeed(url);
  }
}

// Add video element
function addVideoToFeed(url) {
  const video = document.createElement("video");
  video.src = url;
  video.controls = false;
  video.autoplay = false;
  video.loop = true;
  video.addEventListener("click", () => {
    if (video.paused) video.play();
    else video.pause();
  });
  videoContainer.appendChild(video);
}

loadVideos();