console.log("Welcome to Spotify");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItemPlay'));
let songs = [
  { songName: 'Salam-e-Ishq', filePath: '1.mp3', coverPath: '1.webp' },
  { songName: 'do not', filePath: '2.mp3', coverPath: '2.webp' },
  { songName: 'check', filePath: '3.mp3', coverPath: '3.webp' },
  { songName: 'assq', filePath: '4.mp3', coverPath: '4.webp' },
  { songName: 'Salaq', filePath: '5.mp3', coverPath: '5.webp' },
  { songName: 'Salad', filePath: '6.mp3', coverPath: '6.webp' }
];

songItem.forEach((element, index) => {
  element.addEventListener('click', () => {
    makeAllPlays();
    songIndex = index;
    element.classList.remove('fa-play-circle');
    element.classList.add('fa-pause-circle');
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
  });
});

function makeAllPlays() {
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.classList.remove('fa-pause-circle');
    element.classList.add('fa-play-circle');
  });
}

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

audioElement.addEventListener('timeupdate', () => {
  const progress = (audioElement.currentTime / audioElement.duration) * 100;
  myProgressBar.value = progress;
});

myProgressBar.addEventListener('input', () => {
  const newPosition = myProgressBar.value * audioElement.duration / 100;
  audioElement.currentTime = newPosition;
});

document.getElementById('next').addEventListener('click', () => {
  if (songIndex < songs.length - 1) {
    songIndex += 1;
  } else {
    songIndex = 0;
  }
  loadSong();
});

document.getElementById('previous').addEventListener('click', () => {
  if (songIndex > 0) {
    songIndex -= 1;
  } else {
    songIndex = songs.length - 1;
  }
  loadSong();
});

function loadSong() {
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
}
