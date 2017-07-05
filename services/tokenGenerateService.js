const mongoose=require('mongoose');
var fetch = require('node-fetch');
module.exports={
    tokenGenerate: (req, res) => {
        var info = {};
        var result;
        ses = req.session;
        console.log(req.body);
        // ses.email=true;
        if (ses.email) {

            var getApps = require('../models/client.js');
            var GetApp = mongoose.model('clients', getApps);


            GetApp.findOne({ "_id": ses.app }, (err, doc) => {
                if (err) {
                    //console.log(docs);
                    info = {
                        stat: false,
                        msg: err
                    }
                    res.send(info);
                    res.end();
                } else {
                    if (doc != null) {
                        var url = 'https://fssfed.stage.ge.com/fss/as/token.oauth2?grant_type=' + doc.grantType + '&client_id=' + doc.clientId + '&client_secret=' + doc.clientSecret + '&scope=' + doc.scope;
                        console.log(url);
                        fetch(url, { method: "POST" })
                            .then(function successCallback(response) {
                                
                             
                                return response.json();

                            }).then(function(response){
                                 let info = {
                                    stat: true,
                                    token: response.access_token
                                }
                                res.send(info);
                                res.end();
                            })
                            .catch(function errorCallback(err) {   
                                next(err)
                            });
                        
                    }
                    //res.json({ error: err });

                };

            });
        //   schedule.tokenGenerate(ses.app,function(response){
        // console.log("at",response);
        //  res.send(response);
        // res.end();
//});
            //result=schedule.Hello();
           

        } else {
            info = {
                stat: false,
                msg: "please login to create app "
            }
            res.send(info);
            res.end();
        }

    }
 
}