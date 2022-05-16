const fs= require("fs")
exports.i18n=(req,res,next)=>{

    if (!req.session.locale && !req.cookies.lang){
        req.session.locale = "en";
        res.cookie('lang', req.session.locale);
    }else if (req.query.locale){
        req.session.locale = req.query.locale;
        res.cookie('lang', req.session.locale);
    }else if(req.cookies.lang && !req.query.locale){
        req.session.locale =  req.cookies.lang;
    }
    const file = "./i18n/" + req.session.locale + ".json";
    fs.readFile(file, (err, data) => {
        if (err) res.send("Error loading language file: " + file);
        else {
        global.i18n = JSON.parse(data);
        next();
        }
    });
}