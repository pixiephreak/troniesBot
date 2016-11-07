var Twit = require('twit')

var fs = require('fs'),
    path = require('path'),
    Twit = require('twit'),
    config = require(path.join(__dirname, 'config.js'));

var T = new Twit(config);

var tronie = '';

var tronies = [
	'tronie_1.png',
	'tronie_2.png',
	'tronie_3.png',
	'tronie_4.png',
	'tronie_5.png',
	'tronie_6.png',
	'tronie_7.png',
	'tronie_8.png'
];

function pick_random_tronie(){
  // console.log(tronies[Math.floor(Math.random() * tronies.length)])
  tronie = tronies[Math.floor(Math.random() * tronies.length)];
  return tronie;
}

function removeTronie(){
  	index = (tronies.indexOf(tronie));
  	if (index > -1){
  		tronies = tronies.splice(index, 1);
  		return tronies
  		}
  	}

function pick_random_title(){
	var titles = [
	'Title: A Young Woman Reading   Artist: Imitator of Johannes Vermeer (ca. 1925–27)',
	'Title: Study of a Young Woman  Artist:Johannes Vermeer (Dutch, Delft 1632–1675 Delft)',
	'Title: Tronie of a young woman  Artist: Rembrant',
	'Title: Malle Babbe   Artist: Frans Hals'
	]
	title = titles [Math.floor(Math.random() * titles.length)];
	return title;
}


function upload_random_image(){
  console.log('Opening an image...');
  var image_path = path.join(__dirname, '/png/' + pick_random_tronie()),
      b64content = fs.readFileSync(image_path, { encoding: 'base64' });
  removeTronie();
  console.log(tronies);
  console.log(`Uploading ${image_path}`);

  T.post('media/upload', { media_data: b64content }, function (err, data, response) {
    if (err){
      console.log('ERROR');
      console.log(err);
    }
    else{
      console.log('Uploaded an image!');

      T.post('statuses/update', {
      	status: pick_random_title(),
        media_ids: new Array(data.media_id_string)
      },
        function(err, data, response) {
          if (err){
            console.log('Error!');
            console.log(err);
          }
          else{
            console.log('Posted an image!');
          }
        }
      );
    }
  });
}

upload_random_image();

// setInterval(upload_random_image, 60,000);

