<template>
    <div class="acs_layoutBox" ref="layoutBox">
        <slot name="hookHd"></slot>
        <slot></slot>
        <slot name="hookFt"></slot>
    </div>
</template>

<script>


export default {
    name: 'ac-layout-box',
    props: {
        scrollTop: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            myScrollTop: this.scrollTop,
            tempScrollTop: this.scrollTop,
            isInit: false,
            isLock: false
        }
    },
    watch: {
        scrollTop (newVal) {
            this.myScrollTop = newVal;
        },
        myScrollTop (newVal) {
            this.$emit('scrollTop:update', newVal);
        }
    },
    mounted () {
        this.initScroll();
    },
    methods: {
        initScroll () {
            const layoutBox = this.$refs.layoutBox;
            if (!this.isInit) {
                this.isInit = true;
                layoutBox && layoutBox.addEventListener('scroll', (evt) => {
                    if (this.isLock) {
                        return;
                    }

                    if (Math.abs(this.tempScrollTop - evt.target.scrollTop) > 20) {
                        this.tempScrollTop = evt.target.scrollTop;
                        this.myScrollTop = evt.target.scrollTop;
                    }
                })
            }
            this.myScrollTop += 1;
        }
    }
}
</script>
