(function (global) {

    // Set up a name space for our utilitiy
    var ajaxUtils = {};

    // Return an HTTP request Object
    function getRequestObject() {
        if (window.XMLHttpRequest) {
            return (new XMLHttpRequest);
        } else if (window.ActiveXObject) {
            // for verry old IE browser (optional)
            return (new ActiveXObject("Microsoft.XMLHTTP"));
        } else {
            global.alert("Ajax is not supported");
            return (null);
        }
    }
    // Makes and Ajax GET Request to 'requestURL'
    ajaxUtils.sendGetRequest = function (requestURL, responseHandler, isJsonResponse) {
        var request = getRequestObject();
        request.onreadystatechange = function () {
            handlerResponse(request, responseHandler, isJsonResponse);
        };
        request.open("GET", requestURL, true);
        request.send(null); // for POST only
    };

    // Only calls user provided 'responseHandler'
    // function if response is ready
    // and not an error
    function handlerResponse(request, responseHandler, isJsonResponse) {
        if ((request.readyState == 4) && (request.status == 200)) {

            // Default to  isJsonResponse = true
            if (isJsonResponse == undefined) {
                isJsonResponse = true;
            }
            if (isJsonResponse) {
                responseHandler(JSON.parse(request.responseText));
            } else {
                responseHandler(request.responseText);
            }
        }
    }

    // Expose the Utility to the global Object
    global.$ajaxUtils = ajaxUtils;

})(window);


//  new script.js file

// DOMContentLoaded  or in jquery $(function(){});
document.addEventListner("DOMContentLoaded", function (event) {
    document.querySelector("button").addEventListner("click", function () {
        $ajaxUtils.sendGetRequest("API_URL", function (res) {
            document.getElementById("ID").innerHTML = res;
        });
    });
})
