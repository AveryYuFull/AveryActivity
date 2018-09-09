<template>
    <div class="ac_tagItem-box" :class="{promotion: tagItem.styleType === 0}">
        <t-tag
            class="ac_tagItem"
            v-if="tagItem && tagItem.nameText"
            :nameText="tagItem.nameText"
            :class="getClassName(tagItem.styleType)">
        </t-tag>
    </div>
</template>

<script>
    export default {
        props: {
            /**
             * tag项数据
             */
            tagItem: {
                type: Object
            }
        },
        created() {
            // console.log(this.tagItem);
        },
        methods: {
            /**
         * 获取className
         * @param {String} type 类型
         * @returns {String}
         */
            getClassName(type) {
                let res;
                switch (type + '') {
                    case '0':
                        res = 'ac_tag';
                        break;
                    case '1':
                        res = 'ac_tag-bg-red';
                        break;
                    case '2':
                        res = 'ac_tag-outline-red';
                        break;

                    default:
                        res = 'ac_tag';
                        break;
                }
                return res;
            }
        }
    };
</script>

<style lang="scss">
.ac_tagItem-box{
    position: relative;
    display: inline-block;
    margin-left: 3px;
    font-size: 0;
    &:first-child{
        margin-left: 0;
    }
    &.promotion{
        flex: 1;
    }
}
</style>
