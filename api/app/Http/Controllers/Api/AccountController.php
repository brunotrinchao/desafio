<?php

namespace App\Http\Controllers\Api;

use App\Account;
use App\Http\Controllers\Controller;
use App\Http\Resources\AccountResource;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    /**
     * @var Account
     */
    private $account;

    public function __construct(Account $account)
    {
        $this->account = $account;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $account = $this->account->paginate(10);
        return response()->json($account, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();

        try {
            $this->account->create($data);

            return response()->json(
                ['data' =>
                    [
                        'type' => 'success',
                        'msg' => 'Conta criada com sucesso.',
                        'code' => 200
                    ]
                ]
            );
        }catch (\Exception $e){
            return response()->json(
                ['data' =>
                    [
                        'type' => 'error',
                        'msg' => $e->getMessage(),
                        'code' => 400
                    ]
                ]
            );
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $account = $this->account->find($id);
        return new AccountResource($account);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();

        try {
            $accounts = $this->account->findOrFail($id);
            $accounts->update($data);
            return response()->json(
                ['data' =>
                    [
                        'type' => 'success',
                        'msg' => 'Conta atualizada com sucesso.',
                        'code' => 200
                    ]
                ]
            );
        }catch (\Exception $e){
            return response()->json(
                ['data' =>
                    [
                        'type' => 'error',
                        'msg' => $e->getMessage(),
                        'code' => 400
                    ]
                ]
            );
        }
    }
}
