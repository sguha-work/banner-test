var bindClickEventsToNewsBlock,
    bindHooverEventsToNewsBlock,
    bindEvents,
    openURL,
    applyCssForSliding,
    getNumberOfNewsBlockPerPage,
    slideLeft;

getNumberOfNewsBlockPerPage = (function() {
    return 9;
});

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

applyCssForSliding = (function(numberOfNewsBlocksPerPage) {
    var newsBlocks,
        newsBlocksLength,
        index,
        windowWidth;

    windowWidth = $(window).width();
    newsBlocks = $(".banner-item-big, .banner-item-normal");
    newsBlocksLength = newsBlocks.length;
    // newsBlocks.eq(1).parent().css({
    //     "position": "relative"
    // });

    index = 0;
    newsBlocks.each(function() {
        $(this).data('index', index);
        if (index < numberOfNewsBlocksPerPage) {

        } else {
            //$(this).hide();
            $(this).css({
                "left": windowWidth * (parseInt(index / 9)) + "px"
            });
        }
        index += 1;
    });
});

var getLeftValueAsInteger = (function(leftValue) {
    var value = parseInt(leftValue.split("px")[0]);
    console.log(value);
    return value;
});

slideLeft = (function() {
    var newsBlocks,
        newsBlocksLength,
        windowWidth,
        visibleNewsBlocks,
        leftValueOfLastNewsBlock,
        promiseArray;

    promiseArray = [];
    windowWidth = $(window).width();
    newsBlocks = $(".banner-item-big, .banner-item-normal");

    leftValueOfLastNewsBlock = newsBlocks.last().css("left");
    //alert(leftValueOfLastNewsBlock);
    newsBlocks.each(function() {
        var element = $(this);
        var promise = new Promise(function(resolve, reject) {
            var left = getLeftValueAsInteger(element.css("left")) - windowWidth;
            element.animate({
                "left": left + "px"
            }, 1000, function() {
                resolve();
            });
        });
        promiseArray.push(promise);
    });

    Promise.all(promiseArray, function() {
        alert("done");
    });

});

$(document).ready(function() {

    var newsBlocks,
        numberOfNewsBlocksPerPage;

    numberOfNewsBlocksPerPage = getNumberOfNewsBlockPerPage();

    newsBlocks = $(".banner-item-big, .banner-item-normal");

    bindEvents(newsBlocks);

    window.setTimeout(function() {
        applyCssForSliding(numberOfNewsBlocksPerPage);
    }, 1000);
    var resizeTask = null;
    $(window).resize(function() {
        if (resizeTask == null) {
            resizeTask = window.setTimeout(function() {
                numberOfNewsBlocksPerPage = getNumberOfNewsBlockPerPage();
                applyCssForSliding(numberOfNewsBlocksPerPage);
            }, 1000);
        } else {
            clearTimeout(resizeTask);
            resizeTask = null;
        }

    });
    window.setInterval(function() {
        slideLeft();
    }, 5000);
});