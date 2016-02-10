<?php
return [
    ['GET', '/', ['Twitch\Controllers\Main', 'index'], ['']],
    ['GET', '/game/{id}', ['Twitch\Controllers\Main', 'game'], ['']]
];