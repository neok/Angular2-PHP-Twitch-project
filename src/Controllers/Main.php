<?php
namespace Twitch\Controllers;

use Pimple\Container;
use Symfony\Component\HttpFoundation\Response;
use Twitch\Services\TwitchKraken;

class Main extends AbstractController
{
    /**
     * Index
     * @throws \Exception
     */
    public function index()
    {
        $this->response->setContent($this->twig->render('index.html.twig',
            ['games' => $this->getTwitchService()->getGames()]));

    }

    /**
     *
     */
    public function json()
    {
        echo json_encode($this->getTwitchService()->getGames());
    }

    public function game($args)
    {
        $result = array();
        if (array_key_exists('id', $args)) {
            $result = $this->getTwitchService()->searchGame($args['id']);
        }
        echo json_encode($result);
//        $this->response->setContent($this->twig->render('games.html.twig',
//            ['game_list' => $result]));
    }

    public function product($args)
    {
        $data = $args['id'];
        if ($data == 0) {
            $result = [
              ["value" => 0, "label" => "All"],
              ["value" => 1, "label" => "PckeeperLive2014"],
              ["value" => 2, "label" => "BroImbaLurker"]
            ];
        } else {
            $result = [
                ["value" => 2, "label" => "BroImbaLurker"]
            ];
        }
        echo json_encode($result);
    }

    /**
     * @return TwitchKraken
     * @throws \InvalidArgumentException
     */
    private function getTwitchService()
    {
        return $this->getContainer()->offsetGet('twitch');
    }

    public function form()
    {
        $this->response->setContent($this->twig->render('form.html.twig', array()));
    }

    public function product_list()
    {
        echo json_encode([
            ['value' => 0, 'label' => 'All'],
            ['value' => 1, 'label' => 'Product1'],
            ['value' => 2, 'label' => 'Product2'],
            ['value' => 3, 'label' => 'Product3'],

        ]);
    }
    public function sku()
    {
        echo json_encode([
            ['value' => 0, 'label' => 'All'],
            ['value' => 1, 'label' => 'Buy me'],
            ['value' => 2, 'label' => 'One time bro'],
            ['value' => 3, 'label' => 'Crab'],

        ]);
    }
    public function package()
    {
        echo json_encode([
            ['value' => 0, 'label' => 'All'],
            ['value' => 1, 'label' => 'One month'],
            ['value' => 2, 'label' => 'one year'],
            ['value' => 3, 'label' => 'Forever'],
        
        ]);
    }

