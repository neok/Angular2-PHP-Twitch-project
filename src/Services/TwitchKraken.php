<?php
namespace Twitch\Services;

use GuzzleHttp\Client;
use Psr\Http\Message\StreamInterface;

class TwitchKraken
{

    const API_URL = 'https://api.twitch.tv/kraken/';

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
        $result = $this->client->request('GET', self::API_URL . 'games/top?limit=10&offset=0');
        $data = [];
        if ($result->getStatusCode() == '200') {
            $data  = $this->processBody(json_decode($result->getBody()->getContents()));
        }

        return $data;
    }

    public function searchGame($gameName)
    {
        $result = $this->client->request('GET', self::API_URL . 'search/streams?q=' . urlencode((string)$gameName) . '&limit=25&offset=0');
        $data = [];
        if ($result->getStatusCode() == '200') {
            $data = $this->processStreams(json_decode($result->getBody()->getContents()));

        }
        return $data;
    }

    /**
     * @param \StdClass $stream
     * @return array
     */
    private function processStreams(\StdClass $stream)
    {
        $result = [];
        foreach($stream->streams as $key => $data) {

            $result[] = [
                'id' => $data->_id,
                'preview' => $data->preview->medium,
                'viewers' => $data->viewers,
                'stream_url' => $data->_links->self,
                'name' => $data->channel->display_name,
                'game' => $data->channel->game
            ];
        }

        return $result;
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