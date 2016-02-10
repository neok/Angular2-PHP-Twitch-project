<?php
namespace Twitch\Services;

class CacheMemcached implements CacheInterface
{
    const CACHE_NAME = 'mc';
    protected $instance;

    /**
     * CacheMemcached constructor.
     * @todo set host and name port from config
     */
    public function __construct()
    {
        $this->instance = new \Memcached(self::CACHE_NAME);
        $this->instance->addServer('localhost', 11211);
    }

    public function set($key, $value, $ttl)
    {
        $this->instance->set((string) $key, $value,  (int) $ttl);
        return $this;
    }

    public function get($key)
    {
        return $this->instance->get((string) $key);
    }
}