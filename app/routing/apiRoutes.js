// LOAD DATA
var friends = require("../data/friends");

// ROUTING

module.exports = function (app) {
    // API GET Requests for viewing all Friend data in the browser 

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    // API POST Requests

    app.post("/api/friends", function (req, res) {

        // this is where matching logic will go to return best match
        var yourScore = req.body.scores // this will be an array
        var friendDifferenceArray = []; // used to store the difference variables for each friend

        // Returns the sum of the differences for a given friend from the friends array, based on friend index
        for (j = 0; j < friends.length; j++) {
            var scoreDifference = 0;
            // Fills the friendDifferenceArray with absolute differences
            for (i = 0; i < friends[j].scores.length; i++) {
                scoreDifference += Math.abs(friends[j].scores[i] - yourScore[i]);
            }
            friendDifferenceArray.push(scoreDifference);
        }

        // Finds the index of the smallest difference in friendDifferenceArray
        function indexOfSmallest(arr) {
            return arr.indexOf(Math.min.apply(Math, arr));
        }
        var bestMatchIndex = indexOfSmallest(friendDifferenceArray);

        // Add new entry to the Friends data in friends.js
        friends.push(req.body);

        // return the best match to the client
        res.json(friends[bestMatchIndex]);
    });

    //API path to clear the Friends data during testing

    app.post("/api/clear", function (req, res) {
        // Empty out the arrays of data
        friends.length = [];
        res.json({ ok: true });
    });
};
