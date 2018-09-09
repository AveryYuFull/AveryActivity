<template>
  <div class="_content">
    <div class="wrapper">
        <div class="citySelect">
            <div class="searchTop">
                <div class="searchcheck" id="searchId" readonly="">
                    <span></span>
                    输入城市名称或字母查询
                </div>
            </div>
            <div class="serchContent">
                <div class="currentcity">
                    <h3>定位城市</h3>
                    <div class="location disabled" style="display: none;">
                        <a><span></span>定位失败</a>
                    </div>
                    <div class="location" style=""><a><span></span>&nbsp;闸北区</a></div>
                </div>
                <div class="hotcity">
                    <h3>热门城市</h3>
                    <div class="hotlist">
                        <div class="item">
                            <a href="javascript:;">上海市</a><a href="javascript:;">北京市</a><a href="javascript:;">广州市</a><a href="javascript:;">深圳市</a><a href="javascript:;">南京市</a><a href="javascript:;">杭州市</a><a href="javascript:;">武汉市</a><a href="javascript:;">成都市</a>
                        </div>
                    </div>
                </div>
                <div class="slider">
                    <div class="slider-content">
                        <ul>
                            <li>                                               
                            </li><li>
                            </li><li>
                                <a class="title">A</a>
                                <ul class="cityul">
                                    <li>
                                        <a href="javascript:;">安图县</a>
                                    </li><li>
                                        <a href="javascript:;">安西县</a>
                                    </li><li>
                                        <a href="javascript:;">安溪县</a>
                                    </li><li>
                                        <a href="javascript:;">安县</a>
                                    </li><li>
                                        <a href="javascript:;">安乡县</a>
                                    </li><li>
                                        <a href="javascript:;">安新县</a>
                                    </li><li>
                                        <a href="javascript:;">安阳市</a>
                                    </li><li>
                                        <a href="javascript:;">安阳县</a>
                                    </li><li>
                                        <a href="javascript:;">安义县</a>
                                    </li><li>
                                        <a href="javascript:;">安远县</a>
                                    </li><li>
                                        <a href="javascript:;">安岳县</a>
                                    </li><li>
                                        <a href="javascript:;">安泽县</a>
                                    </li><li>
                                        <a href="javascript:;">敖汉旗</a>
                                    </li><li>
                                        <a href="javascript:;">阿荣旗</a>
                                    </li><li>
                                        <a href="javascript:;">阿图什市</a>
                                    </li><li>
                                        <a href="javascript:;">阿瓦提县</a>
                                    </li>
                                </ul>
                            </li><li>
                                <a class="title">B</a>
                                <ul class="cityul">
                                    <li>
                                        <a href="javascript:;">宾县</a>
                                    </li><li>
                                        <a href="javascript:;">宾阳县</a>
                                    </li><li>
                                        <a href="javascript:;">滨州市</a>
                                    </li><li>
                                        <a href="javascript:;">比如县</a>
                                    </li><li>
                                        <a href="javascript:;">博爱县</a>
                                    </li><li>
                                        <a href="javascript:;">博白县</a>
                                    </li><li>
                                        <a href="javascript:;">博尔塔拉蒙古自治州</a>
                                    </li><li>
                                        <a href="javascript:;">博湖县</a>
                                    </li><li>
                                        <a href="javascript:;">博乐市</a>
                                    </li><li>
                                        <a href="javascript:;">勃利县</a>
                                    </li><li>
                                        <a href="javascript:;">博罗县</a>
                                    </li><li>
                                        <a href="javascript:;">波密县</a>
                                    </li><li>
                                        <a href="javascript:;">泊头市</a>
                                    </li><li>
                                        <a href="javascript:;">博兴县</a>
                                    </li><li>
                                        <a href="javascript:;">博野县</a>
                                    </li><li>
                                        <a href="javascript:;">亳州市</a>
                                    </li><li>
                                        <a href="javascript:;">布尔津县</a>
                                    </li><li>
                                        <a href="javascript:;">布拖县</a>
                                    </li>
                                </ul>
                            </li><li>
                                <a class="title">C</a>
                                <ul class="cityul">
                                    <li>
                                        <a href="javascript:;">崇礼县</a>
                                    </li><li>
                                        <a href="javascript:;">重庆市</a>
                                    </li><li>
                                        <a href="javascript:;">崇仁县</a>
                                    </li><li>
                                        <a href="javascript:;">崇信县</a>
                                    </li><li>
                                        <a href="javascript:;">崇阳县</a>
                                    </li><li>
                                        <a href="javascript:;">崇义县</a>
                                    </li><li>
                                        <a href="javascript:;">崇州市</a>
                                    </li><li>
                                        <a href="javascript:;">崇左市</a>
                                    </li><li>
                                        <a href="javascript:;">淳安县</a>
                                    </li><li>
                                        <a href="javascript:;">淳化县</a>
                                    </li><li>
                                        <a href="javascript:;">楚雄彝族自治州</a>
                                    </li><li>
                                        <a href="javascript:;">楚雄市</a>
                                    </li><li>
                                        <a href="javascript:;">滁州市</a>
                                    </li><li>
                                        <a href="javascript:;">慈利县</a>
                                    </li><li>
                                        <a href="javascript:;">慈溪市</a>
                                    </li><li>
                                        <a href="javascript:;">磁县</a>
                                    </li><li>
                                        <a href="javascript:;">从化市</a>
                                    </li><li>
                                        <a href="javascript:;">从江县</a>
                                    </li><li>
                                        <a href="javascript:;">措美县</a>
                                    </li><li>
                                        <a href="javascript:;">错那县</a>
                                    </li><li>
                                        <a href="javascript:;">措勤县</a>
                                    </li>
                                </ul>
                            </li><li>
                                <a class="title">D</a>
                                <ul class="cityul">
                                    <li>
                                        <a href="javascript:;">东乡县</a>
                                    </li><li>
                                        <a href="javascript:;">东乡族自治县</a>
                                    </li><li>
                                        <a href="javascript:;">东兴市</a>
                                    </li><li>
                                        <a href="javascript:;">东阳市</a>
                                    </li><li>
                                        <a href="javascript:;">东营市</a>
                                    </li><li>
                                        <a href="javascript:;">东源县</a>
                                    </li><li>
                                        <a href="javascript:;">东至县</a>
                                    </li><li>
                                        <a href="javascript:;">都安瑶族自治县</a>
                                    </li><li>
                                        <a href="javascript:;">都昌县</a>
                                    </li><li>
                                        <a href="javascript:;">都江堰市</a>
                                    </li><li>
                                        <a href="javascript:;">都兰县</a>
                                    </li><li>
                                        <a href="javascript:;">都匀市</a>
                                    </li><li>
                                        <a href="javascript:;">杜尔伯特蒙古族自治县</a>
                                    </li><li>
                                        <a href="javascript:;">堆龙德庆县</a>
                                    </li><li>
                                        <a href="javascript:;">敦化市</a>
                                    </li><li>
                                        <a href="javascript:;">敦煌市</a>
                                    </li><li>
                                        <a href="javascript:;">多伦县</a>
                                    </li><li>
                                        <a href="javascript:;">独山县</a>
                                    </li>
                                </ul>
                            </li><li>
                                <a class="title">E</a>
                                <ul class="cityul">
                                    <li>
                                        <a href="javascript:;">峨边彝族自治县</a>
                                    </li><li>
                                        <a href="javascript:;">鄂尔多斯市</a>
                                    </li><li>
                                        <a href="javascript:;">额尔古纳市</a>
                                    </li><li>
                                        <a href="javascript:;">额济纳旗</a>
                                    </li><li>
                                        <a href="javascript:;">鄂伦春自治旗</a>
                                    </li><li>
                                        <a href="javascript:;">峨眉山市</a>
                                    </li><li>
                                        <a href="javascript:;">额敏县</a>
                                    </li><li>
                                        <a href="javascript:;">恩平市</a>
                                    </li><li>
                                        <a href="javascript:;">恩施土家族苗族自治州</a>
                                    </li><li>
                                        <a href="javascript:;">恩施市</a>
                                    </li><li>
                                        <a href="javascript:;">二连浩特市</a>
                                    </li><li>
                                        <a href="javascript:;">洱源县</a>
                                    </li><li>
                                        <a href="javascript:;">峨山彝族自治县</a>
                                    </li><li>
                                        <a href="javascript:;">鄂托克旗</a>
                                    </li><li>
                                        <a href="javascript:;">鄂托克前旗</a>
                                    </li><li>
                                        <a href="javascript:;">鄂温克族自治旗</a>
                                    </li><li>
                                        <a href="javascript:;">鄂州市</a>
                                    </li>
                                </ul>
                            </li><li>
                                <a class="title">F</a>
                                <ul class="cityul">
                                    <li>
                                        <a href="javascript:;">法库县</a>
                                    </li><li>
                                        <a href="javascript:;">繁昌县</a>
                                    </li><li>
                                        <a href="javascript:;">方城县</a>
                                    </li><li>
                                        <a href="javascript:;">防城港市</a>
                                    </li><li>
                                        <a href="javascript:;">方山县</a>
                                    </li><li>
                                        <a href="javascript:;">房县</a>
                                    </li><li>
                                        <a href="javascript:;">方正县</a>
                                    </li><li>
                                        <a href="javascript:;">范县</a>
                                    </li><li>
                                        <a href="javascript:;">繁峙县</a>
                                    </li><li>
                                        <a href="javascript:;">肥城市</a>
                                    </li><li>
                                        <a href="javascript:;">抚州市</a>
                                    </li>
                                </ul>
                            </li><li>
                                <a class="title">G</a>
                                <ul class="cityul">
                                    <li>
                                        <a href="javascript:;">噶尔县</a>
                                    </li><li>
                                        <a href="javascript:;">改则县</a>
                                    </li><li>
                                        <a href="javascript:;">盖州市</a>
                                    </li><li>
                                        <a href="javascript:;">甘德县</a>
                                    </li><li>
                                        <a href="javascript:;">岗巴县</a>
                                    </li><li>
                                        <a href="javascript:;">刚察县</a>
                                    </li><li>
                                        <a href="javascript:;">甘谷县</a>
                                    </li><li>
                                        <a href="javascript:;">甘洛县</a>
                                    </li><li>
                                        <a href="javascript:;">甘南藏族自治州</a>
                                    </li><li>
                                        <a href="javascript:;">甘南县</a>
                                    </li><li>
                                        <a href="javascript:;">甘泉县</a>
                                    </li><li>
                                        <a href="javascript:;">赣县</a>
                                    </li><li>
                                        <a href="javascript:;">固镇县</a>
                                    </li>
                                </ul>
                            </li><li>
                                <a class="title">Z</a>
                                <ul class="cityul">
                                    <li>
                                        <a href="javascript:;">杂多县</a>
                                    </li><li>
                                        <a href="javascript:;">赞皇县</a>
                                    </li><li>
                                        <a href="javascript:;">枣强县</a>
                                    </li><li>
                                        <a href="javascript:;">枣阳市</a>
                                    </li><li>
                                        <a href="javascript:;">枣庄市</a>
                                    </li><li>
                                        <a href="javascript:;">泽库县</a>
                                    </li><li>
                                        <a href="javascript:;">增城市</a>
                                    </li><li>
                                        <a href="javascript:;">泽普县</a>
                                    </li><li>
                                        <a href="javascript:;">泽州县</a>
                                    </li><li>
                                        <a href="javascript:;">札达县</a>
                                    </li><li>
                                        <a href="javascript:;">扎赉特旗</a>
                                    </li><li>
                                        <a href="javascript:;">扎兰屯市</a>
                                    </li><li>
                                        <a href="javascript:;">扎鲁特旗</a>
                                    </li><li>
                                        <a href="javascript:;">扎囊县</a>
                                    </li><li>
                                        <a href="javascript:;">张北县</a>
                                    </li><li>
                                        <a href="javascript:;">张家川回族自治县</a>
                                    </li><li>
                                        <a href="javascript:;">左云县</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div class="slider-nav">
                        <ul style="">
                            <li>定</li>
                            <li>热</li>
                            <li>A</li>
                            <li>B</li>
                            <li>C</li>
                            <li>D</li>
                            <li>E</li>
                            <li>F</li>
                            <li>G</li>
                            <li>H</li>
                            <li>J</li>
                            <li>K</li>
                            <li>L</li>
                            <li>M</li>
                            <li>N</li>
                            <li>P</li>
                            <li>Q</li>
                            <li>R</li>
                            <li>S</li>
                            <li>T</li>
                            <li>W</li>
                            <li>X</li>
                            <li>Y</li>
                            <li>Z</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>  
    <div class="searchPage slidein" style="display: none;">
        <div class="search">
            <label></label>
            <input type="text" autofocus="autofocus" class="searchtext" placeholder="搜索您想找的城市">
            <a class="cancel">取消</a>
            <div class="close" style="display: none;"></div>
        </div>
        <div class="searchResult">
            <div class="resultList">
                <div class="listItem">
                    <a href="javascript:;">阿坝藏族羌族自治州</a>
                    <a href="javascript:;">阿坝县</a>
                    <a href="javascript:;">阿巴嘎旗</a>
                    <a href="javascript:;">阿城市</a>
                    <a href="javascript:;">阿尔山市</a>
                    <a href="javascript:;">阿合奇县</a>
                    <a href="javascript:;">阿克塞哈萨克族自治县</a>
                    <a href="javascript:;">阿克苏地区</a>
                    <a href="javascript:;">阿克苏市</a>
                    <a href="javascript:;">阿克陶县</a>
                    <a href="javascript:;">阿拉尔市</a>
                    <a href="javascript:;">阿拉善盟</a>
                    <a href="javascript:;">阿拉善右旗</a>
                    <a href="javascript:;">阿拉善左旗</a>
                    <a href="javascript:;">阿勒泰地区</a>
                    <a href="javascript:;">阿勒泰市</a>
                    <a href="javascript:;">阿里地区</a>
                    <a href="javascript:;">阿鲁科尔沁旗</a>
                    <a href="javascript:;">阿荣旗</a>
                    <a href="javascript:;">阿图什市</a>
                    <a href="javascript:;">阿瓦提县</a>
                    <a href="javascript:;">东阿县</a>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
    export default {

    }
