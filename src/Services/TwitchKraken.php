<?php
namespace Twitch\Services;

use GuzzleHttp\Client;
use Psr\Http\Message\StreamInterface;

class TwitchKraken
{
    /**
     * @var Client
     */
    protected $client;

    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    public function getGames()
    {
        $result = $this->client->request('GET', 'https://api.twitch.tv/kraken/games/top?limit=10&offset=0');
        $data = [];
        if ($result->getStatusCode() == '200') {
            $data  = $this->processBody(json_decode($result->getBody()->getContents()));
        }

        return $data;
    }

    /**
     * @todo create special class for parsing and setting entitys
     *
     * @param \StdClass $body
     * @return array
     */
    private function processBody(\StdClass $body)
    {
        $result = [];

        foreach ($body->top as $class) {
            $result[] = [
                'name' =>    $class->game->name,
                'img' => urldecode($class->game->logo->small)
            ];
        }
        return $result;
    }
}