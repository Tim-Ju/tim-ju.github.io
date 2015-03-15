---
layout: page
title: Tim's Blog
tagline: Welcome
---
{% include JB/setup %}

<ul class="list-group">
  {% for post in site.posts %}
    <li class="list-group-item"><span class="pub-time">{{ post.date | date_to_string }}</span> &nbsp; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>


