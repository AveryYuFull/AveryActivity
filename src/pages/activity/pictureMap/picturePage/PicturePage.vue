<template>
    <div class="acs_picture-page">
        <ac-picture-cont
            class="ac_picture-list"
            :list="list" v-if="list"
            @click="$emit('click', $event)"></ac-picture-cont>
    </div>
</template>
<script>
import AcPictureMapExtend from '../common/pictureMapExtend/PictureMapExtend';
import AcPictureCont from './pictureCont/PictureCont';

export default {
    extends: AcPictureMapExtend,
    name: 'ac-picture-page',
    props: {
        // /**
        //  * 模块数据
        //  */
        // moduleData: {
        //     type: Object
        // }
    },
    components: {
        AcPictureCont
    },
    computed: {
    },
    data() {
        return {
            list: null
        };
    },
    created() {
        this.initData();
    },
    methods: {
        /**
         * 初始化数据
         */
        initData() {
            let moduleData = this.moduleData;
            if (moduleData) {
                if (moduleData._isGet) {
                    this.setData(moduleData._getData);
                    delete moduleData._getData;
                    delete moduleData._isGet;
                } else {
                    this.getData();
                }
            }
        },
        /**
         * 获取数据
         */
        getData() {
            let moduleData = this.moduleData;
            if (!moduleData) {
                console.error('moduleData');
                return;
            }
            this.getModuleDetail(moduleData)
                .subscribe(data => {
                    this.setData(data);
                });
        },
        /**
         * 设置当前模块数据
         * @param {Object} data 数据
         */
        setData(data) {
            let _data = data && data.Data;
            let _module = _data[0] && _data[0].Module;
            this.list = _module && _module.InfoList;
        }
    }
};
</script>
<style lang="scss">
.acs_picture-page {
    .ac_picture-list{

    }
}
</style>
