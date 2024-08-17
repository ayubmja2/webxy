<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MailgunWebhookController extends Controller
{
    public function handleClicked(Request $request){
        Log::info('Mailgun Clicked Webhook:', $request->all());

        //Process the data here, such as updating database
        //for example
        //$email = $request->input('recipient')
        // Handle the click event for the email

        return response()->json([['status' => 'success']]);
    }
}
