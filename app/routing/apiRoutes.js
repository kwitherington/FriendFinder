// LOAD DATA
var friends = require("../data/friends");

// ROUTING

module.exports = function(app) {
  // API GET Requests for viewing all Friend data in the browser 

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  // API POST Requests

  app.post("/api/friends", function(req, res) {
    // this is where matching logic will go to return
      friends.push(req.body);
      res.json(true);
  });

  //API path to clear the Friends data during testing

  app.post("/api/clear", function(req, res) {
    // Empty out the arrays of data
    friends.length = [];
    res.json({ ok: true });
  });
};
