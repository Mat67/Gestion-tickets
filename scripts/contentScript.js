
    chrome.extension.onRequest.addListener(
        function(request, sender, sendResponse) {
            if(request.method == "getText"){
                var d = { 
                    titre: document.getElementsByName('name')[0].value,
                    method: 'getText'
                }

                sendResponse(d); //same as innerText
            }
        }
    )