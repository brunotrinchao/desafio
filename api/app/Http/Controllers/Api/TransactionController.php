<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TransactionResource;
use App\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class TransactionController extends Controller
{

    /**
     * @var Transaction
     */
    private $transaction;

    public function __construct(Transaction $transaction)
    {
        $this->transaction = $transaction;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            $trasaction = $this->transaction;
            $account_id = $request->account_id;

            if (!$account_id) {
                throw new \Exception("Conta não informada", 1);
            }

            if ($request->has('start_date') && $request->has('end_date')) {

                $start = $request->start_date . " 00:00:00";
                $end = $request->end_date . " 23:59:59";

                $transactions = $trasaction->orderBy('created_at', 'DESC')
                    ->where('account_id', '=', $account_id)
                    ->whereBetween('created_at', [$start, $end])->paginate(100);
            } else {
                $transactions = $trasaction->where('account_id', '=', $account_id)->paginate(20);
            }
            return response()->json($transactions, 200);
        } catch (\Exception $e) {
            return response()->json(
                ['data' =>
                [
                    'type' => 'error',
                    'msg' => $e->getMessage(),
                    'code' => 400
                ]]
            );
        }
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

        $typeStr = $data['type'] === 'D' ? 'Depósito' : 'Saque';

        try {
            $transactions = $this->transaction->create($data);

            if ($transactions) {

                $account = $transactions->account()->find($transactions->account_id);

                $calcValue = $this->calculaTransacao($account->balance, $transactions->value, $transactions->type);

                $transactions->account()->update(['balance' => $calcValue]);
            }

            return response()->json(
                ['data' =>
                [
                    'type' => 'success',
                    'msg' => "{$typeStr} efetuado com sucesso.",
                    'code' => 200
                ]]
            );
        } catch (\Exception $e) {
            return response()->json(
                ['data' =>
                [
                    'type' => 'error',
                    'msg' => $e->getMessage(),
                    'code' => 400
                ]]
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
        $transations = $this->transaction->find($id);
        return new TransactionResource($transations);
    }

    private function calculaTransacao($valueOld, $valueNew, $type)
    {
        return $type === 'D' ? ($valueOld + $valueNew) : ($valueOld - $valueNew);
    }
}
