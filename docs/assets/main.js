$(document).ready(function() {
  $('.nav-item li').on('click', function(el) {
    $('.nav-item li').removeClass('active');
    $(this).addClass('active');
    var id = $(this)[0] ? $(this)[0].id : '';
    var item = $('#Item-' + id);
    if (id && item) {
      $('html,body').animate({ scrollTop: item.offset().top - 20 }, 800);
    }
  });
});
