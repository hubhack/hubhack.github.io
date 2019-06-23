var FeedParser = require('feedparser'),
  async = require('async'),
  tomd = require('to-markdown').toMarkdown,
  request = require('request'),
  url = require('url'),
  fs = require('fs');

exports.registerMigrator = function (hexo) {  
  hexo.extend.migrator.register('rss', function (args, callback) {
    var source = args._.shift();

    if (!source) {
      var help = [
        'Usage: hexo migrate rss <source> [--alias]',
        '',
        'For more help, you can check the docs: http://hexo.io/docs/migration.html'
      ];

      console.log(help.join('\n'));
      return callback();
    }

    var log = hexo.log,
      post = hexo.post,
      untitledPostCounter = 0,
      stream;

    // URL regular expression from: http://blog.mattheworiordan.com/post/13174566389/url-regular-expression-for-links-with-or-without-the
    if (source.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[.\!\/\\w]*))?)/)) {
      stream = request(source);
    } else {
      stream = fs.createReadStream(source);
    }

    log.i('Analyzing %s...', source);

    var feedparser = new FeedParser(),
      posts = [];

    stream.pipe(feedparser)
      .on('error', callback);

    feedparser.on('error', callback);

    feedparser.on('readable', function () {
      var stream = this,
        meta = this.meta,
        item;

      while (item = stream.read()) {

        if (!item.title) {
          untitledPostCounter += 1;
          var untitledPostTitle = "Untitled Post - " + untitledPostCounter
          item.title = untitledPostTitle;
          log.w("Post found but without any titles. Using %s", untitledPostTitle)
        } else {
          log.i('Post found: %s', item.title);
        }

        var newPost = {
          title: item.title,
          date: item.date,
          tags: item.categories,
          content: tomd(item.description || '')
        };

        if (args.alias) {
          newPost.alias = url.parse(item.link).pathname;
        }

        posts.push(newPost);

      }
    });

    stream.on('end', function () {
      async.each(posts, function (item, next) {
        post.create(item, next);
      }, function (err) {
        if (err) return callback(err);

        log.w('%d posts did not have titles and were prefixed with "Untitled Post".', untitledPostCounter);
        log.i('%d posts migrated.', posts.length);
        callback();
      });
    });
  });
}
