<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

# Vite Vanilla + Laravel + Blade Example

- `resources\js\app.js`
```js
import './bootstrap';
import { init, afterInit } from './components/Core';
import './components/Components';

const root = document.getElementById('app');
const page = JSON.parse(root.dataset.page);

const pageEvent = new CustomEvent('x.' + page.component, {
    detail: page
});

init();
afterInit();

document.dispatchEvent(pageEvent);
```

- `resources\js\components\Core.js`
```js
const init = () => {
    console.log('Running in every page...')
}

const afterInit = () => {
    console.log(`Current route: ${route().current()}`)
}

export {
    init,
    afterInit
}
```
- `resources\js\components\Dashboard.js`
```js
document.addEventListener('x.dashboard.index', function (e) {
    const numbers = e.detail.numbers;
    const total = numbers.reduce((previousValue, currentValue) => {
        previousValue += currentValue;
        return previousValue;
    }, 0);

    // 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 = 36
    console.log(`${numbers.join(' + ')} = ${total}`);
});

document.addEventListener('x.dashboard.test', function (e) {
    const text = e.detail.text;

    // Text is testing
    console.log('Text is ' + text);
});

document.addEventListener('x.dashboard.detail', function (e) {
    const detail = e.detail.detail;

    // Detail: Id=12; Name=Unknown; Route=dashboard.detail
    console.log(`Detail: Id=${detail.id}; Name=${detail.name}; Route=${route().current()}`);
});
```

- Example with IIFE and Axios call. `resources\js\components\User.js`
```js
import axios from "axios";

document.addEventListener('x.users.index', function (e) {

    // destructure objects
    const { users } = e.detail;

    const getUserById = (id) => {
        const url = '/users/' + id;
        return axios.get(url);
    }

    const getUsers = () => {
        const usersRequests = users.map(user => getUserById(user.id));

        Promise.all(usersRequests)
            .then(function (results) {
                results.forEach(response => {
                    const user = response.data;
                    console.log(`User: Id=${user.id}; Name=${user.name}`);
                });
            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            }).then(function () {
                console.log('Done.');
            });
    }

    // IIFE (Immediately Invoked Function Expression)
    (function () {

        getUsers();

    })();
});
```

- `resources\views\app.blade.php`
```blade
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
        @routes
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body>
        <div id="app" data-page="{{ json_encode($data) }}"></div>
    </body>
</html>
```
- `app\Providers\AppServiceProvider.php`
```php
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\View;

public function boot()
{
    View::composer('*', function ($view) {
        $viewData = $view->getData();
        $data = isset($viewData['data']) ? $viewData['data'] : [];
        $view->with('data', array_merge($data, [
            'component' => Route::currentRouteName()
        ]));
    });
}
```

- `app\Http\Controllers\DashboardController.php`
```php
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        return view("app")
            ->with('data', [
                'numbers' => [1, 2, 3, 4, 5, 6, 7, 8]
            ]);
    }

    public function test(Request $request)
    {
        return view("app")
            ->with('data', [
                'text' => 'testing'
            ]);
    }

    public function detail(Request $request)
    {
        return view("app")
            ->with('data', [
                'detail' => [
                    'id' => 12,
                    'name' => 'Unknown'
                ]
            ]);
    }
}
```