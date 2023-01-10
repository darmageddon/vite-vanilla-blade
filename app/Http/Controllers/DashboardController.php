<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        return view("app")
            ->with('data', [
                'component' => 'dashboard.index',
                'numbers' => [1, 2, 3, 4, 5, 6, 7, 8]
            ]);
    }

    public function test(Request $request)
    {
        return view("app")
            ->with('data', [
                'component' => 'dashboard.test',
                'text' => 'testing'
            ]);
    }

    public function detail(Request $request)
    {
        return view("app")
            ->with('data', [
                'component' => 'dashboard.detail',
                'detail' => [
                    'id' => 12,
                    'name' => 'Unknown'
                ]
            ]);
    }
}
