<template>
    <div class="acs_tagList" v-if="myTags">
        <tag-item
            v-for="(tagItem, index) in myTags"
            :tagItem="filterTag(tagItem)"
            :key="index">
        </tag-item>
        <!-- <t-tag :text="'包安装'" class="acs_outline-red"></t-tag> -->
    </div>
</template>

<script>
import TagItem from './tagItem/TagItem';
import GoodsExtent from '../../goodsItem/common/goodsExtent/GoodsExtent';
export default {
    name: 'ac-tag-list',
    extends: GoodsExtent,
    props: {
        /**
         * tag数据(type:)
         */
        tags: {
            type: [Array, Object]
        }
    },
    data() {
        let _that = this;
        return {
            myTags: _that.filterTagsConfig(_that.tags)
        };
    },
    components: {
        TagItem
    },
    watch: {
        tags(nowVal) {
            this.myTags = this.filterTagsConfig(nowVal);
        }
    },
    methods: {

        /**
         * 过滤tags
         * @param {Array|Object} tags 传入的
         * @returns {Array}
         */
        filterTagsConfig(tags) {
            let res;
            if (tags instanceof Array) {
                res = tags;
            } else if (tags instanceof Object) {
                res = [tags];
            }
            return res;
        },
        /**
         * 过滤数据
         * @param {Object} item 数据
         * @return {Object}
         */
        filterTag(item) {
            let _item = item;
            // console.log(this.tagFilter);
            if (this.tagFilter instanceof Function) {
                _item = this.tagFilter(item);
            }

            return _item;
        }
        // filterItem(item) {
        //     return
        // }
    }
};
</script>

<style lang="scss">
@import "style/_public/_var.scss";
@import "style/_public/_mixin.scss";
@import "style/_public/_iconFont.scss";

.acs_tagList {
    display: flex;
    white-space: nowrap;
    width: 100%;
    font-size: 0;
    .ths_tag {
        &:first-child{
            margin-left: 0;
        }
        .th_tag-cont {
            line-height: 1.6;
            width: 100%;
            &::before{
                width: 200%;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        margin-left: 3px;
    }
    .ac_tag{
        @include lineClamp(1);
        border-color: transparent;
        color: $colorRed;
        position: absolute;
        padding: 0;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
    .ac_tag-outline-red {
        border-color: $brRed;
        color: $colorRed;
        padding: 0 2px;
        &:after{
            border-color: $brRed;
        }
    }
    .ac_tag-bg-red {
        background-color: $bgRed;
        color: $colorf;
        border-radius: 2px;
        &:after{
            border-color: $brRed;
        }
    }
}
</style>
