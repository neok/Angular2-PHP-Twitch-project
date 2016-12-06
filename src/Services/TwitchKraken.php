<?php

namespace Twitch\Services;

use GuzzleHttp\Client;

/**
 * Class TwitchKraken
 * This class can be improved, but i am not gonna focus on it, mainly because its created to get some basic info from twitch.
 */
class TwitchKraken
{
    const API_URL = 'https://api.twitch.tv/kraken/';
    const LIMIT_PER_PAGE = 10;

    /** @var Client  */
    private $client;
    /** @var CacheMemcached  */
    private $cache;
    /** @var  string */
    private $secret;

    /**
     * TwitchKraken constructor.
     *
     * @param Client         $client
     * @param CacheMemcached $cache
     * @param string         $clientSecret
     */
    public function __construct(Client $client, CacheMemcached $cache, $clientSecret)
    {
        $this->client = $client;
        $this->cache  = $cache;
        $this->secret = $clientSecret;
    }

    public function getGames()
    {
        $data = $this->cache->get('games');

        if (!$data) {
            $result = $this->client->request('GET', self::API_URL . 'games/top?limit=10&offset=0',
                ['headers' => ['Client-ID' => $this->secret]]
            );
            $data = [];
            if ($result->getStatusCode() === 200) {
                $data = $this->processBody(json_decode($result->getBody()->getContents()));
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
                ['headers' => ['Client-ID' => $this->secret]]);
            if ($result->getStatusCode() === 200) {
                $data = $this->processStreams(json_decode($result->getBody()->getContents()));
                $this->cache->set('search_' . $gameName, $data, 300);
            }

        }

        return $data;
    }

    /**
     * @param \StdClass $stream
     *
     * @return array
     */
    private function processStreams(\StdClass $stream)
    {
        $result = [];
        $count = 0;
        foreach ($stream->streams as $key => $data) {
            if ($count >= self::LIMIT_PER_PAGE) {
                break;
            }
            $result[] = [
                'id'         => $data->_id,
                'preview'    => $data->preview->medium,
                'viewers'    => $data->viewers,
                'stream_url' => $data->_links->self,
                'name'       => $data->channel->display_name,
                'game'       => $data->channel->game,
            ];
            $count++;
        }

        return $result;
    }

    /**
     * @param \StdClass $body
     *
     * @return array
     */
    private function processBody(\StdClass $body)
    {
        $result = [];

        foreach ($body->top as $class) {
            $result[] = [
                'name' => $class->game->name,
                'img'  => urldecode($class->game->logo->small),
            ];
        }

        return $result;
    }
}