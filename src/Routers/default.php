<?php
return [
    ['GET', '/', ['Twitch\Controllers\Main', 'index'], ['']],
    ['GET', '/game/{id}', ['Twitch\Controllers\Main', 'game'], ['']],
    ['GET', '/json', ['Twitch\Controllers\Main', 'json'], ['']]
];