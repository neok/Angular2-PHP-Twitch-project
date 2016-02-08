<?php
namespace Twitch\Controllers;

use Pimple\Container;

use Twitch\Services\TwitchKraken;

class Main extends AbstractController
{

    public function index($args)
    {
        /**
         * @var \Twig_Environment $twig
         */
        $twig = $this->getTwig();
        /**
         * @var Response $response
         */
        $response = $this->getResponse();

        /**
         * @var TwitchKraken $twitch
         */
        $twitch = $this->getTwitch();

        var_dump($response);
        exit;

        $response->sendContent($twig->render('index.html.twig', ['games' => $twitch->getGames()]));
    }
}