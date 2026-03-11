
function getOffSet(){
  return 0;
}

function setParallaxPosition($doc, multiplier, $object){
  var offset = getOffSet();
  var from_top = $doc.scrollTop(),
    bg_css = 'center ' +(multiplier * from_top - offset) + 'px';
  $object.css({"background-position" : bg_css });
}

var background_image_parallax = function($object, multiplier, forceSet){
  multiplier = typeof multiplier !== 'undefined' ? multiplier : 0.5;
  multiplier = 1 - multiplier;
  var $doc = $(document);

  if(forceSet) {
    setParallaxPosition($doc, multiplier, $object);
  } else {
    $(window).scroll(function(){          
      setParallaxPosition($doc, multiplier, $object);
    });
  }
};

var background_image_parallax_2 = function($object, multiplier){
  multiplier = typeof multiplier !== 'undefined' ? multiplier : 0.5;
  multiplier = 1 - multiplier;
  var $doc = $(document);
  $object.css({"background-attachment" : "fixed"});
  $(window).scroll(function(){
    var firstTop = $object.offset().top,
        pos = $(window).scrollTop(),
        yPos = Math.round((multiplier * (firstTop - pos)) - 186);              

    var bg_css = 'center ' + yPos + 'px';

    $object.css({"background-position" : bg_css });
  });
};

$(function(){
  // Hero Section - Background Parallax
  background_image_parallax($(".tm-parallax"), 0.30, false);
  background_image_parallax_2($("#contact"), 0.80);   
  
  // Handle window resize
  window.addEventListener('resize', function(){
    background_image_parallax($(".tm-parallax"), 0.30, true);
  }, true);

  // Detect window scroll and update navbar
  var lastScrollTop = 0;
  $(window).scroll(function(e){          
    var currentScroll = $(this).scrollTop();
    
    if(currentScroll > lastScrollTop && currentScroll > 120) {
      // Scrolling DOWN
      $('.tm-navbar').addClass("hide");
    } else {
      // Scrolling UP
      $('.tm-navbar').removeClass("hide");
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
  
  // Close mobile menu after click 
  $('#tmNav a').on('click', function(){
    $('.navbar-collapse').removeClass('show'); 
  })

  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 400, function(){
        window.location.hash = hash;
      });
    }
  });


  // form validation logic moved here
  function setValidity(el, state) {
    el.classList.remove('valid','invalid','missing');
    if(state) el.classList.add(state);
  }
  function validateField(el) {
    var val = el.value.trim();
    if(!val) {
      setValidity(el,'missing');
      return;
    }
    if(el.name === 'name') {
      if(/\d/.test(val)) setValidity(el,'invalid');
      else setValidity(el,'valid');
    } else if(el.name === 'phone') {
      if(!/^\d{8}$/.test(val)) setValidity(el,'invalid');
      else setValidity(el,'valid');
    } else if(el.name === 'email') {
      var emailPattern = /^[^\s@]+@[^\s@]+\.com$/i;
      if(!emailPattern.test(val)) setValidity(el,'invalid');
      else setValidity(el,'valid');
    } else if(el.tagName === 'SELECT') {
      setValidity(el,'valid');
    } else {
      setValidity(el,'valid');
    }
  }
  $('#registerModal').on('shown.bs.modal', function() {
    var $form = $(this).find('form#clubForm');
    $form.find('input, select, textarea').each(function() {
      this.addEventListener('input', function() { validateField(this); });
      this.addEventListener('change', function() { validateField(this); });
    });
    $form.on('submit', function(e){
      var ok = true;
      $(this).find('input, select, textarea').each(function(){
        validateField(this);
        if(this.classList.contains('invalid') || this.classList.contains('missing')) ok = false;
      });
      if(!ok) {
        e.preventDefault();
      }
    });
  });
});
function resetForm() {
  var form = document.getElementById('clubForm');
  form.reset();
  form.querySelectorAll('input, select, textarea').forEach(function(el) {
    el.classList.remove('valid', 'invalid', 'missing');
  });
}
  