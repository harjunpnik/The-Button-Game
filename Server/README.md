# Server - NodeJS/MongoDB REST API

Button game server is a REST API written in NodeJS with a MongoDB database.

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
  "_id": "468a2cffb4497ea6e79c5786100a71a4abd9ae4ddc9f3011266615825c1d87ae",
  "points": 77
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
  "_id": "468a2cffb4497ea6e79c5786100a71a4abd9ae4ddc9f3011266615825c1d87ae",
  "points": 20
}
```
