console.log("Welcome to Musixx");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Hymn for the Weekend: Coldplay", filePath: "songs/1.mp3", coverPath: "song-images/m1.png"},
    {songName: "La la la- Fifa WC: Shakira", filePath: "songs/2.mp3", coverPath: "song-images/m2.jpg"},
    {songName: "Blinding Lights: The Weeknd", filePath: "songs/3.mp3", coverPath: "song-images/m3.jpg"},
    {songName: "Kings Never Die: Eminem", filePath: "songs/4.mp3", coverPath: "song-images/m4.jpg"},
    {songName: "7 Rings: Ariana Grande", filePath: "songs/5.mp3", coverPath: "song-images/m5.jpg"},
    {songName: "In the End: Linkin Park", filePath: "songs/6.mp3", coverPath: "song-images/m6.jpg"},
    {songName: "Taki Taki: DJ Snake", filePath: "songs/7.mp3", coverPath: "song-images/m7.png"},
    {songName: "Not Afraid: Eminem", filePath: "songs/8.mp3", coverPath: "song-images/m8.jpg"},
    {songName: "Crawling: Linkin Park", filePath: "songs/9.mp3", coverPath: "song-images/m9.jpg"},
    {songName: "Despacito: Luis Faunsi", filePath: "songs/10.mp3", coverPath: "song-images/m10.jpg"},
    {songName: "Let You Down: NF", filePath: "songs/11.mp3", coverPath: "song-images/m11.jpg"},
    {songName: "Memories: Maroon 5", filePath: "songs/12.mp3", coverPath: "song-images/m12.png"}
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
