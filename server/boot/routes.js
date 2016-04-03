module.exports = function(app) {
  var router = app.loopback.Router();

  router.get('/', function(req, res) {
    res.render('index', {
      loginFailed: false
    });
  });

  router.get('/photos', function(req, res) {
    res.render('photos');
  });

  router.post('/photos', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    app.models.Account.login({
      email: email,
      password: password
    }, 'account', function(err, token) {
      if (err)
        return res.render('index', {
          email: email,
          password: password,
          loginFailed: true
        });

      token = token.toJSON();

      console.log("@_@ === : ");
      console.log(token);

      res.render('photos', {
        //nickname: token.user.nickname,
        username: "Ghost",
        accessToken: token.id
      });
    });
  });

  router.get('/logout', function(req, res) {
    var AccessToken = app.models.AccessToken;
    var token = new AccessToken({id: req.query['access_token']});
    token.destroy();

    res.redirect('/');
  });

  app.use(router);
};