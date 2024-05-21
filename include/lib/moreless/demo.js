window.$ = window.jQuery = require("jquery");
require("./index");
$(function () {
  $(".item").moreLess({
    moreLabel: "... Read more",
    lessLabel: "... Read less",
    moreClass: "read-more-link",
    lessClass: "read-less-link",
    wordsCount: 50,
  });
});
