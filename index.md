---
layout: page
title: Tim's Blog
tagline: Welcome
---
{% include JB/setup %}

<h3>Newest Blog</h3>
{% for post in site.posts %}
  <div class="item">
    <span class="date">{{ post.date | date_to_string }}</span>
    <span class="dot icon-radio-unchecked"></span>
    <span class="title"><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></span>
  </div>
{% endfor %}

<script type="text/javascript">
  $(function(){
    $(".item")
  });
</script>


