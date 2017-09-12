<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Input;
use App\User;
use File;


class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
	
	public function __construct()
    {
        $this->useObj = new User;
    }
    
    function AddDetails(){
    	// print_r(Input::get());exit;
    	// print_r(Input::file());exit;
        
        $data = [];
        $response = [];
        $data['firstname'] = Input::get('firstName');
        $data['lastname'] = Input::get('lastName');
        $data['email'] = Input::get('emailId');
        
        $getFileName = time().'.'.Input::file('photo')->getClientOriginalExtension();
        Input::file('photo')->move(public_path('images/'), $getFileName);
        $data['photo'] = $getFileName;

        $saveUser = $this->useObj->create($data);

        if($saveUser)
        {
			$response['First Name'] = Input::get('firstName');
        	$response['Last Name'] = Input::get('lastName');
        	$response['Email ID'] = Input::get('emailId');
        	$response['Photo URL'] = url('laravel/public/images/'.$getFileName);
        }
        else
        {
        	$response['Failed'] = 'Pleasr try again...';
        }

        return response()->json($response);
    }

}
