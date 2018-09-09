<template>
    <ac-lottery-broadcast
        :item-data="itemData"
        :img-urls="imgUrls">
    </ac-lottery-broadcast>
</template>

<script>
import outImg from './imgs/outImg.png';
import innerImg from './imgs/innerImg.png';
import { selectPack } from '../../../api/httpClient';

export default {
    props: {
        hashKey: {
            type: String
        }
    },
    data () {
        return {
            imgUrls: [
                outImg,
                innerImg
            ],
            itemData: null
        };
    },
    methods: {
        /**
         * 获取中奖播报数据
         */
        getLotterList () {
            const params = {
                hashKey: this.hashKey
            };
            selectPack(this.$http, params)
                .subscribe(res => {
                    try {
                        if (res) {
                            const itemData = JSON.parse(res);
                            this.itemData = itemData.map((item, index) => {
                                return `${item.Phone}  抽中了 <span class="ac_item-bonusPrice">${item.Name}</span>`;
                            });
                        }
                    } catch (err) {};
                });
        }
    },
    created () {
        this.getLotterList();
    }
};
</script>
