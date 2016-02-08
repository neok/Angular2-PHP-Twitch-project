<?php

namespace Twitch\Controllers;


 use Twitch\Services\TwitchKraken;
 use Symfony\Component\HttpFoundation\Response;

 abstract class AbstractController
{
    protected $container;
    protected $twig;
    protected $response;
    protected $request;
     protected $twitch;
     /**
      * @param Container $container
      */
    public function __constructor(Container $container)
    {
        if(array_key_exists('request', $container) && $container['request'] instanceOf Symfony\Component\HttpFoundation\Request){
            $this->setRequest($container['request']);
        }
        if(array_key_exists('response', $container) && $container['response'] instanceOf Symfony\Component\HttpFoundation\Response){
            $this->setResponse($container['response']);
        }

        if(array_key_exists('twig', $container) && $container['twig'] instanceOf Symfony\Component\HttpFoundation\Twig){
             $this->setTwig($container['twig']);
        }
        if(array_key_exists('twitch', $container) && $container['twitch'] instanceOf Twitch\Services\TwitchKraken){
             $this->setTwitch($container['twitch']);
        }

    }

     /**
      * check whether the key exists , and if so set the value of $ this-twig
      */
    public function setTwig(Twig $twig)
    {
       $this->twig = $twig;
        return $this;
    }

     /**
      * @param Container $response
      */
     public function setResponse(Container $response)
     {
        $this->response = $response;
     }

     /**
      * @param Container $request
      */
     public function setRequest(Request $request)
     {
        $this->request = $request;
         return $this;
     }

     public function setTwitch(TwitchKraken $twitch)
     {
        $this->twitch = $twitch;
     }

     public function getTwig()
     {
        return $this->twig;
     }

     public function getRequest()
     {
         return $this->request;
     }

     public function getResponse()
     {
         return $this;
     }

     public function getTwitch()
     {
         return $this->twitch;
     }

    
}
