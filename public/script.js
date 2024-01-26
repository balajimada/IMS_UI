$(document).ready(function() {
    
 $('[data-toggle=offcanvas]').click(function() {
    $('.row-offcanvas').toggleClass('active');
  });
  
  
   $("#sidebarCollapse").on("click", function() {
    $("#sidebar").toggleClass("active");
    $(this).toggleClass("active");
  });
  
});