<?php

namespace Twitch\Controllers;


 use Twitch\Services\TwitchKraken;

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
        }else if(array_key_exists('response', $container) && $container['response'] instanceOf Symfony\Component\HttpFoundation\Response){
            $this->setResponse($container['request']);
        }else if(array_key_exists('twig', $container) && $container['twig'] instanceOf Symfony\Component\HttpFoundation\Twig){
             $this->setTwig($container['twig']);
        }else if(array_key_exists('twitch', $container) && $container['twitch'] instanceOf Twitch\Services\TwitchKraken){
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
     public function setResponse(Response $response)
     {
        $this->response = $response;
         return $this;
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
         return $this->response;
     }

     public function getTwitch()
     {
         return $this->twitch;
     }

    
}
