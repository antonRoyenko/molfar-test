(function($) {

  var min_w = 300;
  var vid_w_orig;
  var vid_h_orig;

  $(function() {

      vid_w_orig = parseInt($('video').attr('width'));
      vid_h_orig = parseInt($('video').attr('height'));

      $(window).resize(function () { fitVideo(); });
      $(window).trigger('resize');

  });

  function fitVideo() {

      $('#video-viewport').width($('.fullsize-video-bg').width());
      $('#video-viewport').height($('.fullsize-video-bg').height());

      var scale_h = $('.fullsize-video-bg').width() / vid_w_orig;
      var scale_v = $('.fullsize-video-bg').height() / vid_h_orig;
      var scale = scale_h > scale_v ? scale_h : scale_v;

      if (scale * vid_w_orig < min_w) {scale = min_w / vid_w_orig;};

      $('video').width(scale * vid_w_orig);
      $('video').height(scale * vid_h_orig);

      $('#video-viewport').scrollLeft(($('video').width() - $('.fullsize-video-bg').width()) / 2);
      $('#video-viewport').scrollTop(($('video').height() - $('.fullsize-video-bg').height()) / 2);

  };

  initSmothScroll();

  function initSmothScroll(){
    var win = jQuery(window);
    var links = jQuery('#vertical-nav a');
    var navLinks = jQuery('#vertical-nav a');

    navLinks.each(function(){
      var link = jQuery(this);
      var href = link.attr('href');
      if (href.charAt(0) === '#' && href !== '#'){
        var target = jQuery(href);
        link.data('target', target);
      }
    });

    function checkActive(){
      var fittingLink = navLinks.filter(function(){
        var link = jQuery(this);
        return link.data('target') && link.data('target').offset().top <= (jQuery(window).scrollTop())
      });

      var activeLink = fittingLink.eq(fittingLink.length - 1);
      navLinks.parent().removeClass('active');
      activeLink.parent().addClass('active');
    };

    checkActive();

    function clickHandler(e){
      e.preventDefault();

      var link = jQuery(this);
      var href = link.attr('href');
      if (href.charAt(0) === '#'){
        if (href === '#'){
          var target = jQuery('body');
        } else {
          var target = jQuery(href);
        }
      }

      if (!target || !target.length) return;

      jQuery('html, body').animate({
        scrollTop: target.offset().top
      });
    }

    links.on('click touchstart', clickHandler);
    win.on('scroll', checkActive);
  }

  var chart = new Chart(document.getElementById("myChart"),
  {"type":"line", "data": {"labels":
  ["January","February","March","April","May","June","July"],
  "datasets":[
    {"label":"My First Dataset",
    "data":[65,59,80,81,56,55,40],
    "fill":"blue","borderColor":"rgb(75, 192, 192)",
    "lineTension":0.1}
  ]}, "options":{}
});

})(jQuery);
