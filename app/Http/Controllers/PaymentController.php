<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Pusher\ApiErrorException;
use Stripe;
class PaymentController extends Controller
{
    public function checkout(Request $request)
    {
        return Inertia::render('Checkout/Show', [
            'stripeKey' => env('STRIPE_KEY'),
        ]);
    }

//    public function testStripeKey()
//    {
//        dd(env('STRIPE_KEY')); // This should output your Stripe public key
//    }


    public function processCheckout(Request $request): RedirectResponse
    {
        try{
            $user = Auth::user();


            $paymentMethod = $request->input(('payment_method'));



            //create a stripe payment method
            $user->createOrGetStripeCustomer();
            $user->addPaymentMethod($paymentMethod);

            // charge the user or set up a subscription
            $user->charge(1000,$paymentMethod); //10.00 USD
            return redirect()->route('checkout.success');
        }catch(ApiErrorException $e){
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function success(){
        return view('success');
    }
}
