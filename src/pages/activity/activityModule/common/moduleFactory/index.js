import AcModuleFactory from './ModuleFactory.vue';

AcModuleFactory.install = function (Vue) {
    Vue.component(AcModuleFactory.name, AcModuleFactory);
};

export default AcModuleFactory;
