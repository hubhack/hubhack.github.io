<div class="popup search-popup local-search-popup">
  <div class="local-search-header clearfix">
    <span class="search-icon">
      <i class="fa fa-search"></i>
    </span>
    <span class="popup-btn-close">
      <i class="fa fa-times-circle"></i>
    </span>
    <div class="local-search-input-wrapper">
      <input autocomplete="off"
             placeholder="{{ __('search.placeholder') }}" spellcheck="false"
             type="text" id="local-search-input">
    </div>
  </div>
  <div id="local-search-result">
    {% if theme.recent_posts.enable and theme.recent_posts.search %}
      <div style="text-align: center;padding: 3px 0 0;">
       <div style="margin-top: 20px;font-size: 18px;font-weight: 600;border-bottom: 1px solid #ccc;">
         <i class="fa fa-{{ theme.recent_posts.icon }}" aria-hidden="true"></i>
         {{ theme.recent_posts.title }}
       </div>
       <ul style="margin: 0;padding: 0;list-style: none;">
         {% set posts = site.posts.sort('-date') %}
         {% for post in posts.slice('0', '15') %}
           <li>
             <a href="{{ url_for(post.path) }}" title="{{ post.title }}" target="_blank">{{ post.title }}</a>
           </li>
         {% endfor %}
       </ul>
      </div>
    {% endif %}
  </div>
</div>
