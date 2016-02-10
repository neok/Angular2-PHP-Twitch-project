<?php
namespace Twitch\Controllers;

use Pimple\Container;
use Symfony\Component\HttpFoundation\Response;
use Twitch\Services\TwitchKraken;

class Main extends AbstractController
{
    /**
     * Index
     * @throws \Exception
     */
    public function index()
    {
        $this->response->setContent($this->twig->render('index.html.twig',
            ['games' => $this->getTwitchService()->getGames()]));

    }

    public function game($args)
    {
        $result = '';
        if (array_key_exists('id', $args)) {
            $result = $this->getTwitchService()->searchGame($args['id']);
        }
        $this->response->setContent($this->twig->render('games.html.twig',
            ['game_list' => $result]));
    }

    /**
     * @return TwitchKraken
     * @throws \InvalidArgumentException
     */
    private function getTwitchService()
    {
        return $this->getContainer()->offsetGet('twitch');
    }
}