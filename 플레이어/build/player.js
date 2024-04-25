export class Player {
    constructor(props) {
        this.options = {
            baseURL: "./assets/",
            fullscreen: false,
            playTotal: 0,
            playNow: 0,
            volume: 0.3,
        };
        this.style = `
    
  `;
        console.log(props);
        const { el } = props;
        if (!el) {
            console.error("The Player module requires a flat element.");
            return;
        }
        this.onDocumentEvent();
        this.init(el);
        // 초기 설정
        // el.main.addEventListener("click", imgToVideo);
    }
    onDocumentEvent() {
        document.oncontextmenu = () => false;
        document.onselectstart = () => false;
        document.ondragstart = () => false;
        document.onkeydown = () => false;
    }
    init(el) {
        this.container = document.querySelector(el);
        this.id = "player-" + Date.now().toString();
        this.container.classList.remove(el === null || el === void 0 ? void 0 : el.replace(/(\#|\.)/g, ""));
        this.container.classList.add("yet");
        this.container.id = this.id;
        this.createStyle();
    }
    appendStyle() {
        const style = document.createElement("style");
        style.innerHTML = this.style;
        document.head.appendChild(style);
    }
    createStyle() {
        this.style = `
      #${this.id} video, ${this.id} img {
        display: block; flex: 1;
      }
      #${this.id} {
        width: 400px;
        min-height: 220px;
        overflow: hidden;
        position: relative;
        background-color: #f2f2f2;
      }
      #${this.id}.yet {
        background-image: url("./assets/img.png");
        background-position: center;
        background-size: cover;
        cursor: pointer;
      }
      #${this.id}.yet::before {
        content: "►";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        background-color: #dd3333;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 24px;
        padding: 4px 0 0 4px;
        box-shadow: 0 0 5px #fff inset;
      }
      #${this.id}.yet:hover::before {
        background-color: #ff0000;
      }
    `;
        this.appendStyle();
    }
}
// const playingBarRender = () => {
//   if (!options.playTotal) return;
//   const playingBar = document.querySelector(
//     "#playing-bar"
//   ) as HTMLProgressElement;
//   playingBar.max = options.playTotal;
//   playingBar.value = options.playNow;
// };
// const videoToolbarRender = (isPlay: boolean) => {
//   const button = document.querySelector(
//     "#stop-and-play-btn"
//   ) as HTMLButtonElement;
//   if (isPlay) {
//     button.innerText = "정지";
//   } else {
//     button.innerText = "재생";
//   }
// };
// const onFullScreenChange = () => {
//   options.fullscreen = !options.fullscreen;
//   if (options.fullscreen) {
//     el.main.className = "fullscreen";
//   } else {
//     el.main.className = "";
//   }
//   const fullScreenButton = document.querySelector(
//     "#full-btn"
//   ) as HTMLButtonElement;
//   if (options.fullscreen) {
//     fullScreenButton.innerText = "전체화면 해제";
//   } else {
//     fullScreenButton.innerText = "전체화면";
//   }
// };
// const onFullScreenButtonClick = () => {
//   if (options.fullscreen) {
//     document.exitFullscreen();
//   } else {
//     document.documentElement.requestFullscreen();
//   }
// };
// const imgToVideo = () => {
//   el.main.removeEventListener("click", imgToVideo);
//   el.main.className = "";
//   el.main.innerHTML = `
//     <div id="player">
//       <video src="${MEDIA_PATH}video.mp4" autoplay loop></video>
//       <section id="toolbar">
//         <progress id="playing-bar" min="0" value="0"></progress>
//         <div>
//           <button id="stop-and-play-btn">정지</button>
//           볼륨 <progress id="sound-bar" min="0" max="1"></progress>
//         </div>
//         <div>
//           <button id="full-btn">전체화면</button>
//         </div>
//       </div>
//     </div>
//   `;
//   const video = document.querySelector("video") as HTMLVideoElement;
//   const soundProgress = document.querySelector(
//     "#sound-bar"
//   ) as HTMLProgressElement;
//   const fullScreenButton = document.querySelector(
//     "#full-btn"
//   ) as HTMLButtonElement;
//   const stopAndPlayButton = document.querySelector(
//     "#stop-and-play-btn"
//   ) as HTMLButtonElement;
//   video.volume = options.volume;
//   soundProgress.value = options.volume;
//   const videoControll = () => {
//     videoToolbarRender(video?.paused);
//     video.paused ? video.play() : video.pause();
//   };
//   video.addEventListener("loadeddata", () => {
//     options.playTotal = video.duration;
//   });
//   video.addEventListener("timeupdate", () => {
//     options.playNow = video.currentTime;
//     playingBarRender();
//   });
//   video.addEventListener("click", videoControll);
//   stopAndPlayButton.addEventListener("click", videoControll);
//   document.documentElement.onfullscreenchange = onFullScreenChange;
//   fullScreenButton.addEventListener("click", onFullScreenButtonClick);
// };
// const init = () => {
//   // 이벤트 방지
//   document.oncontextmenu = () => false;
//   document.onselectstart = () => false;
//   document.ondragstart = () => false;
//   document.onkeydown = () => false;
//   // 초기 설정
//   el.main.className = "not-play";
//   el.main.addEventListener("click", imgToVideo);
// };
// // init();
