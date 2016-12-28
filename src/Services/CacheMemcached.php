<?php

namespace Twitch\Services;

/**
 * Class CacheMemcached
 */
class CacheMemcached implements CacheInterface
{
    const CACHE_NAME = 'memcached';
    /** @var \Memcached */
    protected $instance;

    /**
     * CacheMemcached constructor.
     *
     * @param string $host
     * @param int    $port
     */
    public function __construct($host, $port)
    {
        $this->instance = new \Memcached(self::CACHE_NAME);
        $this->instance->addServer($host, $port);
    }

    /** {@inheritdoc} */
    public function set($key, $value, $ttl)
    {
        $this->instance->set((string) $key, $value, (int) $ttl);

        return $this;
    }

    /** {@inheritdoc} */
    public function get($key)
    {
        return $this->instance->get((string) $key);
    }

    /** {@inheritdoc} */
    public function contains($key)
    {
        return (bool) $this->get($key);
    }
}
