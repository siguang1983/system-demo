{% extends "../layer/layer.tpl" %}

{% block content %}
    <style>
        .news-list { width: 80%; margin: 0 auto; line-height: 28px;}
        a {color: #707070; font-size: 14px;}
        a:hover { color: #000 }
    </style>
    <div class="news-list">
        <ul>
            {% for comment in comments %}
            <li>
                <a href="/web/getNewsContent?id={{comment._id}}">{{comment.newsTitle}}</a>
            </li>
            {% endfor %}
        </ul>
    </div>
{% endblock %}