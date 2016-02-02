<?php
namespace Twitch;

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