</script>
<style scoped lang="less">
.citySelect * {
    margin: 0;
    padding: 0;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    font-size: 0.7rem;
}


a {
    text-decoration: none;
    color: #333
}

.citySelect li {
    list-style: none
}

.clearf::after {
    content: "";
    display: table;
    clear: both
}

@-webkit-keyframes slideinfromright {
    from {
        -webkit-transform: translate3d(100%,0,0);
        transform: translate3d(100%,0,0)
    }

    to {
        -webkit-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0)
    }
}

@-moz-keyframes slideinfromright {
    from {
        -moz-transform: translateX(100%);
        transform: translateX(100%)
    }

    to {
        -moz-transform: translateX(0);
        transform: translateX(0)
    }
}

@keyframes slideinfromright {
    from {
        transform: translateX(100%)
    }

    to {
        transform: translateX()
    }
}

@-webkit-keyframes slideouttoright {
    from {
        -webkit-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0)
    }

    to {
        -webkit-transform: translate3d(100%,0,0);
        transform: translate3d(100%,0,0)
    }
}

@-moz-keyframes slideouttoright {
    from {
        -moz-transform: translateX(0);
        transform: translateX(0)
    }

    to {
        -moz-transform: translateX(100%);
        transform: translateX(100%)
    }
}

@keyframes slideouttoright {
    from {
        transform: translateX(0)
    }

    to {
        transform: translateX(100%)
    }
}

