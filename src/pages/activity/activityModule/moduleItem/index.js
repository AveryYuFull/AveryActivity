import AcModuleItem from './ModuleItem.vue';

AcModuleItem.install = function (Vue) {
    Vue.component(AcModuleItem.name, AcModuleItem);
};

export default AcModuleItem;
