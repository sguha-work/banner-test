var bindClickEventsToNewsBlock,
    bindHooverEventsToNewsBlock,
    bindEvents,
    openURL;

openURL = (function(url) {
    window.open(url);
});

bindClickEventsToNewsBlock = (function(newsBlocks) {
    newsBlocks.on('click', function() {
        openURL($(this).data('news-url'));
    });
});

bindHooverEventsToNewsBlock = (function(newsBlocks) {
    newsBlocks.hover(function() {
        $(this).css({
            "opacity": 0.7
        });
    }, function() {
        $(this).css({
            "opacity": 1
        });
    });
});

bindEvents = (function(newsBlocks) {
    bindClickEventsToNewsBlock(newsBlocks);
    bindHooverEventsToNewsBlock(newsBlocks);
});

applyCssForSliding = (function() {

});

$(document).ready(function() {
    var newsBlocks = $(".banner-item-big, .banner-item-normal");

    bindEvents(newsBlocks);

    window.setTimeout(function() {
        applyCssForSliding();
    }, 1000);
    var resizeTask = null;
    $(window).resize(function() {
        if (resizeTask == null) {
            resizeTask = window.setTimeout(function() {
                alert("x");
                applyCssForSliding();
            }, 1000);
        } else {
            clearTimeout(resizeTask);
            resizeTask = null;
        }

    });

});