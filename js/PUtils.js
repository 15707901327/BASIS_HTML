var PUtils = PUtils || {};

(function (PUtils) {
  /**
   * html结构
   * <span id="musicControl">
   *   <a id="mc_play" class="stop" onclick="play_music();">
   *     <audio id="musicfx" loop="loop">
   *       <source src="../music/mp3/AL Rocco、小安迪 - China Wave (Live).mp3" type="audio/mpeg">
   *     </audio>
   *   </a>
   * </span>
   * @param url 播放的路径
   * @param options
   *  container：挂载点 《body》
   *  autoplay：是否自动播放 false
   *  loop: 控制是否循环播放 true
   * @constructor
   */
  PUtils.MusicControl = function (url, options) {
    options = options || {};

    this.url = url;
    this.container = options.container !== undefined ? options.container : document.getElementsByTagName("body")[0];
    this.autoplay = options.autoplay !== undefined ? options.autoplay : false;
    this.loop = options.loop !== undefined ? options.loop : true;

    this.aNode = document.createElement("a");
    this.audioNode = document.createElement("audio");

    this._createDom();
  };
  Object.assign(PUtils.MusicControl.prototype, {
    // 创建dom结构
    _createDom: function () {
      var controlNode = document.createElement("div");
      controlNode.id = "musicControl";

      this._playMusic = this._bind(this, this.playMusic);
      this.aNode.addEventListener("click", this._playMusic);

      this.audioNode.loop = this.loop;
      if (this.autoplay) {
        this.justPlay();
      } else {
        this.justPause();
      }

      var sourceNode = document.createElement("source");
      sourceNode.src = this.url;
      sourceNode.type = "audio/mpeg";

      this.audioNode.appendChild(sourceNode);
      this.aNode.appendChild(this.audioNode);
      controlNode.appendChild(this.aNode);
      this.container.appendChild(controlNode);
    },
    /**
     * 播放音乐
     */
    justPlay: function () {
      try{
        this.audioNode.play();
      } catch (e) {
        this.audioNode.autoplay = true;
      }
      this.aNode.setAttribute("class", "on");
    },
    /**
     * 播放音乐
     */
    justPause: function () {
      this.audioNode.pause();
      this.aNode.setAttribute("class", "stop");
    },
    /**
     * 控制播放音乐
     */
    playMusic: function () {
      if (this.aNode.getAttribute("class") === "on") {
        this.justPause();
      } else {
        this.justPlay();
      }
    },
    _bind: function (scope, fn) {
      return function () {
        fn.apply(scope, arguments);
      };
    }
  });
})(PUtils);