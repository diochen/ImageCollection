module.exports = function(app) {
	var Account = app.models.Account;
	var Photo = app.models.Photo;

  return;
  
  Account.find({where: {email: 'dio@gmail.com'}, limit: 2}, 
    function(err, accounts) {
      if(!accounts || accounts.length <=0){
          Account.create([
            {nick_name: 'Dio', email: 'dio@gmail.com', password: '1234', album_id: 'album00'},
            {nick_name: 'Ruby', email: 'ruby@gmail.com', password: '1234', album_id: 'album01'}
          ], function(err, accounts) {
            if (err) throw err;

            console.log('Created accounts:', accounts);


            // create photo 1 for Dio
            accounts[0].photos.create({
              name: 'sample00.jpg for Dio',
              containername:'album00',
              filename: 'sample00.jpg',
              url: '/api/FileContainers/album00/download/sample00.jpg'
            }, function(err, photo) {
              if (err) throw err;
              console.log('Created photo:', photo);
            });

            //create photo 2 for Ruby
            accounts[1].photos.create({
              name: 'sample01.jpg for Ruby',
              containername:'album01',
              filename: 'sample01.jpg',
              url: '/api/FileContainers/album01/download/sample01.jpg'
            }, function(err, photo) {
              if (err) throw err;
              console.log('Created photo:', photo);
            });

          });// account create
      }
  });

};