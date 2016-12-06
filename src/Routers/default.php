<?php
return [
    ['GET', '/', ['Twitch\Controllers\Main', 'index'], ['']],
    ['GET', '/game/{id}', ['Twitch\Controllers\Main', 'game'], ['']],
    ['GET', '/json', ['Twitch\Controllers\Main', 'json'], ['']],
    ['GET', '/form', ['Twitch\Controllers\Main', 'form'], ['']],
    ['GET', '/product/{id}', ['Twitch\Controllers\Main', 'product'], ['']],
    ['GET', '/data', ['Twitch\Controllers\Main', 'data'], ['']],
    ['POST', '/product_list', ['Twitch\Controllers\Main', 'product_list'], ['']],
    ['POST', '/sku', ['Twitch\Controllers\Main', 'sku'], ['']],
    ['POST', '/package', ['Twitch\Controllers\Main', 'package'], ['']],
];