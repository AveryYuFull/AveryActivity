<template>
    <div class="ac_shake-ball"
        :class="rokerAnimateClassName"
        @click="shakeBall">
        <div class='ac_staff'></div>
        <div class='ac_ball'></div>
    </div>
</template>

<script>

// 空字符串
const STRING_EMPTY = '';
// 摇杆动画的class名
const ANIMATION_CLASS = 'rokerAnimate';

const COMPONENT_NAME = 'ac-shake-ball';

export default {
    name: COMPONENT_NAME,
    props: {
        status: { // 0为未开始，1为开始，2为隐藏还未显示反面图，3为显示反面图结束
            type: Number,
            default: 0
        },
        startCb: {
            type: Function
        }
    },
    data () {
        return {
            rokerAnimateClassName: '',
            myStatus: this.status,
            ballLocked: false
        };
    },
    methods: {
        shakeBall () {
            const _that = this;
            if (_that.ballLocked) {
                return;
            }

            _that.ballLocked = true;
            _that.rokerAnimateClassName = 'rokerAnimate';
            setTimeout(() => {
                _that.rokerAnimateClassName = '';
                startRaceLampAnimation();
            }, 800);

            /**
             * 开启动画
             */
            function startRaceLampAnimation () {
                let res = null;
                if (_that.startCb instanceof Function) {
                    res = _that.startCb();
                }
                if (res instanceof Promise) {
                    res.then((err) => {
                        if (!err) {
                            startShakeBall();
                        } else {
                            _that.ballLocked = false;
                        }
                    }, () => {
                        _that.ballLocked = false;
                    });
                } else {
                    if (!res) {
                        startShakeBall();
                    } else {
                        _that.ballLocked = false;
                    }
                }

                /**
                 * 开始启动摇杆
                 */
                function startShakeBall () {
                    _that.myStatus = 1;
                }
            }
        }
    },
    watch: {
        myStatus (newVal) {
            this.$emit('update:status', newVal);
            if (newVal === 3) {
                this.ballLocked = false;
            }
            // if (newVal === 1) {
            //     this.startShakeBall();
            // }
        },
        status (newVal) {
            this.myStatus = newVal;
        }
    }
};
</script>

<style lang='scss'>
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

@keyframes shakeStaff {
    0% {
        transform: rotateX(0deg);
    }
    50% {
        transform: rotateX(-50deg);
    }
    100% {
        transform: rotateX(0deg);
    }
}

@keyframes shakeBall {
    0% {
        top: -108px;
        left: 8px;
        transform: scale(1);
    }
    50% {
        top: -95px;
        left: 10px;
        transform: scale(1.1);
    }
    100% {
        top: -108px;
        left: 8px;
        transform: scale(1);
    }
}

.ac_shake-ball {
    background: url(./imgs/dz.png) no-repeat center / 100%;
    // position: absolute;
    width: 36px;
    height: 60px;
    // right: -32px;
    // top: 50%;
    // transform: translateY(-20%);
    perspective: 300;
    -webkit-perspective: 300;
    .ac_staff {
        background: url(./imgs/gan.png) no-repeat center / 100%;
        width: 24px;
        height: 94px;
        position: absolute;
        top: -82px;
        left: 10px;
        transform: rotateX(0deg);
        transform-origin: 50% 100%;
        -webkit-transform-origin: 50% 100%;
    }
    .ac_ball {
        background: url('./imgs/ball.png') no-repeat center / 100%;
        width: 40px;
        height: 40px;
        position: absolute;
        top: -108px;
        left: 8px;
        transform: scale(1) translateZ(0);
        transform-origin: 50% 50%;
        -webkit-transform-origin: 50% 50%;
    }
    &.rokerAnimate {
        .ac_staff {
            animation: shakeStaff 0.8s ease-in-out infinite;                    
        }
        .ac_ball {
            animation: shakeBall 0.8s ease-in-out infinite;                    
        }
    }
}
</style>
