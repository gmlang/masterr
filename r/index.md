---
layout: page
title:
excerpt: "An archive of R tips sorted by date."

---

<ul class="post-list">
{% for post in site.categories.r %} 
  <li><article><a href="{{ site.url }}{{ post.url }}">{{ post.title }}</a></article></li>
{% endfor %}
</ul>
