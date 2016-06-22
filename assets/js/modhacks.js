// fullpage handles this
//var hashTagActive = '';
//$('.scroll').click(function (event) {
//    if(hashTagActive != this.hash) { //this will prevent if the user click several times the same link to freeze the scroll.
//        event.preventDefault();
//        //calculate destination place
//        var dest = 0;
//        if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
//            dest = $(document).height() - $(window).height();
//        } else {
//            dest = $(this.hash).offset().top;
//        }
//        //go to destination
//        //$('html,body').animate({
//        //    scrollTop: dest
//        //}, 800, 'easein');
//        $('html,body').animate({
//            scrollTop: dest
//        }, 950, 'easeOutExpo');
//
//        hashTagActive = this.hash;
//    }
//});

var nav_li = $('#nav li');
nav_li.mouseover(function (evt) {
    //console.log(this);
    this.childNodes[0].childNodes[0].className = '';
});

nav_li.mouseout(function (evt) {
    //console.log(this.childNodes[0].childNodes[0])
    this.childNodes[0].childNodes[0].className = 'label';
});

// progress bar