.slideout,.slidein {
    -webkit-animation-timing-function: cubic-bezier(.22,.61,.36,1);
    -webkit-animation-duration: 350ms;
    -webkit-animation-iteration-count: 1;
    -moz-animation-timing-function: cubic-bezier(.22,.61,.36,1);
    -moz-animation-duration: 350ms;
    -moz-animation-iteration-count: 1;
    animation-timing-function: cubic-bezier(.22,.61,.36,1);
    animation-duration: 350ms;
    animation-iteration-count: 1
}

.slidein {
    -webkit-transform: translate3d(0,0,0);
    -webkit-animation-name: slideinfromright;
    -moz-transform: translateX(0);
    -moz-animation-name: slideinfromright;
    transform: translateX(0);
    animation-name: slideinfromright
}

.slideout {
    -webkit-transform: translate3d(100%,0,0);
    -webkit-animation-name: slideouttoright;
    -moz-transform: translateX(100%);
    -moz-animation-name: slideouttoright;
    transform: translateX(100%);
    animation-name: slideouttoright
}

.wrapper {
    width: 100%;
    font-family: Arial "微软雅黑";
    background: #fff;
    margin: 0 auto;
    min-height: 100%;
    font-size: 0.7rem;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
}

.wrapper .citySelect {
    font-size: 0.7rem;
    position: absolute;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
}

