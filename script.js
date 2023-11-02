
var songs = [
    {url: "./music/yt1s.com - Lana Del Rey  Say Yes To Heaven Official Audio.mp3", name: "Lana Del Rey  Say Yes To Heaven", image: "./img/lana.jpg"},
    {url: "./music/yt1s.com - Fujii Kaze  Shinunoga EWa Lyrics.mp3", name: "Fujii Kaze  Shinunoga EWa", image:"./img/fuji.jpg"},
    {url: "./music/yt1s.com - Cupid  FIFTY FIFTY Twin Ver Lyrics Video.mp3", name: "Cupid  FIFTY FIFTY Twin Ver", image:"./img/cupid.jpg"}
];
var audioPlayer = document.getElementById('audioPlayer');
var songNameDiv = document.getElementById('songName');
var songImage = document.getElementById('songImage');
var playlistDiv = document.getElementById('playlist');
var currentSongIndex = 0;
var repeat = false;
var shuffled = false;

function shuffleSongs() {
    shuffled = !shuffled;
    if(shuffled){
        document.getElementById('shuffleButton').style.color='white'
    }
    else{
        document.getElementById('shuffleButton').style.color='#444444db'
    }
    
}
function startPlaying() {
    if (!audioPlayer.src) {
        currentSongIndex = 0;
    }
    playSong(songs[currentSongIndex]);
}
function toggleRepeat() {
    repeat = !repeat;
    if(repeat){
        document.getElementById('repeat').style.color='#81689f'
    }
    else{
        document.getElementById('repeat').style.color='white'
    } 
}
function playSong(song) {
    audioPlayer.src = song.url;
    songImage.src = song.image; 
    songNameDiv.textContent = song.name;
    audioPlayer.play();
    audioPlayer.onended = function() {
        if (repeat) {
            playSong(song);
        }
        else if (shuffled) {
                var index=currentSongIndex;
                while (index==currentSongIndex || index+1==currentSongIndex) {
                    currentSongIndex= Math.floor(Math.random() * songs.length);
                } 
                playSong(songs[currentSongIndex]);
        } else {
            currentSongIndex++;
            if (currentSongIndex >= songs.length) {
                currentSongIndex = 0;
            }
            playSong(songs[currentSongIndex]);
        }
    };
    updatePlaylistDisplay();
}
function nextSong() {
    currentSongIndex++;
    if (currentSongIndex > songs.length - 1) {
        currentSongIndex = 0;
    }
    playSong(songs[currentSongIndex]);
}

function previousSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    playSong(songs[currentSongIndex]);
}

function addSong(url, name, image) {
    songs.push({url: url, name: name, image: image});
    updatePlaylistDisplay();
}
function removeCurrentSong() {
    // Remove the current song from the songs array
    songs.splice(currentSongIndex, 1);
    updatePlaylistDisplay();
}
function addSongFromFile() {
    var fileInput = document.getElementById('songFile');
    var file = fileInput.files[0];
    var url = URL.createObjectURL(file);
   var image = "./img/music.jpg";
   var name = file.name;
   addSong(url, name, image);
   currentSongIndex = songs.length - 1;
   playSong(songs[currentSongIndex]);
   updatePlaylistDisplay();
   fileInput.value = '';
}
function updatePlaylistDisplay() {
    playlistDiv.innerHTML = '';
    for (var i = 0; i < songs.length; i++) {
        var li = document.createElement('li');
        li.onclick = (function(index) {
            return function() {
                currentSongIndex = index;
                playSong(songs[currentSongIndex]);
                updatePlaylistDisplay();
            };
        })(i);
        var img = document.createElement('img');
        img.src = songs[i].image;
        li.appendChild(img);
        var songNameSpan = document.createElement('span');
        songNameSpan.appendChild(document.createTextNode(songs[i].name));
        if (i === currentSongIndex) {
            songNameSpan.style.color = '#81689f';
        }
        li.appendChild(songNameSpan);
        var deleteIcon = document.createElement('i');
        deleteIcon.className = 'fa-solid fa-trash';
        deleteIcon.style.cursor = 'pointer';
        deleteIcon.style.fontSize='13px'
        deleteIcon.style.color='#797575';
        deleteIcon.onmouseover = function() {
            this.style.color = 'white';
        }
        deleteIcon.onmouseout = function() {
            this.style.color = '#797575';
        }
        deleteIcon.onclick = (function(index) {
            return function(event) {
                event.stopPropagation();
                songs.splice(index, 1);
                updatePlaylistDisplay();
            };
        })(i);
        li.appendChild(deleteIcon);
        playlistDiv.appendChild(li);
    }
  searchFunction();
}
function searchFunction() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('searchInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("playlist");
  li = ul.getElementsByTagName('li');
  for (i = 0; i < li.length; i++) {
      txtValue = li[i].textContent || li[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      } else {
          li[i].style.display = "none";
      }
  }
}

playSong(songs[currentSongIndex]);

updatePlaylistDisplay();