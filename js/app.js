$(document).ready(function() {
  $('.button-collapse').sideNav();
  $('.collapsible').collapsible({
    accordion: false
  });
  return routie(':tag?', function(tag) {
    console.log(tag);
    if (tag === void 0) {
      return $('article').show();
    } else {
      $('article').hide();
      return $('article.' + tag).show();
    }
  });
});
