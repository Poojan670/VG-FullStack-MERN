const home = (req, res) => {
    // res.render('index', {
    //     title: "My Express App",
    //     message: "Hello World!"
    // });
    res.json({
        "msg": "Hello World"
    })
}

exports.home = home