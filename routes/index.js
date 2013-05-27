//var models = require('../models/models')
var Website = require('../models/website.js');
var Target = require('../models/target.js');

// ADD USER NAME AND OAUTH TOKEN
var client = require('twilio')('AC74d28e73883affa3b70c0f884a0142ec', 'ea4b7bd9285aa53913b32924feed8bce');



exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.dev = function(req, res){
    res.render('home', {title: 'Distract Dev'});
}

exports.distract = function(req, res){
    // upon hitting the button

    Website.findOneAndRemove({}, 'name url').exec(
        function(err, site) {
            if(err)
                return console.log("empty - add more websites!", err);
            if (site==null) {
                console.log("empty - add more websites!");
                return res.redirect('/dev');
            }
            sendText("Ok see this: " + site.name + " - " + site.url, site, res);
        }
    );

}



exports.addSite = function(req, res){

    // THIS SHOULD BE AN AJAX POST REQUEST!

    // check if malformed URL
    // check if it's a used URL or new one
    // if it's new, add it
    // if not, then say it's used already

    console.log(req.body);

    // adds new URL to db
    var website = new Website({ 
        name: req.body.name,
        url: req.body.url
    });

    website.save(function(err){
        if(err)
            return console.log("error saving" + website.name);
        var message = ('You\'ve added ' + req.body.name + ' with the url: ' + req.body.url + '!');
        res.render('index', { title: message });
    });
};




// Send an SMS text message

function sendText(message, site, res){

    client.sendSms({

        to:'+17792329696', // Any number Twilio can deliver to
        from: '+12242655660', // A number you bought from Twilio and can use for outbound communication
        body: message // body of the SMS message

    }, function(err, responseData) { //this function is executed when a response is received from Twilio
        
        if (!err) { // "err" is an error received during the request, if any

            // "responseData" is a JavaScript object containing data received from Twilio.
            // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
            // http://www.twilio.com/docs/api/rest/sending-sms#example-1

            console.log(responseData.from); // outputs "+12242655660"
            console.log(responseData.body); // outputs "hey darlin"
            var message = ("Your message to Dev: " + "Ok see this: " + site.name + " - " + site.url);
            res.render('index', { title: message });
        }
    });

}

