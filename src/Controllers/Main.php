<?php
namespace Twitch\Controllers;

use Pimple\Container;

class Main
{
    private $contrainer;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    public function index($args)
    {
        var_dump($this->container['db']);

    }
}