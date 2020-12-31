<?php
namespace Moorexa\Framework;

use Lightroom\Packager\Moorexa\MVC\Controller;
use Moorexa\Framework\Manager\Providers\HomeProvider;
use Moorexa\Framework\Manager\Providers\PropertyProvider;
use function Lightroom\Templates\Functions\{render, redirect, json, view, happy};
use function Lightroom\Requests\Functions\{session};
/**
 * Documentation for Manager Page can be found in Manager/readme.txt
 *
 *@package      Manager Page
 *@author       Moorexa <www.moorexa.com>
 *@author       Amadi Ifeanyi <amadiify.com>
 **/

class Manager extends Controller
{
    /**
     * @var object $customer
     * Customer information
     */
    public $customer;

    /**
     * @var object $site
     * Site information
     */
    public $site;

    /**
     * @var object $banner
     * Banner information
     */
    public $banner;

    /**
     * @var object $testimonial
     * Customer testimonials
     */
    public $testimonial;

    /**
     * @var object $gallery
     * Customer gallery
     */
    public $gallery;

    /**
     * @var object $integ
     * Customer integerations
     */
    public $integ;

    /**
    * @method Manager home
    *
    * See documentation https://www.moorexa.com/doc/controller
    *
    * You can catch params sent through the $_GET request
    * @return void
    **/

    public function home(HomeProvider $provider) : void 
    {
        // render view
        $this->view->render('home');
    }

    /**
    * @method Manager property
    *
    * See documentation https://www.moorexa.com/doc/controller
    *
    * You can catch params sent through the $_GET request
    * @return void
    **/
    public function property(PropertyProvider $provider) : void
    {   
        // change header
        happy(function($engine){

            // load header
            $engine->fromPlugin('headers')->load(MANAGER_CUSTOM . '/property-header.html');

            // load footer
            $engine->fromPlugin('footers')->load(MANAGER_CUSTOM . '/property-footer.html');

        }); 

        // render view
        $this->view->render('property', ['property' => $provider->propertyId]);
    }

    /**
    * @method Manager login
    *
    * See documentation https://www.moorexa.com/doc/controller
    *
    * You can catch params sent through the $_GET request
    * @return void
    **/
    public function login() : void
    {
        // clear session
        session()->drop('frontdesk_handshake');
        
        // render view
        $this->view->render(HOME . 'static/html/login.html');
    }

    /**
    * @method Manager frontdesk
    *
    * See documentation https://www.moorexa.com/doc/controller
    *
    * You can catch params sent through the $_GET request
    * @return void
    **/
    public function frontdesk() : void
    {
        if (!session()->has('frontdesk_handshake')) $this->view->redir('/home');

        // change header
        happy(function($engine){

            // load header
            $engine->fromPlugin('headers')->load(MANAGER_STATIC . '/frontdesk_template.html');

            // load footer
            $engine->fromPlugin('footers')->load(MANAGER_STATIC . '/frontdesk_template.html');

        }); 

        $content = file_get_contents(FRONTDESK_URL . '?handshake=' . session()->get('frontdesk_handshake'));

        // replace <{domain}>
        $content = str_replace('<{domain}>', FRONTDESK_URL, $content);

        // load view
        $this->view->render('frontdesk', ['frontdesk_content' => $content]);
    }
}
// END class