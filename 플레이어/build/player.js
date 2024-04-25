export class Player {
    // 생성자 (initial)
    constructor(props) {
        this.url = { thumb: "", video: "" };
        this.options = { duration: 0, currentTime: 0, volume: 0 };
        const { el, thumb, video } = props;
        if (!el) {
            console.error("The Player module requires a flat element.");
            return;
        }
        this.container = document.querySelector(el);
        this.url.thumb = thumb;
        this.url.video = video;
        this.id = "player-" + Date.now().toString();
        this.container.classList.remove(el === null || el === void 0 ? void 0 : el.replace(/(\#|\.)/g, ""));
        this.container.classList.add("yet");
        this.container.id = this.id;
        this.createHeader();
        this.createInitialEvent();
    }
    // 시간 포맷
    timeFormat(time) {
        let m = Math.floor(time / 60);
        let s = Math.floor(time % 60);
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;
        let result = m + ":" + s;
        return result;
    }
    // 스크립트, 스타일 생성
    createHeader() {
        const color = {
            bg: "#000000",
            toolbarBg: "#00000080",
            icon: "#ffffff90",
            iconHover: "#ffffff",
            btnBg: "#ffffff20",
            startBtn: "#dd3333",
        };
        const styleCode = `
      #${this.id} {
        width: 400px;
        width: 100%;
        min-width: 350px;
        max-height: 600px;
        aspect-ratio: 1920/1080;
        overflow: hidden;
        position: relative;
        background-color: ${color.bg};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
      }
      #${this.id}:hover .tool-bar {
        transform: translateY(0);
      }
      #${this.id}.pause .tool-bar {
        transform: translateY(0) !important;
      }
      #${this.id} video, ${this.id} img {
        display: block;
        object-fit: contain;
        width: 100%;
        height: 100%;
      }
      #${this.id} button {
        min-width: 32px;
        max-width: 32px;
        min-height: 32px;
        max-height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        color: ${color.icon};
        font-size: 20px;
        cursor: pointer;
        border: none;
        background-color: transparent;
        transition: 0.2s;
      }
      #${this.id} button:hover {
        background-color: ${color.btnBg};
        color: ${color.iconHover};
      }
      #${this.id}.yet {
        background-image: url("./assets/img.png");
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
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
        background-color: ${color.startBtn};
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
      #${this.id} .tool-bar {
        position: absolute;
        width: calc(100% - 20px);
        bottom: 10px;
        left: 10px;
        padding: 5px;
        background: ${color.toolbarBg};
        border-radius: 10px;
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: center;
        transition: .2s;
        transform: translateY(calc(100% + 10px));
      }
      #${this.id} .tool-bar .time-display {
        font-size: 12px;
        letter-spacing: .5px;
        color: ${color.icon};
        white-space: nowrap;
        min-width: 90px;
        text-align: center;
      }
      #${this.id} .progress {
        width: 100%;
        height: 6px;
        background-color: ${color.btnBg};
        cursor: pointer;
        overflow: hidden;
        border-radius: 10px;
      }
      #${this.id} .progress > div {
        width: 0%;
        height: 100%;
        transition: width 0.1s;
        background-color: ${color.icon};
      }
      #${this.id} .option-container {
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: center;
      }
      #${this.id} .option-container .sound-progress-bar {
        width: 80px;
      }
    `;
        // 스크립트
        const script = document.createElement("script");
        script.src =
            "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js";
        script.type = "module";
        // 스타일
        const style = document.createElement("style");
        style.innerHTML = styleCode;
        document.head.appendChild(script);
        document.head.appendChild(style);
    }
    // 기본 이벤트 생성
    createInitialEvent() {
        this.container.oncontextmenu = (e) => e.preventDefault();
        this.container.onclick = this.onCreateVideo.bind(this);
    }
    // 비디오 세트 생성
    createElement() {
        this.video = document.createElement("video");
        this.video.src = this.url.video;
        this.video.autoplay = true;
        this.video.loop = true;
        // 툴바 컨테이너
        this.toolBar = document.createElement("div");
        this.toolBar.classList.add("tool-bar");
        // 재생 버튼
        this.playBtn = document.createElement("button");
        this.playBtn.innerHTML = `<ion-icon name="play"></ion-icon>`;
        // 재생 시간
        this.timeDisplay = document.createElement("div");
        this.timeDisplay.classList.add("time-display");
        // 비디오 진행바
        this.videoProgressBar = document.createElement("div");
        this.videoProgressBar.classList.add("progress");
        this.videoProgressBar.classList.add("video-progress-bar");
        this.videoProgressBar.innerHTML = "<div></div>";
        // 볼륨 버튼
        this.soundBtn = document.createElement("button");
        this.soundBtn.innerHTML = `<ion-icon name="volume-medium"></ion-icon>`;
        // 볼륨 조절바
        this.soundProgressBar = document.createElement("div");
        this.soundProgressBar.classList.add("progress");
        this.soundProgressBar.classList.add("sound-progress-bar");
        this.soundProgressBar.innerHTML = "<div></div>";
        // 전체화면 버튼
        this.fullScreenBtn = document.createElement("button");
        this.fullScreenBtn.innerHTML = `<ion-icon name="scan"></ion-icon>`;
        // 옵션 컨테이너
        const optionContainer = document.createElement("div");
        optionContainer.classList.add("option-container");
        // 옵션 세트 결합
        optionContainer.appendChild(this.soundBtn);
        optionContainer.appendChild(this.soundProgressBar);
        optionContainer.appendChild(this.fullScreenBtn);
        // 툴바 세트 결합
        this.toolBar.appendChild(this.playBtn);
        this.toolBar.appendChild(this.videoProgressBar);
        this.toolBar.appendChild(this.timeDisplay);
        this.toolBar.appendChild(optionContainer);
        this.container.appendChild(this.video);
        this.container.appendChild(this.toolBar);
        this.createActionEvent();
    }
    // 영상 생성
    onCreateVideo() {
        this.container.onclick = null;
        this.container.classList.remove("yet");
        this.createElement();
    }
    // 영상 조회 콜백
    onLoadedData() {
        var _a;
        this.options.duration = (_a = this.video.duration) !== null && _a !== void 0 ? _a : 0;
        this.options.volume = this.video.volume;
        this.progressRender();
        this.buttonAndScreenRender();
        this.textRender();
    }
    // 영상 재생 콜백
    onTimeUpdate() {
        this.options.currentTime = this.video.currentTime;
        this.progressRender();
        this.textRender();
    }
    // 재생 버튼 클릭 콜백
    onPlayBtnClick() {
        this.video[this.video.paused ? "play" : "pause"]();
        this.buttonAndScreenRender();
    }
    // 볼륨 버튼 클릭 콜백
    onSoundBtnClick() {
        this.video.muted = !this.video.muted;
        this.buttonAndScreenRender();
    }
    // 전체화면 버튼 클릭 콜백
    onFullScreenBtnClick() {
        let isFullScreen = !!document.fullscreenElement;
        if (!isFullScreen)
            return this.container.requestFullscreen();
        return document.exitFullscreen();
    }
    // 영상 진행바 클릭 콜백
    onVideoProgressBarClick(e) {
        var _a;
        const target = ((_a = e === null || e === void 0 ? void 0 : e.currentTarget) !== null && _a !== void 0 ? _a : e === null || e === void 0 ? void 0 : e.target);
        let result = this.options.duration * ((e === null || e === void 0 ? void 0 : e.offsetX) / (target === null || target === void 0 ? void 0 : target.clientWidth));
        this.video.currentTime = result;
        this.options.currentTime = result;
        this.textRender();
        this.progressRender();
    }
    // 볼륨바 클릭 콜백
    onSoundProgressBarClick(e) {
        var _a;
        const target = ((_a = e === null || e === void 0 ? void 0 : e.currentTarget) !== null && _a !== void 0 ? _a : e === null || e === void 0 ? void 0 : e.target);
        let result = (e === null || e === void 0 ? void 0 : e.offsetX) / (target === null || target === void 0 ? void 0 : target.clientWidth);
        this.options.volume = result;
        this.video.volume = result;
        this.progressRender();
    }
    // 액션 이벤트
    createActionEvent() {
        this.video.onloadeddata = this.onLoadedData.bind(this);
        this.video.ontimeupdate = this.onTimeUpdate.bind(this);
        this.video.onclick = this.onPlayBtnClick.bind(this);
        this.video.ondblclick = this.onFullScreenBtnClick.bind(this);
        this.playBtn.onclick = this.onPlayBtnClick.bind(this);
        this.soundBtn.onclick = this.onSoundBtnClick.bind(this);
        this.fullScreenBtn.onclick = this.onFullScreenBtnClick.bind(this);
        this.videoProgressBar.onmousedown = (e) => {
            this.onVideoProgressBarClick(e);
        };
        this.videoProgressBar.onmouseup = (e) => {
            this.onVideoProgressBarClick(e);
        };
        this.soundProgressBar.onmousedown = (e) => {
            this.onSoundProgressBarClick(e);
        };
        this.soundProgressBar.onmouseup = (e) => {
            this.onSoundProgressBarClick(e);
        };
    }
    // 프로그래스 랜더
    progressRender() {
        // 영상 퍼센트
        const videoPercent = (this.options.currentTime / this.options.duration) * 100;
        const videoProgressBar = this.videoProgressBar
            .children[0];
        videoProgressBar.style.width = videoPercent + "%";
        // 볼륨 퍼센트
        const soundPercent = (this.options.volume / 1) * 100;
        const soundProgressBar = this.soundProgressBar
            .children[0];
        soundProgressBar.style.width = soundPercent + "%";
    }
    // 버튼, 스크린 랜더
    buttonAndScreenRender() {
        // 재생 버튼
        let playBtnIconName = this.video.paused ? "play" : "pause";
        this.playBtn.innerHTML = `<ion-icon name="${playBtnIconName}"></ion-icon>`;
        // 볼륨 버튼
        let soundBtnIconName = !this.options.volume
            ? "volume-mute"
            : "volume-medium";
        if (this.video.muted) {
            soundBtnIconName = "volume-mute";
        }
        else {
            soundBtnIconName = "volume-medium";
        }
        this.soundBtn.innerHTML = `<ion-icon name="${soundBtnIconName}"></ion-icon>`;
        // 스크린
        let isPause = this.video.paused;
        this.container.className = isPause ? "pause" : "play";
    }
    // 텍스트 랜더
    textRender() {
        // 영상 시간
        const videoTotalTime = this.timeFormat(~~this.options.duration);
        const videoCurrentTime = this.timeFormat(~~this.options.currentTime);
        this.timeDisplay.innerText = `${videoCurrentTime} / ${videoTotalTime}`;
    }
}
