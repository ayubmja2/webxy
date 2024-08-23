<?php

    namespace App\Http\Controllers;

    use Illuminate\Http\RedirectResponse;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\Redirect;
    use Inertia\Inertia;
    use Inertia\Response;
    use Pusher\ApiErrorException;
    use Stripe\PaymentIntent;
    use Stripe\Stripe;
    use Stripe\StripeClient;

    class PaymentController extends Controller
    {
        public function checkout(Request $request)
        {
            Stripe::setApiKey(env('STRIPE_SECRET'));
            try{
                $paymentIntent = PaymentIntent::create([
                   'amount' => 2000,
                   'currency' => 'cad',
                   'payment_method_types' => ['card'],
                   'automatic_payment_methods' => ['enabled' => false],
                ]);
            }catch(ApiErrorException $e){
                return back()->withErrors('error', $e->getMessage());
            }

            return  Inertia::render( 'Checkout/Show',
                [
                    'clientSecret' => $paymentIntent->client_secret,
                ]);
        }

        public function processCheckout(Request $request): RedirectResponse
        {
            Stripe::setApiKey(env('STRIPE_SECRET'));

            try {
                $user = Auth::user();

                // Fetch the PaymentIntent ID from the frontend (this could be passed via the request)
                $paymentIntentId = $request->input('payment_intent_id');

                // Retrieve the PaymentIntent from Stripe
                $paymentIntent = PaymentIntent::retrieve($paymentIntentId);

                // Check if the payment was successful
                if ($paymentIntent->status === 'succeeded') {
                    // Mark payment as complete, activate subscription, etc.
                    // Example: Grant the user a subscription or mark an order as paid
                    $user->subscriptions()->create([
                        'stripe_payment_intent_id' => $paymentIntentId,
                        'status' => 'active',
                    ]);

                    // Optionally, you can redirect to a success page
                    return redirect()->route('payment.success')->with('success', 'Payment successful!');
                } else {
                    // Handle any issues (e.g., payment failed or requires further action)
                    return back()->withErrors(['error' => 'Payment failed or requires further action.']);
                }
            } catch (ApiErrorException $e) {
                return back()->withErrors(['error' => $e->getMessage()]);
            }
        }


        public function paymentSuccess(){
            return Inertia::render( 'Checkout/Success');
        }
    }
