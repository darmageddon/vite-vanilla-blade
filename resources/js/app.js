import './bootstrap';

(function () {
    const root = document.getElementsByTagName('body')[0];
    const page = JSON.parse(root.dataset.page);

    window.ComponentData = page;

    const getComponentName = (raw) => {
        return raw.split('.')
            .map((name) => _.upperFirst(name))
            .join("/");
    }

    const routename = route().current();
    const componentName = page.component ?? getComponentName(routename);

    const component = './components/' + componentName + '.js';
    const modules = import.meta.glob('./components/**/*.js');

    // Load core component
    if (Object.hasOwn(modules, './components/Core.js')) {
        modules['./components/Core.js']();
    }

    // Load other component
    if (Object.hasOwn(modules, component) && page.component !== 'Core') {
        modules[component]();
    }
})();