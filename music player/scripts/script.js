new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Tarte de Limão",
          artist: "Sofia Aguiar",
          cover:
            "https://images.unsplash.com/photo-1586718418497-76bcc1e1dbfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80",
          source: "music player/mp3/1.mp3",
          url: "https://www.instagram.com/sumugz",
          favorited: false,
        },
        {
          name: "Everybody Knows",
          artist: "Sofia Aguiar",
          cover:
            "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg",
          source: "music player/mp3/2.mp3",
          url: "https://www.instagram.com/sumugz",
          favorited: true,
        },
        {
          name: "Extreme Ways",
          artist: "Sofia Aguiar",
          cover:
            "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/3.jpg",
          source: "music player/mp3/3.m4a",
          url: "https://www.instagram.com/sumugz",
          favorited: false,
        },
        {
          name: "Butterflies",
          artist: "Sofia Aguiar",
          cover:
            "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/4.jpg",
          source:
            "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/4.mp3",
          url: "https://www.instagram.com/sumugz",
          favorited: false,
        },
        {
          name: "The Final Victory",
          artist: "Haggard",
          cover:
            "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/5.jpg",
          source:
            "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/5.mp3",
          url: "https://www.instagram.com/sumugz",
          favorited: true,
        },
        {
          name: "Genius ft. Sia, Diplo, Labrinth",
          artist: "LSD",
          cover:
            "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/6.jpg",
          source:
            "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/6.mp3",
          url: "https://www.instagram.com/sumugz",
          favorited: false,
        },
        {
          name: "The Comeback Kid",
          artist: "Lindi Ortega",
          cover:
            "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/7.jpg",
          source:
            "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/7.mp3",
          url: "https://www.instagram.com/sumugz",
          favorited: true,
        },
        {
          name: "Overdose",
          artist: "Grandson",
          cover:
            "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg",
          source:
            "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/8.mp3",
          url: "https://www.instagram.com/sumugz",
          favorited: false,
        },
        {
          name: "Rag'n'Bone Man",
          artist: "Human",
          cover:
            "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
          source:
            "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/9.mp3",
          url: "https://www.instagram.com/sumugz",
          favorited: false,
        },
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null,
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if (this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited =
        !this.tracks[this.currentTrackIndex].favorited;
    },
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function () {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function () {
      vm.generateTime();
    };
    this.audio.onended = function () {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement("link");
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image";
      document.head.appendChild(link);
    }
  },
});
