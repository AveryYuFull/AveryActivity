<template>
    <ac-layout-box class="acs_newLayout"
        :scrollTop.sync="myScrollTop">
        <ac-header slot="hookHd" v-if="myIsHeader">
            <slot name="hookHd"></slot>
        </ac-header>
        <ac-body>
            <slot></slot>
        </ac-body>
        <ac-footer slot="hookFt">
            <slot name="hookFt"></slot>
        </ac-footer>
    </ac-layout-box>
</template>

<script>
import AcLayoutBox from './layoutBox/LayoutBox';
import AcHeader from './header/Header';
import AcBody from './body/Body';
import AcFooter from './footer/Footer';

import { Browser } from 'tiger-lib';

// footer存在的类
const AC_FOOTER_ACTIVE = 'ac_footer-active';

export default {
    name: 'ac-new-layout',
    components: {
        AcLayoutBox,
        AcHeader,
        AcBody,
        AcFooter
    },
    props: {
        isHeader: {
            type: Boolean,
            default: true
        },
        isFooter: {
            type: Boolean,
            default: true
        },
        scrollTop: {
            type: Number,
            default: 0
        },
        bdClassName: {
            type: Array || Object || String,
            default: ''
        }
    },
    data () {
        return {
            myIsHeader: this.isHeader,
            myIsFooter: this.isFooter,
            myScrollTop: this.scrollTop,
            myBdClassName: this.bdClassName,
            browser: Browser.browser,
            device: Browser.device
        }
    },
    watch: {
        isHeader () {
            this.setShowHeader();
        },
        isFooter () {
            this.setShowFooter();
        },
        scrollTop (newVal) {
            this.myScrollTop = newVal;
        },
        myScrollTop (newVal) {
            this.$emit('scrollTop:update', newVal);
        }
    },
    mounted () {
        this.initClassName();
        this.setShowHeader();
        this.setShowFooter();
        this.setBdClassName();
    },
    methods: {
        initClassName () {
            const _html = document.documentElement;
            this.browser.android && _html.classList.add('tiger-android');
            this.device.ios && _html.classList.add('tiger-ios');
        },
        setBdClassName () {
            const bdClassName = this.bdClassName;
            let myBdClass;
            if (bdClassName instanceof Array) {
                myBdClass = bdClassName.slice();
                this.myIsFooter && myBdClass.push(AC_FOOTER_ACTIVE);
            } else if (bdClassName instanceof Object) {
                myBdClass = Object.assign({}, bdClassName);
                if (this.myIsFooter) {
                    myBdClass[AC_FOOTER_ACTIVE] = true;
                }
            } else if (typeof bdClassName === 'string') {
                myBdClass = [bdClassName];
                this.myIsFooter && myBdClass.push(AC_FOOTER_ACTIVE);
            }
            this.myBdClassName = myBdClass || {};
        },
        setShowHeader () {
            const slots = this.$slots;
            const hookHd = slots && slots.hookHd;
            this.myIsHeader = this.isHeader && (hookHd && hookHd.length > 0);
        },
        setShowFooter () {
            const slots = this.$slots;
            const hookFt = slots && slots.hookFt;
            this.myIsFooter = this.isFooter && (hookFt && hookFt.length > 0);
            this.setBdClassName();
        }
    }
}
</script>

