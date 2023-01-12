import './bootstrap';

(function () {
    const root = document.getElementsByTagName('body')[0];
    const page = JSON.parse(root.dataset.page);

    window.ComponentData = page;

    const getComponentName = (raw) => raw.split('.')
        .map((name) => _.upperFirst(name))
        .join("/");

    const currentRouteName = route().current();
    const componentName = page.component ?? getComponentName(currentRouteName);

    const component = './components/' + componentName + '.js';
    const modules = import.meta.glob('./components/**/*.js');

    // Load core component
    const coreComponentName = 'Core';
    const coreComponent = './components/' + coreComponentName + '.js';
    if (Object.hasOwn(modules, coreComponent)) {
        modules[coreComponent]();
    }

    // Load shared component (if exists)
    const sharedComponentName = componentName.split('/')[0];
    const sharedComponent = './components/' + sharedComponentName + '.js';
    if (Object.hasOwn(modules, sharedComponent) && sharedComponentName !== coreComponentName) {
        modules[sharedComponent]();
    }

    // Load other component
    if (Object.hasOwn(modules, component) && componentName !== coreComponentName) {
        modules[component]();
    }
})();