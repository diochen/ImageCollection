var uuid = require('node-uuid');

module.exports = function(Account) {
	var app = require('../../server/server');

	Account.beforeRemote('create', function(ctx, unused, next) {
	  //console.log('before create');
	  //console.log(ctx.req.body);
	  // TODO(Dio), should check duplicate account ( email ?)
	  var album_id = uuid.v1();
		app.models.FileContainer.createContainer({name:album_id}, 
		  function(err, container){
		    if(err){
		      console.log(err);
		      next(new Error('Create user album fail.'));
		      return; 
		    }else{
		      ctx.req.body.nick_name = ctx.req.body.email;
		      ctx.req.body.album_id = album_id;
		      next();
		      return;
			}
		}); // createContainer
	});

	// Account.afterRemote('create', function(ctx, user, next) {
	//   console.log('@_@======	after create');
	//   console.log(user);
	//   next();
	// });

};
