<?php
namespace Twitch\Services;

/**
 * Interface CacheInterface
 * @package Twitch\Services
 */
interface CacheInterface
{
    /**
     * Set value to cache
     *
     * @param string $key
     * @param mixed $value
     * @param int $ttl
     * @return mixed
     */
    public function set($key, $value, $ttl);

    /**
     * Get value from cache
     *
     * @param string $key
     * @return mixed
     */
    public function get($key);
}