    public function data()
    {
        echo json_encode(array('result' => "<pre style='color:#000020;background:#f6f8ff;'><span style='color:#200080; font-weight:bold; '>var</span> React <span style='color:#308080; '>=</span> require<span style='color:#308080; '>(</span><span style='color:#800000; '>'</span><span style='color:#1060b6; '>react</span><span style='color:#800000; '>'</span><span style='color:#308080; '>)</span><span style='color:#406080; '>;</span>
<span style='color:#200080; font-weight:bold; '>var</span> DynamicButton <span style='color:#308080; '>=</span> React<span style='color:#308080; '>.</span>createClass<span style='color:#308080; '>(</span><span style='color:#406080; '>{</span>
    getInitialState<span style='color:#406080; '>:</span> <span style='color:#200080; font-weight:bold; '>function</span><span style='color:#308080; '>(</span><span style='color:#308080; '>)</span> <span style='color:#406080; '>{</span>
        <span style='color:#200080; font-weight:bold; '>return</span> <span style='color:#406080; '>{</span>
            clicked<span style='color:#406080; '>:</span> <span style='color:#0f4d75; '>false</span><span style='color:#308080; '>,</span>
            data<span style='color:#406080; '>:</span> <span style='color:#800000; '>'</span><span style='color:#800000; '>'</span>
        <span style='color:#406080; '>}</span>
    <span style='color:#406080; '>}</span><span style='color:#308080; '>,</span>

    getMarkup<span style='color:#406080; '>:</span> <span style='color:#200080; font-weight:bold; '>function</span><span style='color:#308080; '>(</span><span style='color:#308080; '>)</span> <span style='color:#406080; '>{</span>
        <span style='color:#200080; font-weight:bold; '>return</span> <span style='color:#200080; font-weight:bold; '>this</span><span style='color:#308080; '>.</span>state<span style='color:#308080; '>.</span>data
    <span style='color:#406080; '>}</span><span style='color:#308080; '>,</span>
    onSubmit<span style='color:#406080; '>:</span> <span style='color:#200080; font-weight:bold; '>function</span><span style='color:#308080; '>(</span>e<span style='color:#308080; '>)</span> <span style='color:#406080; '>{</span>
        <span style='color:#200080; font-weight:bold; '>this</span><span style='color:#308080; '>.</span>setState<span style='color:#308080; '>(</span><span style='color:#406080; '>{</span>
            clicked<span style='color:#406080; '>:</span> <span style='color:#308080; '>!</span><span style='color:#200080; font-weight:bold; '>this</span><span style='color:#308080; '>.</span>state<span style='color:#308080; '>.</span>clicked
        <span style='color:#406080; '>}</span><span style='color:#308080; '>)</span><span style='color:#406080; '>;</span>
    <span style='color:#406080; '>}</span><span style='color:#308080; '>,</span>
    showData<span style='color:#406080; '>:</span> <span style='color:#200080; font-weight:bold; '>function</span><span style='color:#308080; '>(</span><span style='color:#308080; '>)</span> <span style='color:#406080; '>{</span>
        <span style='color:#200080; font-weight:bold; '>var</span> that <span style='color:#308080; '>=</span> <span style='color:#200080; font-weight:bold; '>this</span><span style='color:#406080; '>;</span>
        <span style='color:#200080; font-weight:bold; '>if</span> <span style='color:#308080; '>(</span><span style='color:#308080; '>!</span><span style='color:#200080; font-weight:bold; '>this</span><span style='color:#308080; '>.</span>state<span style='color:#308080; '>.</span>data<span style='color:#308080; '>)</span> <span style='color:#406080; '>{</span>
            $<span style='color:#308080; '>.</span>get<span style='color:#308080; '>(</span><span style='color:#800000; '>'</span><span style='color:#1060b6; '>/data</span><span style='color:#800000; '>'</span><span style='color:#308080; '>,</span> <span style='color:#200080; font-weight:bold; '>function</span><span style='color:#308080; '>(</span>data<span style='color:#308080; '>)</span><span style='color:#406080; '>{</span>
                <span style='color:#200080; font-weight:bold; '>var</span> data <span style='color:#308080; '>=</span> JSON<span style='color:#308080; '>.</span><span style='color:#200080; font-weight:bold; '>parse</span><span style='color:#308080; '>(</span>data<span style='color:#308080; '>)</span><span style='color:#406080; '>;</span>
                <span style='color:#200080; font-weight:bold; '>if</span> <span style='color:#308080; '>(</span>data <span style='color:#308080; '>&amp;&amp;</span> data<span style='color:#308080; '>.</span>result<span style='color:#308080; '>)</span> <span style='color:#406080; '>{</span>

                    that<span style='color:#308080; '>.</span>setState<span style='color:#308080; '>(</span><span style='color:#406080; '>{</span>
                        data<span style='color:#406080; '>:</span> data<span style='color:#308080; '>.</span>result
                    <span style='color:#406080; '>}</span><span style='color:#308080; '>)</span>
                <span style='color:#406080; '>}</span>
            <span style='color:#406080; '>}</span><span style='color:#308080; '>)</span>
        <span style='color:#406080; '>}</span> <span style='color:#200080; font-weight:bold; '>else</span> <span style='color:#406080; '>{</span>
            that<span style='color:#308080; '>.</span>setState<span style='color:#308080; '>(</span>
                <span style='color:#406080; '>{</span>
                    data<span style='color:#406080; '>:</span> <span style='color:#800000; '>\"</span><span style='color:#800000; '>\"</span>
                <span style='color:#406080; '>}</span>
            <span style='color:#308080; '>)</span>
        <span style='color:#406080; '>}</span>

    <span style='color:#406080; '>}</span><span style='color:#308080; '>,</span>
    render<span style='color:#406080; '>:</span> <span style='color:#200080; font-weight:bold; '>function</span><span style='color:#308080; '>(</span><span style='color:#308080; '>)</span> <span style='color:#406080; '>{</span>
        <span style='color:#200080; font-weight:bold; '>var</span> currentClass <span style='color:#308080; '>=</span> <span style='color:#200080; font-weight:bold; '>this</span><span style='color:#308080; '>.</span>state<span style='color:#308080; '>.</span>clicked <span style='color:#406080; '>?</span> <span style='color:#800000; '>'</span><span style='color:#1060b6; '>btn btn-success</span><span style='color:#800000; '>'</span> <span style='color:#406080; '>:</span> <span style='color:#800000; '>'</span><span style='color:#1060b6; '>btn btn-info</span><span style='color:#800000; '>'</span>
        <span style='color:#200080; font-weight:bold; '>return</span> <span style='color:#308080; '>(</span>
            <span style='color:#308080; '>&lt;</span>div<span style='color:#308080; '>></span>
            <span style='color:#308080; '>&lt;</span>p onClick<span style='color:#308080; '>=</span><span style='color:#406080; '>{</span><span style='color:#200080; font-weight:bold; '>this</span><span style='color:#308080; '>.</span>onSubmit<span style='color:#406080; '>}</span> <span style='color:#308080; '>></span>

                <span style='color:#308080; '>&lt;</span>button className<span style='color:#308080; '>=</span><span style='color:#406080; '>{</span>currentClass<span style='color:#406080; '>}</span><span style='color:#308080; '>></span>Click me <span style='color:#308080; '>&lt;</span><span style='color:#308080; '>/</span>button<span style='color:#308080; '>></span>


            <span style='color:#308080; '>&lt;</span><span style='color:#308080; '>/</span>p<span style='color:#308080; '>></span>
                <span style='color:#308080; '>&lt;</span>button className<span style='color:#308080; '>=</span><span style='color:#800000; '>\"</span><span style='color:#1060b6; '>btn</span><span style='color:#800000; '>\"</span> onClick<span style='color:#308080; '>=</span><span style='color:#406080; '>{</span><span style='color:#200080; font-weight:bold; '>this</span><span style='color:#308080; '>.</span>showData<span style='color:#406080; '>}</span><span style='color:#308080; '>></span>Show code <span style='color:#308080; '>&amp;&amp;</span> explain <span style='color:#308080; '>&lt;</span><span style='color:#308080; '>/</span>button<span style='color:#308080; '>></span>
                <span style='color:#308080; '>&lt;</span>div dangerouslySetInnerHTML<span style='color:#308080; '>=</span><span style='color:#406080; '>{</span><span style='color:#406080; '>{</span>__html<span style='color:#406080; '>:</span> <span style='color:#200080; font-weight:bold; '>this</span><span style='color:#308080; '>.</span>getMarkup<span style='color:#308080; '>(</span><span style='color:#308080; '>)</span> <span style='color:#406080; '>}</span><span style='color:#406080; '>}</span><span style='color:#308080; '>></span>
                <span style='color:#308080; '>&lt;</span><span style='color:#308080; '>/</span>div<span style='color:#308080; '>></span>
            <span style='color:#308080; '>&lt;</span><span style='color:#308080; '>/</span>div<span style='color:#308080; '>></span>
        <span style='color:#308080; '>)</span><span style='color:#406080; '>;</span>
    <span style='color:#406080; '>}</span>

<span style='color:#406080; '>}</span><span style='color:#308080; '>)</span><span style='color:#406080; '>;</span>


module<span style='color:#308080; '>.</span>exports <span style='color:#308080; '>=</span> <span style='color:#406080; '>{</span>
    DynamicButton<span style='color:#406080; '>:</span> DynamicButton
<span style='color:#406080; '>}</span>
</pre>"));
    }
}