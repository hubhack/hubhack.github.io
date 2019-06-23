'use strict';

var should = require('chai').should(),
  migrator = require('../migrator.js'),
  fakehexoFactory = require('./fakehexoFactory.js'),
    fakeHexo;

describe("migrator", function () {

  this.timeout(10000);

  beforeEach(function () {
    fakeHexo = fakehexoFactory.create();
    migrator.registerMigrator(fakeHexo);
  });

  it("registers rss", function () {
    fakeHexo.setValues.registeredType.should.equal("rss");
  });

    context("called with \"rss\"", function () {
    it("passes parameter through", function (done) {
      fakeHexo.call("migrate", { _: ["rss"] }, function (err) {
        if (err) throw err;
        fakeHexo.setValues.calledType.should.equal("rss");
        done();
      });
    });
  });

  context("alias flag not passed", function () {

    it("creates posts without alias field", function (done) {
      fakeHexo.call("migrate", { _: ["rss", "https://github.com/danmactough/node-feedparser/raw/master/test/feeds/rss2sample.xml"] },
        function (err) {
          if (err) throw err;
          fakeHexo.setValues.receivedPosts.length.should.be.gt(0);
          should.not.exist(fakeHexo.setValues.receivedPosts[0].alias);
          done();
        });
    });
  });

  context("alias flag passed", function () {
    it("creates posts with alias field", function (done) {
      fakeHexo.call("migrate", { _: ["rss", "https://github.com/danmactough/node-feedparser/raw/master/test/feeds/rss2sample.xml"], alias: true },
        function (err) {
          if (err) throw err;
          fakeHexo.setValues.receivedPosts.length.should.be.gt(0);
          should.exist(fakeHexo.setValues.receivedPosts[0].alias, "alias missing");
          done();
        });
    });
  });
});

