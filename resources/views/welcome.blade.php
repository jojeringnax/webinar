<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="icon" href="{{asset('/img/favicon.png')}}" sizes="16x16" type="image/png">
        <link rel="stylesheet" href="">
        <link href="{{ asset('css/app.css') }}" rel="stylesheet" />
        <title>WebinarsApp</title>
    </head>
    <body>
        <div id="app"></div>
        <script src="{{asset('/js/app.js')}}"></script>
    </body>
</html>