.wrapper .citySelect .searchTop {
    background: #fff;
    padding-top: 0.5rem;
}

.wrapper .citySelect .searchTop .searchcheck {
    margin: 0 0.75rem 0.5rem 0.75rem;
    background: #eee;
    color: #999;
    border-radius: 0.25rem;
    outline: none;
    height: 2rem;
    line-height: 2rem;
    border: none;
    padding: 0 1.5rem 0 1.5rem;
    text-align: center;
    font-size: 0.7rem;
}

.wrapper .citySelect .searchTop .searchcheck span {
    background: url("../../imgs/select.png") no-repeat;
    width: 0.85rem;
    height: 1rem;
    display: inline-block;
    background-size: 100%;
    position: relative;
    top: 0.3rem;
    right: 0;
}

.wrapper .citySelect .serchContent {
    position: relative;
    z-index: 2;
}

.wrapper .citySelect .serchContent h3 {
    color: #666;
    padding: 0.5rem 0 0.5rem 0.75rem;
    font-size: 0.65rem;
    font-weight: normal;
}

.wrapper .citySelect .serchContent .currentcity .location {
    color: #666;
    padding: 0.5rem 0 0.5rem 0.75rem;
}

.wrapper .citySelect .serchContent .currentcity .location a {
    color: #666;
    display: inline-block;
    padding: 0.3rem 1rem 0.3rem 1.5rem;
    border: 1px solid #bfbfbf;
    border-radius: 0.2rem;
    position: relative
}

