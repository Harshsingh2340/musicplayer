console.log("Welcome to Spotify Clone");

let songIndex = 0;
let audioElement = new Audio('1.mp3'); // Default first song
let masterPlay = document.getElementById('masterPlay');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlayButtons = Array.from(document.getElementsByClassName('songItemPlay'));

// Song details
let songs = [
  { songName: "Song 1", filePath: "1.mp3", coverPath: "1.jpg" },
  { songName: "Song 2", filePath: "2.mp3", coverPath: "2.jpg" },
  { songName: "Song 3", filePath: "3.mp3", coverPath: "3.jpg" },
  { songName: "Song 4", filePath: "4.mp3", coverPath: "4.jpg" },
  { songName: "Song 5", filePath: "5.mp3", coverPath: "5.jpg" }
];

// Load song data into DOM
songItems.forEach((element, i) => {
  element.getElementsByTagName('img')[0].src = songs[i].coverPath;
  element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});

// Function to play/pause from masterPlay button
masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
  }
});

// Listen to time update events
audioElement.addEventListener('timeupdate', () => {
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  document.getElementById('myProgressBar').value = progress;
});

// Handle seekbar changes
let progressBar = document.getElementById('myProgressBar');
progressBar.addEventListener('change', () => {
  audioElement.currentTime = (progressBar.value / 100) * audioElement.duration;
});

// Function to make all song item buttons into play buttons
function makeAllPlays() {
  songItemPlayButtons.forEach((element) => {
    element.classList.remove('fa-pause-circle');
    element.classList.add('fa-play-circle');
  });
}

// Function to load a specific song
function loadSong(index) {
  audioElement.src = songs[index].filePath;
  masterSongName.innerText = songs[index].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
}

// Event listeners for each song item play button
songItemPlayButtons.forEach((element, index) => {
  element.addEventListener('click', () => {
    if (audioElement.src.includes(songs[index].filePath) && !audioElement.paused) {
      audioElement.pause();
      makeAllPlays();
      masterPlay.classList.remove('fa-pause-circle');
      masterPlay.classList.add('fa-play-circle');
      gif.style.opacity = 0;
    } else {
      makeAllPlays();
      element.classList.remove('fa-play-circle');
      element.classList.add('fa-pause-circle');
      songIndex = index;
      loadSong(songIndex);
    }
  });
});

// Event listeners for next and previous buttons
document.getElementById('next').addEventListener('click', () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
});

document.getElementById('previous').addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
});
