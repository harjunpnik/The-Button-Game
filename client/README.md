# The-Button-Game

The button game is a game where every player increase the same counter. The players start with 20 points and each time they press the button they lose 1 point. The points of a player can't be negative. Every 10 clicks a user gets points as a prize. A player can win up to one prize with a single click. If the same click would win many prizes, the player gets the biggest possible prize from the list below.

The prizes are as following:
* 5 points every 10 clicks
* 40 points every 100 clicks
* 250 points every 500 clicks

If a player has 0 points he can reset his points back to 20.

## Notes

In the project directory, you can run:

### `npm start`

To run the React frontend locally.

## Solutions

The score can't be negative when clicking the button. If the users score is less than 1 point, then the user will get a popup saying that they do not have enough points and give them the possibility to restart from 20 points.

The point and click calculations are done on server side. The only parameter the user sends to the server is his userId. 

The userId is saved to local storage of the browser. If a user has a stored id then the site will fetch that users data from the database, otherwise it will create a new user to the database.

### Example images

![Site web version](https://github.com/harjunpnik/The-Button-Game/tree/master/design/web.JPG)

![Site mobile version](https://github.com/harjunpnik/The-Button-Game/tree/master/design/mobile.JPG)