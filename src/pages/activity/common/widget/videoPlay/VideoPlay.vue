<template>
    <div class="acs_videoPlay">
        <div class="ac_videoImg"
            @click="videoPlay"
            v-show="!videoDisplay">
            <ac-square-pic
                :isLazy="false"
                :imgUrl="myImgUrl">
                <ac-play-btn></ac-play-btn>
            </ac-square-pic>
        </div>
        <div class="ac_videoBox" 
            :class="[(seeFlag && playFlag) ? 'ac_video-right-small' : '']"
            v-show="videoDisplay">
            <img class='ac_closeImg' 
                :src="closeIcon"
                v-show="seeFlag && playFlag"
                @click="onCloseBtnClick" />
            <video class='ac_video'
                ref="hook_video"
                controls="controls"
                preload="auto"
                width="100%"
                :style="{ width: seeFlag && playFlag ? '100%' : null, height: seeFlag && playFlag ? rightSmallHeight : null }"
                :poster="myImgUrl"
                :src="myVideoUrl"></video>
        </div>
    </div>
</template>
<script>
import closeIcon from './imgs/close.png';

export default {
    name: 'ac-video-play',
    props: {
        /**
         * 图片地址
         */
        imgUrl: {
            type: String
        },
        /**
         * 视频地址
         */
        videoUrl: {
            type: String
        },
        scrollTop: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            closeIcon: closeIcon, // close按钮
            videoDisplay: false,
            isWifi: false,
            playFlag: false, // 视频是否正在播放
            seeFlag: false // 是否可以看到小播放器窗口
        };
    },
    watch: {
        scrollTop (nowVal) {
            this.handleScroll();
        }
    },
    computed: {
        /**
         * 过滤一下图片地址
         * @returns {String} 返回新的图片地址
         */
        myImgUrl () {
            const imgUrl = this.imgUrl || '';
            return imgUrl.replace(/img\d\./, 'img4.');
        },
        /**
         * 过滤一下1视频地址
         * @returns {String} 返回新的视频地址
         */
        myVideoUrl () {
            const videoUrl = this.videoUrl || '';
            return videoUrl.replace(/img\d\./, 'img4.');
        }
    },
    created () {
        this.isUnableAutoPlay = false; // 视频可否自动播放
        this.MAX_NUM_OF_GETTING_NET = 5; // 最多可以尝试获取网络类型（默认为5次）
        this.numOfGettingNet = 0; // 尝试获取网络的次数
        this.enabledPause = true; // 是否允许暂停播放器
        this.rightSmallHeight = '102px'; // 右上角播放器的高度
    },
    async mounted () {
        const averyVideo = this.$refs['hook_video'];
        if (averyVideo) {
            averyVideo.load();

            averyVideo.setAttribute('x-webkit-airplay', true);
            averyVideo.setAttribute('x5-playsinline', '');
            averyVideo.setAttribute('playsinline', '');
            averyVideo.setAttribute('webkit-playsinline', '');
            averyVideo.setAttribute('x5-video-player-type', '');

            averyVideo.onplay = () => {
                this.isUnableAutoPlay = false;
                this.playFlag = true;
            };
            averyVideo.onpause = () => {
                if (this.enabledPause) {
                    this.isUnableAutoPlay = true;
                    this.playFlag = false;
                } else {
                    // 重置
                    this.enabledPause = true;
                }
            };
        }

        if (this.$tuhu.device().tuhuAndroid) {
            this.$tuhu.actionWidthAndroid('setVideoScreen', {config: '3'});
        }

        if (this.$tuhu.device().isApp) {
            await this.getNetWorkStatus();
        }
        // this.scrollDom.addEventListener('scroll', this.handleScroll);
        if (this.$tuhu.device().tuhuAndroid) {
            // 如果在android 途虎app环境下，当调用原生的VideoPlay接口时，然后原生就会调用这个windows方法
            window.onVideoPlay = () => {
                this.videoPlay();
            };
        }
    },
    beforeDestroy () {
        // this.scrollDom.removeEventListener('scroll', this.handleScroll);
        window.onVideoPlay = null;
    },
    methods: {
        /**
         * 获取网络
         */
        getNetWorkStatus () {
            ++this.numOfGettingNet;
            const getDeviceDetail = this.$tuhu.actionWithNative('deviceDetail');
            if (getDeviceDetail instanceof Function) {
                getDeviceDetail().then((data) => {
                    if (data && data.netWork === 'none' && this.numOfGettingNet < this.MAX_NUM_OF_GETTING_NET) {
                        this.getNetWorkStatus();
                    } else {
                        this.isWifi = (data && data.netWork === 'wifi');
                    }
                });
            }
        },
        /**
         * 当点击右上角的关闭按钮时，暂停视频播放且将右上角的小视频播放窗口关闭掉
         */
        onCloseBtnClick () {
            const averyVideo = this.$refs['hook_video'];
            averyVideo && averyVideo.pause();
        },

        videoPlay () {
            const averyVideo = this.$refs['hook_video'];
            if (averyVideo) {
                averyVideo.load();
                averyVideo.play();
            }
            if (this.$tuhu.device().tuhuAndroid && this.$tuhu.device().isWeixin) {
                this.setFullScreen();
            } else {
                this.videoDisplay = true;
            }
        },

        setFullScreen() {
            const averyVideo = this.$refs['hook_video'];
            if (averyVideo) {
                if (averyVideo.requestFullscreen) {
                    averyVideo.requestFullscreen();
                } else if (averyVideo.webkitRequestFullscreen) {
                    averyVideo.webkitRequestFullScreen();
                }
            }
        },

        handleScroll () {
            // 默认时允许暂停播放器
            this.enabledPause = true;
            const offset = this.$el.getBoundingClientRect();
            const offsetTop = offset.top;
            const offsetBottom = offset.bottom;
            const offsetHeight = offset.height;

            if (offsetBottom >= 0 && offsetTop <= window.innerHeight) {
                if (!this.isUnableAutoPlay && !this.playFlag && this.isWifi) {
                    if (this.$tuhu.device().tuhuAndroid) {
                        this.$tuhu.actionWidthAndroid('VideoPlay');
                    } else {
                        this.videoPlay();
                    }
                }
                this.seeFlag = false;
            } else if (!this.seeFlag) {
                this.seeFlag = true;
                // 当滚动到播放器不在视口范围内时，就不允许暂停播放器
                this.enabledPause = false;
            }
        }
    }
};
</script>
<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_videoPlay {
    position: relative;
    .ac_videoImg {
        &:after {
            position: absolute;
            content: '';
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: rgba(0,0,0,.5);
            z-index: 5;
        }
    }
    .ac_videoBox {
        display: block;
        height: 0;
        padding-top: 56.25%;
        position: relative;
    }
    .ac_video{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: $color0;
    }
    .ac_videoPlay-box{
        display: inline-block;
        width: 100%;
    }
    .acs_square-pic {
        padding-top: 56.25%;
    }
    .ac_video-right-small {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 9999;
        width: 48%;
        transform: translateZ(0);
        .ac_closeImg {
            position: fixed;
            transform: translateZ(0);
            top: 0px;
            right: 100%;
            width: 25px;
            height: 25px;    
            background-color: #ccc;
            z-index: 999;
        }
    }
}
</style>
