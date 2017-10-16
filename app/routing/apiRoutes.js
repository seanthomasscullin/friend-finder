var friends = require('../data/friends.js');

module.exports = function(app) {
	
	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

	app.post('/api/friends', function(req, res) {

		var topMatch = {
			name: '',
			picture: '',
			friendDiff: 999,
		};

		var userData = req.body;
		var userScores = userData.scores;
		var diff = 0;

		for(var i=0; i < friends.length; i++) {
			diff = 0;

			for(var j = 0; j < friends[i].scores[j]; j++) {
				diff += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

				if(diff <= topMatch.friendDiff) {
					topMatch.name = friends[i].name;
					topMatch.photo = friends[i].photo;
					topMatch.friendDiff = diff;
				}
			}
		}

		friends.push(userData);

		res.json(bestMatch);
	});
}