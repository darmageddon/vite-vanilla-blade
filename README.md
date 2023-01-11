<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

# Vite Vanilla + Laravel + Blade Example

- `resources\js\app.js`
```js
import './bootstrap';
import './components/Dashboard';
import './components/User';

const root = document.getElementById('app');
const page = JSON.parse(root.dataset.page);

const pageEvent = new CustomEvent('x.' + page.component, {
    detail: page
});

document.dispatchEvent(pageEvent);
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