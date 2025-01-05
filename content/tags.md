---
title: Tags
descirption: List of Tags
---
<main class="print">
{% include "partials/header.njk" %}
<div class="container ">
<div class="row mts-5">

<div class="col-md-3 p-3">
{% include "partials/collections.njk" %}
{% include "partials/rss.njk" %}
</div>

<div class="col-md-9 p-3">
<div class="card mb-3">
<h3 class="card-header text-maron"><strong><a href="{{home.url}}" class="no-deco text-maron">{{title}}</a></strong></h3>
<div class="card-body">
<div class="row">
{% for tag in collections | getKeys | filterTagList %}
{% set tagUrl %}/tags/{{ tag | slugify }}/{% endset %}
<div class="col-md-3 col-6 p-3"><a href="{{ tagUrl }}" class="btn btn-light rounded p-3 no-deco mt-1 mb-1 col-12">{{ tag }}</a></div>
{% endfor %}
</div>
</div>
</div>

</div>

</div>
</div>

</main>

