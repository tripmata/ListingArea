<?php
namespace Moorexa\Framework\Manager\Packages;

use Closure;
use HttpClient\Http;
use Lightroom\Router\Guards\RouteGuard;
use Moorexa\Framework\Manager\Provider;
use function Lightroom\Functions\GlobalVariables\{var_set};
use function Lightroom\Templates\Functions\{view};

/**
 * @package HandleSession
 * @author Amadi Ifeanyi <amadiify.com> <wekiwork.com>
 * 
 * Allow passage to application if authenticated.
 */

 class HandleSession
 {
    /**
     * @method HandleSession callNextIfCustomerIsAuthenticated
     * @param Closure $next
     */
    public static function callNextIfCustomerIsAuthenticated(Closure $next, Provider &$provider)
    {
        // filter session
        $input = filter($_SESSION, [
            'customer_res' => 'string|notag|required|min:10'
        ]);

        // validation failed?
        if (!$input->isOk()) return self::unauthorizedUser();

        // get customer information
        $response = Http::query(['customer' => $input->customer_res])->get('ui-blocks');

        // are we good ??
        if (is_object($response->json->data) && isset($response->json->data->customer)) :

            // set customer information
            $provider->controller->customer = $response->json->data->customer;

            // set site information
            $provider->controller->site = $response->json->data->site;

            // set banner information
            $provider->controller->banner = $response->json->data->banner;

            // set customer testimonials
            $provider->controller->testimonial = $response->json->data->testimonial;

            // set customer gallery
            $provider->controller->gallery = $response->json->data->gallery;

            // set customer integrations
            $provider->controller->integ = $response->json->data->integrations;

            // continue with request
            $next();

            // set the customer token
            var_set('customer_token', $input->customer_res);

            // add javascript
            app('assets')->exportVars([
                'FRONTDESK_CDN' => FRONTDESK_CDN,
                'CDN_URL'       => CDN_URL,
                'FRONTDESK_URL' => FRONTDESK_URL,
                'TRIP_MATA_URL' => TRIP_MATA_URL,
                'FILES_CDN'     => FILES_CDN,
                'CLIENT_API'    => CLIENT_SERVICE_API,
                'STORAGE_API'   => STORAGE_API,
                'LISTING_API'   => LISTING_SERVICE_API
            ]);

            // add manager js
            view()->requireJs(MANAGER_STATIC . '/Manager.js');

        else:

            // user needs to authenticate
            self::unauthorizedUser();

        endif;
        
    }

    /**
     * @method HandleSession unauthorizedUser
     * @return void
     */
    public static function unauthorizedUser() : void
    {
        // import login page
        import(HOME . '/static/html/login.html');
    }
 }