<?php
namespace Twitch\Controllers;


use Pimple\Container;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class AbstractController
 * @package Twitch\Controllers
 */
class AbstractController
{
    /**
     * @var Container
     */
    protected $container;

    /**
     * @var \Twig_Environment
     */
    protected $twig;

    /**
     * @var Response
     */
    protected $response;

    /**
     * @var Request
     */
    protected $request;

    /**
     * AbstractController constructor.
     * @param Container $container
     */
    public function __construct(Container $container)
    {
        $this->container = $container;
        if ($twig = $this->container->offsetGet('twig')) {
            $this->twig = $twig;
        }
        if ($response = $this->container->offsetGet('response')) {
            $this->response = $response;
        }
        if ($request = $this->container->offsetGet('request')) {
            $this->request = $request;
        }
    }

    /**
     * Get container
     *
     * @return Container
     */
    public function getContainer()
    {
        return $this->container;
    }


}