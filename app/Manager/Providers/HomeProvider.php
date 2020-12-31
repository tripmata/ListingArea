<?php
namespace Moorexa\Framework\Manager\Providers;

use Closure;
use function Lightroom\Requests\Functions\{get};
use Lightroom\Packager\Moorexa\Interfaces\ViewProviderInterface;
/**
 * @package Home View Page Provider
 * @author Moorexa <moorexa.com>
 */

class HomeProvider implements ViewProviderInterface
{
    /**
     * @var array  $arguments
     */
    private $arguments = [];

    /**
     * @method ViewProviderInterface setArguments
     * @param array $arguments
     * 
     * This method sets the view arguments
     */
    public function setArguments(array $arguments) : void
    {
        $this->arguments = $arguments;
    }

    /**
     * @method ViewProviderInterface viewWillEnter
     * @param Closure $next
     * 
     * This method would be called before rendering view
     */
    public function viewWillEnter(Closure $next) : void
    {
        if (get()->has('endsession')) :

            // unset property
            if (isset($_SESSION['property'])) unset($_SESSION['property']);

            // unset usersess
            if (isset($_SESSION['usersess']) && $_SESSION['usersess'] == 'adxc0') : unset($_SESSION['usersess']); endif;

        endif;

        // add reset css
        app('view')->requireCss(HOME . 'static/css/reset.css');

        // route passed
        $next();
    }
}