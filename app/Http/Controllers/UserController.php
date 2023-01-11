<?php

namespace App\Http\Controllers;

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
