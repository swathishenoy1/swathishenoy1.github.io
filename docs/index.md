---
layout: default
title: Home
---

<div class="post-list">
  {% for post in site.posts %}
    <div class="post-card">
      <div class="post-meta">{{ post.date | date: "%b %d, %Y" }}</div>
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <p>{{ post.excerpt | strip_html | truncate: 220 }}</p>
      <a href="{{ post.url | relative_url }}">Read article →</a>
    </div>
  {% endfor %}
</div>
