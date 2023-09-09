/*var instance = M.Carousel.init({
    fullWidth: true,
    indicators: true
});

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems, options);
});*/

/*document.addEventListener('beforeunload', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, '');
});*/
document.addEventListener('DOMContentClicked', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, '');
    //var instance = M.FormSelect.getInstance(elem);
});

/*document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, 'mmm dd, yyyy');
  });*/



// Or with jQuery

$(function() {

    $('select').formSelect();
    /*$('.datepicker').datepicker();*/
    $('.sidenav').sidenav();

});


          

