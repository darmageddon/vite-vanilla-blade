<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

# Vite Vanilla + Laravel + Blade Example

- `resources\js\app.js`
```js
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
```

- `resources\js\components\Core.js`
```js
(function () {
    const init = () => {
        console.log('Running in every page...');
    }

    const afterInit = () => {
        console.log(`Current route: ${route().current()}`);
    }

    // IIFE
    (function () {
        init();
        afterInit();
    })();
})();
```

- `resources\js\components\Users\Index.js`
```js
import axios from "axios";

(function () {
    // destructure objects
    const { users } = ComponentData;

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
})();
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

<body data-page="{{ json_encode($data) }}">
</body>

</html>
```

- `app\Http\Controllers\UserController.php`
```php
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class UserController extends Controller
{
    private array $users;

    public function __construct()
    {
        $this->users = [
            [
                'id' => 1,
                'name' => 'Lorem'
            ],
            [
                'id' => 2,
                'name' => 'Ipsum'
            ],
        ];
    }

    public function index(Request $request)
    {
        return view("app")
            ->with('data', [
                'users' => $this->users
            ]);
    }

    public function getUser(Request $request, int $id)
    {
        $ids = array_column($this->users, 'id');
        $index = array_search($id, $ids);

        if ($index !== false) {
            return response()->json(
                data: $this->users[$index]
            );
        }

        throw new HttpResponseException(
            response: response()->json(
                data: [
                    'status' => 'ERR001',
                    'message' => 'User not found.'
                ],
                status: 404
            )
        );
    }
}
```