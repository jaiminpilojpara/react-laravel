<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Input;
use App\User;


class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
	
	public function __construct()
    {
        $this->useObj = new User;
    }
    
    function AddDetails(){

		$inputData = Input::all();

		echo "<pre>";print_r($inputData);exit;
        
        $data = [];
        $response = [];
        $data['firstname'] = $inputData['firstname'];
        $data['lastname'] = $inputData['lastname'];
        $data['email'] = $inputData['email'];
        $data['photo'] =  $inputData['photo'];

        $saveUser = $this->useObj->create($data);

        if($saveUser)
        {
        	$response['Success'] = 'User Registered successfully';
        }
        else
        {
        	$response['Failed'] = 'User Not Registered successfully <br> Pleasr try again...';
        }

        return response()->json($response);
    }
}
