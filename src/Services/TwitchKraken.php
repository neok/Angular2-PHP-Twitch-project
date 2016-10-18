<?php
namespace Twitch\Services;

use GuzzleHttp\Client;

class TwitchKraken
{

    const API_URL = 'https://api.twitch.tv/kraken/';
    const CLIENT_SECRET = '2vl026om6vbi20b1axdkec2xtwcmt2x';

    /**
     * @var Client
     */
    protected $client;

    /**
     * @var CacheMemcached
     */
    protected $cache;

    public function __construct(Client $client, CacheMemcached $cache)
    {
        $this->client = $client;
        $this->cache = $cache;
    }

    public function getGames()
    {
        $data = $this->cache->get('games');

        if (!$data) {
            $result = $this->client->request('GET', self::API_URL . 'games/top?limit=10&offset=0',
                ['headers' =>  ['Client-ID' => self::CLIENT_SECRET]]
            );
            $data = [];
            if ($result->getStatusCode() == '200') {
                $data  = $this->processBody(json_decode($result->getBody()->getContents()));
                $this->cache->set('games', $data, 300);
            }

        }

        return $data;
    }

    public function searchGame($gameName)
    {

        $data = $this->cache->get('search_' . $gameName);

        if (!$data) {
            $result = $this->client->request('GET',
                self::API_URL . 'search/streams?q=' . urlencode((string)$gameName) . '&limit=100&offset=0',
                ['headers' =>  ['Client-ID' => self::CLIENT_SECRET]]);
            if ($result->getStatusCode() == '200') {
                $data = $this->processStreams(json_decode($result->getBody()->getContents()));
                $this->cache->set('search_' . $gameName, $data, 300);
            }

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
        $count = 0;
        foreach($stream->streams as $key => $data) {
            if ($count >= 10) {
                break;
            }
            $result[] = [
                'id' => $data->_id,
                'preview' => $data->preview->medium,
                'viewers' => $data->viewers,
                'stream_url' => $data->_links->self,
                'name' => $data->channel->display_name,
                'game' => $data->channel->game
            ];
            $count++;
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