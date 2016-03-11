/*
GetUserId
*/

exports.get = function(request, response) {
    
    console.log("USER --> " + request.user.userId)
    request.user.getIdentities({
        success: function (identities) {
            var http = require('request');
            console.log('Identities: ', identities);
            var url = 'https://graph.facebook.com/me?fields=id,name,birthday,hometown,email,picture,gender,friends&access_token=' +
                identities.facebook.accessToken;
 
            var reqParams = { uri: url, headers: { Accept: 'application/json' } };
            http.get(reqParams, function (err, resp, body) {
                var userData = JSON.parse(body);
                console.log("Sending User")
                 response.send(statusCodes.OK, { "userId" : userData.id });
                });
            }
        });
};