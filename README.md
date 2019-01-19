# Friend Finder - Node and Express Servers

### Overview

FriendFinder is a compatibility-based "FriendFinder" application -- basically a dating app. This full-stack site takes in results from users' surveys, then compares their answers with those from other users. The app then displays the name and picture of the user with the best overall match.

Express handles the routing, and the site and server are deployed via Heroku.


### Break Down

1. The user is presented with 10 personality questios. Each answer is on a scale of 1 to 5 based on how much the user agrees or disagrees with a question, or how much they sway from one answer to the other.

2. The `server.js` file requires `express` and `path`.

3. The `htmlRoutes.js` file includes two routes:

   * A GET Route to `/survey` which displays the survey page.
   * A default, catch-all route that leads to `home.html` which displays the home page.

4. The `apiRoutes.js` file contains two routes:

   * A GET route with the url `/api/friends`. This is used to display a JSON of all possible friends.
   * A POST route `/api/friends`. This is used to handle incoming survey results. This route is also used to handle the compatibility logic.

5. Application data is stored inside of `app/data/friends.js` as an array of objects. Each of these objects follows the format below.

```json
{
  "name":"Ahmed",
  "photo":"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
  "scores":[
      5,
      1,
      4,
      4,
      5,
      1,
      2,
      5,
      4,
      1
    ]
}
```

6. The following explains the compatibility logic:

   * The user's survey results are converted into a simple array of numbers (ex: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`).
   * With that done, the difference between the current user's scores is compaired against those from other users, question by question. The differences are then summed to calculate the `scoreDifference`.
     * Example:
       * User 1: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`
       * User 2: `[3, 2, 6, 4, 5, 1, 2, 5, 4, 1]`
       * Total Difference: **2 + 1 + 2 =** **_5_**
   * The closest match is the user with the least amount of difference.

   * The modal then displays both the name and picture of the closest match.
