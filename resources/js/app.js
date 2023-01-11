import './bootstrap';
import { init, afterInit } from './components/Core';
import './components/Dashboard';
import './components/User';

const root = document.getElementById('app');
const page = JSON.parse(root.dataset.page);

const pageEvent = new CustomEvent('x.' + page.component, {
    detail: page
});

init();
afterInit();

document.dispatchEvent(pageEvent);