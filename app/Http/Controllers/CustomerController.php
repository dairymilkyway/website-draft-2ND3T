<?php

namespace App\Http\Controllers;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Customer::with('user')->get();
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (Customer::find($id)) {
            Customer::destroy($id);
            $data = array('success' => 'deleted', 'code' => 200);
            return response()->json($data);
        }
        $data = array('error' => 'Brand not deleted', 'code' => 400);
        return response()->json($data);
    }

    public function changeStatus(Request $request, $id)
    {
    $user = User::findOrFail($id);
    $user->status = $request->input('status');
    $user->save();

    return response()->json(['message' => 'Status updated successfully']);
    }

    public function changeRole(Request $request, $id)
    {
    $user = User::findOrFail($id);
    $user->role = $request->input('role');
    $user->save();

    return response()->json(['message' => 'Role updated successfully']);
    }

}
