{% extends "../layer/layer.tpl" %}

{% block content %}
    <style>
        .news-content { width: 70%; margin: 0 auto; }
        .news-title { color: #007b43; text-align: center;}
        .news-date {padding: 20px 0; color: #868585; text-align: center; }
        .news-date span { margin: 0 20px;}
        .news-text { line-height: 26px; }
        .news-text p {text-indent: 2em}
    </style>
    <div class="news-content">
        <h1 class="news-title">{{ comments.newsTitle }}</h1>
        <div class="news-date">
            <span>创建日期: {{ comments.createdAt }}</span>
            <span>修改日期: {{ comments.updatedAt }}</span>
        </div>
        <div class="news-text">
            {{ comments.newsContent }}
        </div>
    </div>
{% endblock %}