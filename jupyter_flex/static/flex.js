// History tabs
// Taken from: https://github.com/jeffdavidgreen/bootstrap-html5-history-tabs

+function ($) {
    'use strict';
    $.fn.historyTabs = function() {
        var that = this;
        window.addEventListener('popstate', function(event) {
            if (event.state) {
                $(that).filter('[href="' + event.state.url + '"]').tab('show');
            }
        });
        return this.each(function(index, element) {
            $(element).on('show.bs.tab', function() {
                var stateObject = {'url' : $(this).attr('href')};

                if (window.location.hash && stateObject.url !== window.location.hash) {
                    window.history.pushState(stateObject, document.title, window.location.pathname + $(this).attr('href'));
                } else {
                    window.history.replaceState(stateObject, document.title, window.location.pathname + $(this).attr('href'));
                }
            });
            if (!window.location.hash && $(element).is('.active')) {
                // Shows the first element if there are no query parameters.
                $(element).tab('show');
            } else if ($(this).attr('href') === window.location.hash) {
                $(element).tab('show');
            }
        });
    };
}(jQuery);

$('.navbar a[data-toggle="tab"]').historyTabs();

// Activate tooltips
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

// Kernel status

window.debug_init = async (voila) => {
    const kernel = await voila.connectKernel();
    kernel.statusChanged.connect((sender, status) => {
      switch (status) {
        case "idle":
            $("#kernel-activity").removeClass("filled-circle").addClass("circle");
            $("#kernel-indicator").fadeOut(2000);
            break;
        case "busy":
            $("#kernel-activity").removeClass("circle").addClass("filled-circle");
            $("#kernel-indicator").fadeOut(2000);
            break;
        case "restarting":
            $("#kernel-indicator").text("Restarting kernel");
            $("#kernel-indicator").show();
            break;
        case "connected":
            $("#kernel-indicator").text("Kernel connected");
            $("#kernel-indicator").show();
            break;
        case "reconnecting":
            $("#kernel-indicator").text("Reconnecting kernel");
            $("#kernel-indicator").show();
            break;
        default:
            console.log("Unknown status: " + status);
      }
    });
};

// Look plot libraries elements and trigger resize events

var plot_resize = function() {
    var counter = 0;

    var looper = setInterval(function() {
        var nodelist = document.querySelectorAll(".js-plotly-plot")
        var plots = Array.from(nodelist)
        plots.map(function (obj){ obj.style.width = "100%"; })
        plots.map(function (obj){ obj.style.height = "100%"; })
        if (nodelist.length > 0) {
            window.dispatchEvent(new Event("resize"))
        }

        var nodelist = document.querySelectorAll(".bqplot")
        var plots = Array.from(nodelist)
        plots.map(function (obj){ obj.style.width = "100%"; })
        plots.map(function (obj){ obj.style.height = "100%"; })
        if (nodelist.length > 0) {
            window.dispatchEvent(new Event("resize"));
        }

        var nodelist = document.querySelectorAll(".vega-embed")
        var plots = Array.from(nodelist)
        if (nodelist.length > 0) {
            window.dispatchEvent(new Event("resize"));
        }

        if (counter >= 25) {
            clearInterval(looper);
        }
        counter++;
    }, 200);
}
plot_resize();


flex_nav_click = function() {
    plot_resize();
}
