var uuid = require('node-uuid');

module.exports = function(app) {
  return;
  /*
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
    }, 'user', function(err, token) {
      console.log(token);
      if (err){
        console.log(err);
        return res.render('index', {
          email: email,
          password: password,
          loginFailed: true
        });
      }

      token = token.toJSON();

      res.render('photos', {
        nickname: token.user.nick_name || token.user.email,
        //username: "Ghost",
        accessToken: token.id
      });
    });
  });

  router.post('/signup', function(req, res) {
    var nick_name = req.body.name;
    var password = req.body.password;
    var email = req.body.email;
    var album_id = uuid.v1();

    if(!nick_name || !password || !email){
        console.log("Post fail");
        console.log(req.body);
        return res.render('index', {
            username: nick_name,
            email: email,
            createUser: false,
            loginFailed: false
        }); 
    }
    
    app.models.FileContainer.createContainer({name:album_id}, 
      function(err, container){
        if(err){
          console.log(err);
          return res.render('index', {
            username: nick_name,
            email: email,
            createUser: false,
            loginFailed: false
          }); 
        }
        app.models.Account.create({
          nick_name: nick_name,
          email: email, 
          password: password,
          album_id: album_id }, function(err, user) {
            console.log(user);
            if (err){
              console.log(err);
              return res.render('index', {
                username: nick_name,
                email: email,
                createUser: false,
                loginFailed: false
              });  
            }else{
              return res.render('index', {
                username: nick_name,
                email: email,
                createUser: true,
                loginFailed: false
              }); 
            }
        });
    }); // call back function

  });

  router.get('/logout', function(req, res) {
    var AccessToken = app.models.AccessToken;
    var token = new AccessToken({id: req.query['access_token']});
    token.destroy();

    res.redirect('/');
  });

  app.use(router);
  */
};