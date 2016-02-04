<?php

namespace Twitch\Controllers;


 abstract class AbstractController
{
    protected $container;
    protected $twig;
    protected $response;
    protected $request;
     /**
      * @param Container $container
      */
    public function __constructor(Container $container)
    {
        $this->container = $container;
    }

     /**
      * check whether the key exists , and if so set the value of $ this-twig
      */
    public function setTwig(Container $twig)
    {
        if(array_key_exists('twig',$twig)){
            $this->twig = $twig['twig'];
        }
    }

     /**
      * @param Container $response
      */
     public function setResponse(Container $response)
     {
         if(array_key_exists('response',$response)){
             $this->response = $response['response'];
         }
     }

     /**
      * @param Container $request
      */
     public function setRequest(Container $request)
     {
         if(array_key_exists('request',$request)){
             $this->request = $request['request'];
         }
     }

    
}