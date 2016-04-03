module.exports = function(Photo) {

  Photo.upload = function(id, amount, cb) {
  	console.log("@_@ == amount " + amount);
  	cb(null, true);

  //   Project.findById(id, function(err, project) {
  //     if (err) return cb(err);

  //     project.balance = project.balance >= amount ?
  //         project.balance - amount : 0;
  //     project.save();

  //     cb(null, true);
  //   });
  };

  Photo.remoteMethod('upload', {
    accepts: [
      {arg: 'id', type: 'number'},
      {arg: 'amount', type: 'number'},
    ],
    returns: {arg: 'success', type: 'boolean'},
    http: {path:'/upload', verb: 'post'}
  });

};
