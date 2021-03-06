# Production

This is the production build that has been deployed to heroku. [https://the-new-button-game.herokuapp.com/](https://the-new-button-game.herokuapp.com/)

# Server/api documentation

Button game server is a REST API written in NodeJS with a MongoDB database.

## Notes

The server has automated creation of the click collection. If the server when started cannot find a click database with an entry for the clicks, then it will create a new entry to "Click" collection.


## Installation

To install all the node packages, use:

```
npm install
```

## Running locally 



```
npm run watch
```

## API Documentation 

### CLICK

#### PATCH /api/click/{id}

Allows you to send a request to server to update the status of clicks and users points. Id property in request is required for request to work.  

Request returns data of the: 
* Rewarded amount of points
* Users current points
* Amount of clicks to next reward

Below is an example of an response that has successfully passed.

```JSON
{
  "reward": 0,
  "points": 77,
  "nextPrize": 7
}
```

### USER

#### GET /api/user/{id}

Allows you to fetch the points of a user. Returns the id also.

Below is an example of an response that has successfully passed.

```JSON
{
  "points": 77,
  "user": "468a2cffb4497ea6e79c5786100a71a4abd9ae4ddc9f3011266615825c1d87ae"
}
```

#### POST /api/user/

Allows you to create a new user with base 20 points, Returns user id and points.

Below is an example of an response that has successfully passed.

```JSON
{
  "points": 20,
  "user": "468a2cffb4497ea6e79c5786100a71a4abd9ae4ddc9f3011266615825c1d87ae"
}
```

#### PATCH /api/user/reset/{id}

Allows you to reset users points to 20, if user has 0 points. Returns user id and points. 

```JSON
{
  "points": 20,
  "user": "468a2cffb4497ea6e79c5786100a71a4abd9ae4ddc9f3011266615825c1d87ae"
}
```