.wrapper .citySelect .serchContent .currentcity .location a span {
    width: 0.9rem;
    height: 0.9rem;
    background: url('../../imgs/location.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 0.35rem;
    left: 0.4rem;
}

.wrapper .citySelect .serchContent .currentcity .disabled a {
    border-color: #df3347;
    color: #333;
}

.wrapper .citySelect .serchContent .hotcity {
    background: #fff;
}

.wrapper .citySelect .serchContent .hotcity .hotlist {
    padding: 0 0 0 0.75rem;
}

.wrapper .citySelect .serchContent .hotcity .hotlist .item a {
    border: 1px solid #d0d0d0;
    border-radius: 0.2rem;
    width: 20%;
    text-align: center;
    height: 1.5rem;
    line-height: 1.5rem;
    margin: 0 3% 0.5rem 0;
    padding: 0 0.25rem;
    color: #333;
    float: left;
}

.wrapper .citySelect .serchContent .hotcity .hotlist .item::after {
    content: "";
    display: table;
    clear: both;
}

.wrapper .citySelect .serchContent .slider {
    margin-top: 0.8rem;
}

.wrapper .citySelect .serchContent .slider .slider-content{
    position: relative;
    z-index: 2;
}

.wrapper .citySelect .serchContent .slider .slider-content ul li {
    background: #fff;
}

.wrapper .citySelect .serchContent .slider .slider-content ul li .title {
    display: block;
    width: 100%;
    color: #666;
    padding: 0.25rem 0 0.25rem 0.75rem;
    background-color: #e9ebed;
}

.wrapper .citySelect .serchContent .slider .slider-content ul li ul {
    margin-bottom: 0.65rem;
}

.wrapper .citySelect .serchContent .slider .slider-content ul li ul li {
    border-top: 1px solid #d9d9d9;
}

.wrapper .citySelect .serchContent .slider .slider-content ul li ul li:first-child {
    border-top: none;
}

.wrapper .citySelect .serchContent .slider .slider-content ul li ul li a {
    display: block;
    padding: 0.75rem 0 0.75rem 0.75rem;
}

.wrapper .citySelect .serchContent .slider .slider-content ul li ul li a.selected {
    border-left: 0.25rem solid #df4338;
}

.wrapper .citySelect .serchContent .slider .slider-content ul li ul li div img {
    width: 2.5rem;
}

.wrapper .citySelect .serchContent .slider .slider-content ul li ul li div span {
    color: #333;
    padding-left: 0.5rem;
}

.wrapper .citySelect .serchContent .slider .slider-content ul li:last-child ul {
    margin-bottom: 0;
}

.wrapper .citySelect .serchContent .slider .slider-nav {
    position: fixed;
    top: 10%;
    right: 0;
    bottom: 0;
    cursor: pointer;
    z-index: 999;
}

.wrapper .citySelect .serchContent .slider .slider-nav ul {
    height: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -ms-flex-flow: column;
    -webkit-flex-flow: column;
    flex-flow: column;
    -webkit-box-direction: normal;
    -webkit-box-orient: vertical;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: space-around;
    justify-content: space-around;
}

.wrapper .citySelect .serchContent .slider .slider-nav ul li {
    -webkit-box-flex: 1;
    box-flex: 1;
    -webkit-flex: 1 1 auto;
    flex: 1 1 auto;
    color: #666;
    font-size: 0.6rem;
    text-transform: uppercase;
    width: 1.5rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    
}

.searchPage {
    position: fixed;
    display: none;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: scroll;
    background-color: rgba(0,0,0,.5);
    z-index: 1000;
    -moz-transform: translate3d(0,0,0);
    -ms-transform: translate3d(0,0,0);
    -o-transform: translate3d(0,0,0);
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
}

.searchPage .search {
    background: #fff;
    position: absolute;
    top: 0;
    width: 100%;
    border-bottom: 1px solid #b1b1b1;
    z-index: 8888;
}

.searchPage .search label {
    background: url("../../imgs/select.png") no-repeat;
    width: 0.85rem;
    height: 1rem;
    display: block;
    background-size: 100%;
    position: absolute;
    top: 1rem;
    left: 1.5rem;
}

.searchPage .search .searchtext {
    background: #eee;
    color: #666;
    border-radius: 0.2rem;
    outline: none;
    height: 1.8rem;
    line-height: 1.8rem;
    border: none;
    padding: 0 1.5rem 0 2.25rem;
    margin: 0.5rem 0 0.5rem 0.75rem;
    width: 74%;
    font-size: 0.7rem;
}

.searchPage .search .cancel {
    display: block;
    color: #fff;
    background: #df3448;
    width: 15%;
    height: 1.8rem;
    border-radius: 0.3rem;
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    line-height: 1.8rem;
    text-align: center;
    font-size: 0.7rem;
}

.searchPage .search .close {
    position: absolute;
    width: 0.8rem;
    height: 0.8rem;
    background: url("../../imgs/close2.png") no-repeat;
    background-size: 100%;
    top: 1rem;
    left: 71%;
}

.searchPage .searchResult {
    width: 100%;
    height: 100%;
    color: #222;
    padding-top: 2.85rem;
    overflow: scroll;
}

.searchPage .searchResult .resultList .listItem {
    background: #fff
}

.searchPage .searchResult .resultList .listItem a {
    display: block;
    padding: 0.75rem 0 0.75rem 0.75rem;
    border-bottom: 1px solid #d9d9d9;
    font-size: 0.7rem;
}
</style>