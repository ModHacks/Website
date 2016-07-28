var nav_li = $('#nav li');

nav_li.mouseover(function (evt) {
    this.childNodes[0].childNodes[0].className = '';
});

nav_li.mouseout(function (evt) {
    this.childNodes[0].childNodes[0].className = 'label';
});

// progress bar

var anchor_tags = ['splash', 'about', 'faq', 'sponsor'];
function update_progress_bar(index, nextIndex, direction) {
    console.log('index: ' + index + ' nextI: ' + nextIndex + ' dir: ' + direction);

    // // set progress bar by nextIndex
    // for(var i = 0; i < anchor_tags.length; i++) {
    //     if ($.inArray('progress', nav_li[i].childNodes[0].childNodes[1].classList) > -1) {
    //         nav_li[i].childNodes[0].childNodes[1].classList.remove('progress')
    //     }
    // }

    // for(var i = 0; i < nextIndex; i++) {
    //     nav_li[i].childNodes[0].childNodes[1].classList.add('progress')
    // }
}

$(document).ready(function() {
    $('#fullpage').fullpage({
        anchors: anchor_tags,
        onLeave: update_progress_bar,
        afterLoad: function(anchorLink, index) {
            console.log('afterload index: ' + index )
            //nav_li[index - 1].childNodes[0].childNodes[1].classList.add('progress')
        }
    });
});