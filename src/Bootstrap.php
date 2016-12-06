<?php

namespace Twitch;

use GuzzleHttp\Client;
use Pimple\Container;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Yaml\Yaml;
use Twitch\Services\CacheMemcached;
use Twitch\Services\TwitchKraken;
use Whoops\Handler\PrettyPageHandler;

require __DIR__ . './../vendor/autoload.php';

error_reporting(E_ALL);


$environment = 'dev';

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

$routeDefinitionCallback = function (\FastRoute\RouteCollector $routeCollector) {
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

        $container['config'] = function () use ($environment) {
            try {
                return Yaml::parse(file_get_contents(__DIR__ . '/../config/parameters.' . ($environment === 'dev' ? 'dev.' : '') . 'yml'),
                    false, true, true);
            } catch (\Exception $e) {
                printf("Unable to parse the YAML string: %s", $e->getMessage());
            }
        };

        $container[$className] = function () use ($container, $className) {
            return new $className($container);
        };

        $container['db'] = function ($container) {
            $dbConfig = $container['config']->database;

            return new \PDO('mysql:host=' . $dbConfig->host . ';dbname=' . $dbConfig->name, $dbConfig->user,
                $dbConfig->password);
        };
        $container['twig'] = function ($t) {
            return new \Twig_Environment(new \Twig_Loader_Filesystem(__DIR__ . '/Views/'));
        };
        $container['response'] = function () use ($response) {
            return $response;
        };
        $container['request'] = function () use ($response) {
            return $response;
        };

        $container['twitch'] = function ($container) {

            return new TwitchKraken(
                new Client(),
                new CacheMemcached($container['config']->memcached->host, $container['config']->memcached->port),
                $container['config']->twitch->secret
            );
        };

        $container[$className]->$method($vars);

        break;
}
echo $response->getContent();
