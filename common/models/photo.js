var loopback = require('loopback');

module.exports = function(Photo) {

  Photo.upload = function(ctx, options, cb) {
  	// get current user
  	var lbCtx = loopback.getCurrentContext();
    var currentUser = lbCtx && lbCtx.get('currentUser');
    console.log('User' + currentUser.nick_name + '('+ currentUser.email +') upload file');
    if(!currentUser || !currentUser.album_id)
    	return cb(err);

 	if(!options) options = {};
    ctx.req.params.container = currentUser.album_id; // TODO(Dio), important : indicate which container 

	Photo.app.models.FileContainer.upload(ctx.req,ctx.result,options,function (err,fileObj) {
		if(err) cb(err);
		else{
			cb(null,fileObj);
		        // Here myFile is the field name associated with upload. You should change it to something else if you
		        // var fileInfo = fileObj.files.myFile[0];
		        // File.create({
		        //   name: fileInfo.name,
		        //   type: fileInfo.type,
		        //   container: fileInfo.container,
		        //   userId: ctx.req.accessToken.userId,
		        //   url: CONTAINERS_URL+fileInfo.container+'/download/'+fileInfo.name // This is a hack for creating links
		        // },function (err,obj) {
		        //   if(err){
		        //     console.log('Error in uploading' + err);
		        //     cb(err);
		        //   }
		        //   else{
		        //     cb(null,obj);
		        //   }
		        // });
		}
	});
  };

  Photo.remoteMethod('upload', {
  	description: 'Uploads a file',
    accepts: [
    	{ arg: 'ctx', type: 'object', http: { source:'context' } },
    	{ arg: 'options', type: 'object', http:{ source: 'query'} }
    ],
    returns: {
      arg: 'fileObject', type: 'object', root: true
    },
    //returns: {arg: 'success', type: 'boolean'},
    http: {path:'/upload', verb: 'post'}
  });

};
