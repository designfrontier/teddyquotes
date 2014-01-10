(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['main'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"quote\" class=\"quote-color serif large quote\">\r\n    The only man who makes no mistakes is the man who never does anything.\r\n</div>\r\n<div class=\"footer nav\">\r\n    <div class=\"button active left-1\"><</div>\r\n    <div class=\"button main active center add\">+</div>\r\n    <div class=\"button right-2\">></div>\r\n    <div class=\"button right-1 active\">cal.</div>\r\n</div>";
  });
})();