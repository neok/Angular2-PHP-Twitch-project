<?php
namespace Twitch;
use GuzzleHttp\Client;
use Pimple\Container;
use Pimple\Tests\Fixtures\PimpleServiceProvider;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Twitch\Controllers\Main;
use Twitch\Controllers\MainController;
use Twitch\Services\TwitchKraken;
use Whoops\Handler\PrettyPageHandler;

require __DIR__ . './../vendor/autoload.php';

error_reporting(E_ALL);


$environment = 'development';

$whoops = new \Whoops\Run;

if ($environment !== 'production') {
    $whoops->pushHandler(new PrettyPageHandler());
} else {
    $whoops->pushHandler(function ($e) {
        echo 'Show friendly error page here';
    });
}
$whoops->register();
$request = Request::createFromGlobals();
$sc = new PimpleServiceProvider();

$routeDefinitionCallback = function(\FastRoute\RouteCollector $routeCollector) {
    $routes = include(__DIR__ . '/Routers/default.php');
    foreach ($routes as $route) {
        $routeCollector->addRoute($route[0], $route[1], $route[2]);
    }
};
$dispatcher = \FastRoute\simpleDispatcher($routeDefinitionCallback);
$routeInfo = $dispatcher->dispatch($request->getMethod(), $request->getPathInfo());

$response = new Response();

$container = new Container();

switch ($routeInfo[0]) {
    case \FastRoute\Dispatcher::NOT_FOUND:
        $response->setContent('404 not found');
        $response->setStatusCode(404);
        break;
    case \FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        $response->setContent('405 method not allowed');
        $response->setStatusCode(405);
        break;
    case \FastRoute\Dispatcher::FOUND:
        $className = $routeInfo[1][0];
        $method = $routeInfo[1][1];
        $vars = $routeInfo[2];

        $container[$className] = function() use ($container, $className) {
            return new $className($container);
        };

        $container['db'] = function($c) {
            return new \PDO('mysql:host=localhost;dbname=db_crm', 'root', 'root');
        };
        $container['twig'] = function($t) {
            return new \Twig_Environment(new \Twig_Loader_Filesystem(__DIR__ . '/Views/'));
        };
        $container['response'] = function() use ($response) {
            return $response;
        };

        $container['twitch'] = function ($c)  {
            return new TwitchKraken(new Client());
        };


        $container[$className]->$method($vars);

        break;
}
echo $response->getContent();
