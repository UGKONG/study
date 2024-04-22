var el = {
    main: document.querySelector("main"),
};
var MEDIA_PATH = "./assets/";
var options = {
    playTotal: 0,
    playNow: 0,
    volume: 0.3,
    fullscreen: false,
};
var playingBarRender = function () {
    if (!options.playTotal)
        return;
    var playingBar = document.querySelector("#playing-bar");
    playingBar.max = options.playTotal;
    playingBar.value = options.playNow;
};
var videoToolbarRender = function (isPlay) {
    var button = document.querySelector("#stop-and-play-btn");
    if (isPlay) {
        button.innerText = "정지";
    }
    else {
        button.innerText = "재생";
    }
};
var fullScreenToggle = function () {
    options.fullscreen = !options.fullscreen;
    if (options.fullscreen) {
        el.main.className = "fullscreen";
    }
    else {
        el.main.className = "";
    }
    var fullScreenButton = document.querySelector("#full-btn");
    if (options.fullscreen) {
        fullScreenButton.innerText = "전체화면 해제";
    }
    else {
        fullScreenButton.innerText = "전체화면";
    }
};
var imgToVideo = function () {
    el.main.removeEventListener("click", imgToVideo);
    el.main.className = "";
    el.main.innerHTML = "\n    <div class=\"video-container\">\n      <video src=\"".concat(MEDIA_PATH, "video.mp4\" autoplay loop></video>\n      <progress id=\"playing-bar\" min=\"0\" value=\"0\"></progress>\n      <section>\n        <div>\n          <button id=\"stop-and-play-btn\">\uC815\uC9C0</button>\n          \uBCFC\uB968 <progress id=\"sound-bar\" min=\"0\" max=\"1\"></progress>\n        </div>\n        <div>\n          <button id=\"full-btn\">\uC804\uCCB4\uD654\uBA74</button>\n        </div>\n      </div>\n    </div>\n  ");
    var video = document.querySelector("video");
    var soundProgress = document.querySelector("#sound-bar");
    var fullScreenButton = document.querySelector("#full-btn");
    var stopAndPlayButton = document.querySelector("#stop-and-play-btn");
    video.volume = options.volume;
    soundProgress.value = options.volume;
    var videoControll = function () {
        videoToolbarRender(video === null || video === void 0 ? void 0 : video.paused);
        video.paused ? video.play() : video.pause();
    };
    video.addEventListener("loadeddata", function () {
        options.playTotal = video.duration;
    });
    video.addEventListener("timeupdate", function () {
        options.playNow = video.currentTime;
        playingBarRender();
    });
    video.addEventListener("click", videoControll);
    stopAndPlayButton.addEventListener("click", videoControll);
    document.documentElement.onfullscreenchange = fullScreenToggle;
    fullScreenButton.addEventListener("click", function () {
        if (options.fullscreen) {
            document.exitFullscreen();
        }
        else {
            document.documentElement.requestFullscreen();
        }
    });
};
var init = function () {
    // 이벤트 방지
    el.main.oncontextmenu = function () { return false; };
    el.main.onselectstart = function () { return false; };
    el.main.ondragstart = function () { return false; };
    el.main.onkeydown = function () { return false; };
    // 초기 설정
    el.main.className = "not-play";
    el.main.addEventListener("click", imgToVideo);
};
init();
