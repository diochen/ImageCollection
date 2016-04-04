module.exports = function(app) {
	var Account = app.models.Account;
	var Photo = app.models.Photo;

  Account.create([
    {nick_name: 'Dio', email: 'dio@gmail.com', password: '1234', album_id: 'album00'},
    {nick_name: 'Ruby', email: 'ruby@gmail.com', password: '1234', album_id: 'album01'}
  ], function(err, accounts) {
    if (err) throw err;

    console.log('Created accounts:', accounts);

    // create photo 1 for Dio
    accounts[0].photos.create({
      name: 'fack photo for Dio',
      containername:'fack_album01',
      filename: 'fack_photo01',
      url: 'http://cdn.shopify.com/s/files/1/0876/2858/t/3/assets/hero.jpg?15004776536411677168'
    }, function(err, photo) {
      if (err) throw err;
      console.log('Created photo:', photo);
    });

    //create photo 2 for Ruby
    accounts[1].photos.create({
      name: 'fack photo for Ruby',
      containername:'fack_album02',
      filename: 'fack_photo02',
      url: 'http://cdn10.snobessentials.com/sgmwp/wp-content/uploads/images2010/washing%20face.jpg'
    }, function(err, photo) {
      if (err) throw err;

      console.log('Created photo:', photo);

    });

    //create the admin role
    // Role.create({
    //   name: 'admin'
    // }, function(err, role) {
    //   if (err) throw err;

    //   console.log('Created role:', role);

    //   //make bob an admin
    //   role.principals.create({
    //     principalType: RoleMapping.USER,
    //     principalId: users[2].id
    //   }, function(err, principal) {
    //     if (err) throw err;

    //     console.log('Created principal:', principal);
    //   });
    // });
  });

};