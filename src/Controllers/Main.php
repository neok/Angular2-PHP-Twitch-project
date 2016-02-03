<?php
namespace Twitch\Controllers;

use Pimple\Container;
use Symfony\Component\HttpFoundation\Response;

class Main
{
    private $contrainer;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    public function index($args)
    {
        /**
         * @var \Twig_Environment $twig
         */
        $twig = $this->container['twig'];
        /**
         * @var Response $response
         */
        $response = $this->container['response'];

        $response->setContent($twig->render('index.html.twig', ['test' => 'hello']));

    }
}