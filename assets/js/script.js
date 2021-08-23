// Passive event listeners
jQuery.event.special.touchstart = {
	setup: function (_, ns, handle) {
		'use strict';
    this.addEventListener('touchstart', handle, {
      passive: !ns.includes('noPreventDefault')
    });
  }
};
jQuery.event.special.touchmove = {
	setup: function (_, ns, handle) {
		'use strict';
    this.addEventListener('touchmove', handle, {
      passive: !ns.includes('noPreventDefault')
    });
  }
};

// Preloader js
$(window).on('load', function () {
  'use strict';
  $('.preloader').fadeOut(0);
});

(function ($) {
  'use strict';

  // scroll function
  $(window).scroll(function () {
    // navfixed
    if ($('.navigation').offset().top > 50) {
      $('.navigation').addClass('nav-bg');
    } else {
      $('.navigation').removeClass('nav-bg');
    };

    // search add for homepage
    var height = $('#banner').innerHeight();
    if ($('.navigation').offset().top > height) {
      $('.search-wrapper').addClass('search-sticky');
      $('.navigation').addClass('nav-bg-home');
    } else {
      $('.search-wrapper').removeClass('search-sticky');
      $('.navigation').removeClass('nav-bg-home');
    };
  });
})(jQuery);

(function ($) {
  'use strict';

  // masonry
  setTimeout(function () {
    $('.masonry-wrapper').masonry({
      columnWidth: 1
    });
  }, 1500);
})(jQuery);

(function ($) {
  'use strict';

  // Get Parameters from some url
  var getUrlParameter = function getUrlParameter(sPageURL) {
    var url = sPageURL.split('?');
    var obj = {};
    if (url.length == 2) {
      var sURLVariables = url[1].split('&'),
        sParameterName,
        i;
      for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        obj[sParameterName[0]] = sParameterName[1];
      }
      return obj;
    } else {
      return undefined;
    }
  };
  // Execute actions on images generated from Markdown pages
  var images = $(".content img").not(".inline");
  // Wrap image inside a featherlight (to get a full size view in a popup)
  images.wrap(function () {
    var image = $(this);
    if (!image.parent("a").length) {
      return "<a href='" + image[0].src + "' data-featherlight='image'></a>";
    }
  });
  // Change styles, depending on parameters set to the image
  images.each(function (index) {
    var image = $(this)
    var o = getUrlParameter(image[0].src);
    if (typeof o !== "undefined") {
      var h = o["height"];
      var w = o["width"];
      var c = o["classes"];
      image.css("width", function () {
        if (typeof w !== "undefined") {
          return w;
        } else {
          return "auto";
        }
      });
      image.css("height", function () {
        if (typeof h !== "undefined") {
          return h;
        } else {
          return "auto";
        }
      });
      if (typeof c !== "undefined") {
        var classes = c.split(',');
        for (i = 0; i < classes.length; i++) {
          image.addClass(classes[i]);
        }
      }
    }
  });
})(jQuery);

(function ($) {
  'use strict';

  // tab
  $('.tab-content').find('.tab-pane').each(function (idx, item) {
    var navTabs = $(this).closest('.code-tabs').find('.nav-tabs'),
      title = $(this).attr('title');
    navTabs.append('<li class="nav-item mb-0 pb-0"><a class="nav-link" href="#">' + title + '</a></li>');
  });

  $('.code-tabs ul.nav-tabs').each(function () {
    $(this).find("li:first").addClass('active');
  })

  $('.code-tabs .tab-content').each(function () {
    $(this).find("div:first").addClass('active');
  });

  $('.nav-tabs a').click(function (e) {
    e.preventDefault();
    var tab = $(this).parent(),
      tabIndex = tab.index(),
      tabPanel = $(this).closest('.code-tabs'),
      tabPane = tabPanel.find('.tab-pane').eq(tabIndex);
    tabPanel.find('.active').removeClass('active');
    tab.addClass('active');
    tabPane.addClass('active');
  });

})(jQuery);

(function ($) {
  'use strict';
  // clipboard
  var clipInit = false;
  $('code').each(function () {
    var code = $(this),
      text = code.text();
    if (text.length > 2) {
      if (!clipInit) {
        var text, clip = new ClipboardJS('.copy-to-clipboard', {
          text: function (trigger) {
            text = $(trigger).prev('code').text();
            return text.replace(/^\$\s/gm, '');
          }
        });
        clipInit = true;
      }
      code.after('<span class="copy-to-clipboard ti-clipboard"></span>');
    }
  });
  $('.copy-to-clipboard').click(function () {
    $(this).removeClass('ti-clipboard').addClass('ti-check-box');
  });
})(jQuery);

(function ($) {
  'use strict';

  // search
  $('#search-by').keyup(function () {
    if (this.value) {
      $(this).addClass('active')
    } else {
      $(this).removeClass('active')
    }
  })
})(jQuery);

(function ($) {
  'use strict';

  // featherlight
  $(function () {
    $('a[rel="lightbox"]').featherlight({
      root: 'body.content'
    });
  });

})(jQuery);

(function ($) {
  'use strict';
  // anchorjs https://www.bryanbraun.com/anchorjs/
  anchors.add('.content h2, .content h3, .content h4, .content h5');
})(jQuery);

(function ($) {
  'use strict';
  // Accordions
  $('.collapse').on('shown.bs.collapse', function () {
    $(this).parent().find('.ti-plus').removeClass('ti-plus').addClass('ti-minus');
  }).on('hidden.bs.collapse', function () {
    $(this).parent().find('.ti-minus').removeClass('ti-minus').addClass('ti-plus');
  });
})(jQuery);

(function ($) {
  'use strict';
  // feedback accordion
  $('.feedback-btn').on('click', function () {
    $(this).removeClass('deactive');
    $(this).siblings().addClass('deactive');
  });
})(jQuery);

(function ($) {
  'use strict';

  // table of content
  var containerEl = document.querySelector('#TableOfContents');
  if (containerEl) {
    new ScrollMenu('#TableOfContents a', {
      duration: 400,
      activeOffset: 15,
      scrollOffset: 15,
    })
  }
})(jQuery);

(function ($) {
  'use strict';

  /* ========================================================================= */
  /*	animation scroll js
  /* ========================================================================= */

  var html_body = $('html, body');
  $('.page-scroll').on('click', function () { //use page-scroll class in any HTML tag for scrolling
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        html_body.animate({
          scrollTop: target.offset().top - 15
        }, 1000, 'easeInOutExpo');
        return false;
      }
    }
  });

  // easeInOutExpo Declaration
  jQuery.extend(jQuery.easing, {
    easeInOutExpo: function (x, t, b, c, d) {
      if (t === 0) {
        return b;
      }
      if (t === d) {
        return b + c;
      }
      if ((t /= d / 2) < 1) {
        return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      }
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
  });

})(jQuery);