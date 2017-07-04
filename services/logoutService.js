
module.exports={
     logout: (req, res) => {
        ses = req.session;
        //console.log("in logout" + ses.sesId);
        if (ses.email) {
            ses.destroy();
            info = {
                stat: true,
                msg: "you logged off successfully"
            }
        }
        else {
            info = {
                stat: false,
                msg: "you are not yet logged in"
            }
        }
        res.send(info);
        res.end();
    }
}