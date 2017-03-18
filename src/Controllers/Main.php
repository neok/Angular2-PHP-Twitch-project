<?php

namespace Twitch\Controllers;

use Twitch\Services\TwitchKraken;

/**
 * Class Main
 */
class Main extends AbstractController
{
    /**
     * Index
     * @throws \Exception
     */
    public function index()
    {
        $this->response->setContent(
            $this->twig->render('index.html.twig', ['games' => []])
        );
//$this->getTwitchService()->getGames(
    }

    public function json()
    {
        echo json_encode($this->getTwitchService()->getGames());
    }

    /**
     * @param array $args
     */
    public function game($args)
    {
        $result = [];
        if (array_key_exists('id', $args)) {
            $result = $this->getTwitchService()->searchGame($args['id']);
        }
        echo json_encode($result);

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
