<?php

    namespace App\Http\Controllers;

    use Illuminate\Http\RedirectResponse;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\Redirect;
    use Inertia\Inertia;
    use Inertia\Response;
    use Pusher\ApiErrorException;
    use Stripe\Checkout\Session;
    use Stripe\PaymentIntent;
    use Stripe\Stripe;
    use Stripe\StripeClient;

    class PaymentController extends Controller
    {
        public function checkout(Request $request): RedirectResponse
        {
            Stripe::setApiKey(env('STRIPE_SECRET'));

            try {
                $checkoutSession = Session::create([
                    'payment_method_types' => ['card'],
                    'line_items' => [[
                        'price_data' => [
                            'currency' => 'cad',
                            'product_data' => [
                                'name' => 'Your Product Name',
                            ],
                            'unit_amount' => 2000, // 2000 cents = $20.00 CAD
                        ],
                        'quantity' => 1,
                    ]],
                    'mode' => 'payment', // Use 'payment' for one-time payments
                    'success_url' => route('payment.success') . '?session_id={CHECKOUT_SESSION_ID}',
                    'cancel_url' => route('payment.cancel'),
                ]);

                return Redirect::away($checkoutSession->url);
            } catch (\Exception $e) {
                return back()->withErrors('error', $e->getMessage());
            }
        }

        // Method to render a success page after payment
        public function paymentSuccess(Request $request): Response
        {
            return Inertia::render('Checkout/Success');
        }

        // Method to render a cancel page if the payment is canceled
        public function paymentCancel(Request $request): Response
        {
            return Inertia::render('Checkout/Cancel');
        }
    }
