<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Symfony\Component\HttpFoundation\Response;

class ExemptWebhookCsrf extends Middleware
{

    public function handle(Request $request, Closure $next): Response
    {
        if($request->is('webhook/mailgun/clicked')) {
            return $next($request);
        }

        return parent::handle($request, $next);
    }
}
