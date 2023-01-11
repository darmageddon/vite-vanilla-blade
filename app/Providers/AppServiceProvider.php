<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
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
}
