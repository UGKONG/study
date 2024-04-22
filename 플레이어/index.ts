const el = {
  main: document.querySelector("main") as HTMLDivElement,
};

const MEDIA_PATH = "./assets/";

let options = {
  playTotal: 0,
  playNow: 0,
  volume: 0.3,
  fullscreen: false,
};

const playingBarRender = () => {
  if (!options.playTotal) return;
  const playingBar = document.querySelector(
    "#playing-bar"
  ) as HTMLProgressElement;
  playingBar.max = options.playTotal;
  playingBar.value = options.playNow;
};

const videoToolbarRender = (isPlay: boolean) => {
  const button = document.querySelector(
    "#stop-and-play-btn"
  ) as HTMLButtonElement;

  if (isPlay) {
    button.innerText = "정지";
  } else {
    button.innerText = "재생";
  }
};

const fullScreenToggle = () => {
  options.fullscreen = !options.fullscreen;

  if (options.fullscreen) {
    el.main.className = "fullscreen";
  } else {
    el.main.className = "";
  }

  const fullScreenButton = document.querySelector(
    "#full-btn"
  ) as HTMLButtonElement;

  if (options.fullscreen) {
    fullScreenButton.innerText = "전체화면 해제";
  } else {
    fullScreenButton.innerText = "전체화면";
  }
};

const imgToVideo = () => {
  el.main.removeEventListener("click", imgToVideo);
  el.main.className = "";
  el.main.innerHTML = `
    <div class="video-container">
      <video src="${MEDIA_PATH}video.mp4" autoplay loop></video>
      <progress id="playing-bar" min="0" value="0"></progress>
      <section>
        <div>
          <button id="stop-and-play-btn">정지</button>
          볼륨 <progress id="sound-bar" min="0" max="1"></progress>
        </div>
        <div>
          <button id="full-btn">전체화면</button>
        </div>
      </div>
    </div>
  `;

  const video = document.querySelector("video") as HTMLVideoElement;
  const soundProgress = document.querySelector(
    "#sound-bar"
  ) as HTMLProgressElement;
  const fullScreenButton = document.querySelector(
    "#full-btn"
  ) as HTMLButtonElement;
  const stopAndPlayButton = document.querySelector(
    "#stop-and-play-btn"
  ) as HTMLButtonElement;

  video.volume = options.volume;
  soundProgress.value = options.volume;

  const videoControll = () => {
    videoToolbarRender(video?.paused);
    video.paused ? video.play() : video.pause();
  };

  video.addEventListener("loadeddata", () => {
    options.playTotal = video.duration;
  });
  video.addEventListener("timeupdate", () => {
    options.playNow = video.currentTime;
    playingBarRender();
  });

  video.addEventListener("click", videoControll);
  stopAndPlayButton.addEventListener("click", videoControll);

  document.documentElement.onfullscreenchange = fullScreenToggle;
  fullScreenButton.addEventListener("click", () => {
    if (options.fullscreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  });
};

const init = () => {
  // 이벤트 방지
  el.main.oncontextmenu = () => false;
  el.main.onselectstart = () => false;
  el.main.ondragstart = () => false;
  el.main.onkeydown = () => false;

  // 초기 설정
  el.main.className = "not-play";
  el.main.addEventListener("click", imgToVideo);
};

init();
