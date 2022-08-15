---
layout: page
title:
excerpt: "An archive of cartoons sorted by date."

---

<ul class="post-list">
{% for post in site.categories.cartoon %} 
  <li><article><a href="{{ site.url }}{{ post.url }}">{{ post.title }}</a></article></li>
{% endfor %}
</ul>
