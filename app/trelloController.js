'use strict'

angular.module('app').controller('trelloController', function ($scope, trelloService) {
    $scope.cartes = []

    var tablink
    var url = window.location.toString()
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0]

        var idTicket = getTicketId(activeTab)
        $scope.ticketId = idTicket
        if (!idTicket) {
            $scope.cartes = []
        } else {
            trelloService.rechercheCartes(idTicket).then(function (result) {
                $scope.cartes = result

                if (result.length === 0)
                {
                    chrome.browserAction.setBadgeBackgroundColor({ color: [238, 170, 86, 1] })
                    chrome.browserAction.setBadgeText({ text: '*' })
                }   
                else {
                    chrome.browserAction.setBadgeText({text: result.length.toString()})
                }
                 
            })
        }
    })

    function getTicketId(activeTab) {
        if (activeTab) {
            activeTab.url = 'http://helpdesk-groupe-burrus/front/ticket.form.php?id=54556x'
            var regex2 = new RegExp('.*helpdesk-groupe-burrus.*id=(.*)', 'g')
            var resultat = regex2.exec(activeTab.url)
            if (resultat && resultat.length > 0) {
                return resultat[1]
            }
        }

        return undefined
    }
})
