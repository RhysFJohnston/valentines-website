const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");

const songSlider = document.getElementById("song-slider");

const playpauseButton = document.getElementById("playpause-song");
const prevSongButton = document.getElementById("prev-song");
const nextSongButton = document.getElementById("next-song");

const songs  = [
    {
        image: "/images/yeezus.png",
        name: "Bound 2",
        artist: "Kanye West",
        audio: "/audio/Bound 2.mp3",
    },
    {
        image: "/images/fearless.png",
        name: "You Belong With Me (Taylor's Version)",
        artist: "Taylor Swift",
        audio: "/audio/You Belong With Me.mp3",
    },
    {
        image: "/images/who really cares.png",
        name: "Cigarettes Out The Window",
        artist: "TV Girl",
        audio: "/audio/Cigarettes Out The Window.mp3",
    },
    {
        image: "/images/live forever.png",
        name: "nuts",
        artist: "Lil Peep, rainy bear",
        audio: "/audio/Nuts.mp3",
    },
    {
        image: "/images/mac miller.png",
        name: "Love Lost",
        artist: "Mac Miller, The Temper Trap",
        audio: "/audio/Love Lost.mp3",
    },
    {
        image: "/images/divinefeminine.png",
        name: "Congratulations (feat. Bilal)",
        artist: "Mac Miller, Bilal",
        audio: "/audio/Congratulations.mp3",
    },
    {
        image: "/images/watchthethrone.png",
        name: "Why I Love You",
        artist: "JAY-Z, Kanye West, Mr Hudson",
        audio: "/audio/Why I Love You.mp3",
    },
    {
        image: "/images/frenchexit.png",
        name: "Lovers Rock",
        artist: "TV Girl",
        audio: "/audio/Lovers Rock.mp3",
    },
    {
        image: "/images/girlinred.png",
        name: "we fell in love in october",
        artist: "girl in red",
        audio: "/audio/we fell in love in october.mp3",
    },
    {
        image: "/images/moralpanic.png",
        name: "Real Love Song",
        artist: "Nothing But Thieves",
        audio: "/audio/Real Love Song.mp3",
    },
];

const audio = document.createElement("audio");
let currentSongIndex = 0;
updateSong();

prevSongButton.addEventListener("click", function() {
    if(currentSongIndex == 0){
        return;
    }
    currentSongIndex --;
    updateSong();
    audio.play();
});

nextSongButton.addEventListener("click", function() {
    if(currentSongIndex == songs.length -1){
        return;
    }
    currentSongIndex ++;
    updateSong();
    audio.play();
});

playpauseButton.addEventListener("click",function(){
    if(!audio.paused){
        audio.pause();
    }
    else{
        audio.play();
    }

    updatePlayPauseIcon()
});

audio.addEventListener("ended", function(){
    if(currentSongIndex < songs.length - 1){
        currentSongIndex++;
        updateSong();
        audio.play();
    }
});

audio.addEventListener("play", updatePlayPauseIcon)
audio.addEventListener("pause", updatePlayPauseIcon)
    

songSlider.addEventListener("change", function(){
    audio.currentTime = songSlider.value;
});

function updateSong() {
    const song = songs[currentSongIndex]
    songImage.src = song.image;
    songName.innerText = song.name;
    songArtist.innerText = song.artist;

    audio.src = song.audio;
    audio.onloadedmetadata = function(){
        songSlider.value = 0;
        songSlider.max = audio.duration;
    }
}

function moveSlider() {
    songSlider.value = audio.currentTime;
};

setInterval(moveSlider, 1000);

function updatePlayPauseIcon() {
    if (audio.paused) {
        playpauseButton.classList.remove("fa-circle-pause");
        playpauseButton.classList.add("fa-circle-play");
    } else {
        playpauseButton.classList.remove("fa-circle-play");
        playpauseButton.classList.add("fa-circle-pause");
    }
}
