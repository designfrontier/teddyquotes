(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['addTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"quote\" class=\"quote-color serif large quote\">\r\n    <textarea class=\"new-quote quote-input serif\" placeholder=\"Enter quote here&hellip;\" name=\"quote-text\"></textarea>\r\n    <input type=\"text\" class=\"quote-input serif small-pad-left\" name=\"quote-source\" placeholder=\"Source&hellip;\">\r\n</div>\r\n\r\n\r\n<div class=\"footer nav\">\r\n    <div class=\"button active left nav-main\"><</div>\r\n    <div class=\"button main active center js-save\">save</div>\r\n    <div class=\"button active right-1\" id=\"camera\">photo</div>\r\n</div>";
  });
templates['main'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"quote\" class=\"quote-color serif large quote\">\r\n    ";
  if (helper = helpers.text) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.text); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n</div>\r\n<div class=\"footer nav\">\r\n    <div class=\"button active left-1\"><</div>\r\n    <div class=\"button main active center add\">+</div>\r\n    <div class=\"button right-2\">></div>\r\n    <div class=\"button right-1 active\">cal.</div>\r\n</div>";
  return buffer;
  });
})();