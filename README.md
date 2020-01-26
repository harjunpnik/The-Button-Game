# The-Button-Game

Here you can find the game hosted on Heroku:

[https://the-new-button-game.herokuapp.com/](https://the-new-button-game.herokuapp.com/)

The button game is a game where every player increase the same counter. The players start with 20 points and each time they press the button they lose 1 point. The points of a player can't be negative. Every 10 clicks a user gets points as a prize. A player can win up to one prize with a single click. If the same click would win many prizes, the player gets the biggest possible prize from the list below.

The prizes are as following:
* 5 points every 10 clicks
* 40 points every 100 clicks
* 250 points every 500 clicks

If a player has 0 points he can reset his points back to 20.

## Notes

I've primarily made this application to be a Web application with some extent to mobile scaling. The backend is done with NodeJS with express framework and mongoDB Database. This project could have used and Json server database but i've chosen to use mongoDB if the application would be scaled to support user login, leaderboards and other features.


## Installation

You can either clone or download the github repository. 

To run the code locally you need to go to the "Production" folder and run in terminal
```
npm run
```

## Deploying to Heroku with mongoDB atlas


To Deploy the code to Heroku you will need at least a free tier account to mongoDB atlas and Heroku account.

To create a mongoDB connection uri you need to 
1. Create a cluster
2. Choose location of cluster
3. Go to Database Access page and create a New user with "Read and Write" permissions to the database.
4. Create a new security rule and white list all IP with "Allow Access from anywhere" or set "White list Entry" to 0.0.0.0/0
5.Go to main page of your cluster and choose connect
6. Choose "Connect Your Application" and copy the connection string only.
7. Replace the password with the new users password and save this string for Herokus env variables.

To Deploy the production folders files 
1. Login to Heroku
2. Create new app
3. Choose app name and region
4. You can either deploy the production folder to your github and connect via github or download herroku CLI. For this instructions I've chosen to use Heroku Cli
6. Download Heroku cli
7. Start bash and write
```
heroku login
```
8. login with your credentials and write
```
cd production
git init
heroku git:remote -a <YourAppNameGoesHere>
```
9. Then add all the files with git and push
```# The-Button-Game

Here you can find the game hosted on Heroku:

[https://the-new-button-game.herokuapp.com/](https://the-new-button-game.herokuapp.com/)

The button game is a game where every player increase the same counter. The players start with 20 points and each time they press the button they lose 1 point. The points of a player can't be negative. Every 10 clicks a user gets points as a prize. A player can win up to one prize with a single click. If the same click would win many prizes, the player gets the biggest possible prize from the list below.

The prizes are as following:
* 5 points every 10 clicks
* 40 points every 100 clicks
* 250 points every 500 clicks

If a player has 0 points he can reset his points back to 20.

## Notes

I've primarily made this application to be a Web application with some extent to mobile scaling. The backend is done with NodeJS with express framework and mongoDB Database. This project could have used and Json server database but i've chosen to use mongoDB if the application would be scaled to support user login, leaderboards and other features.


## Installation

You can either clone or download the github repository. 

To run the code locally you need to go to the "Production" folder and run in terminal
```
npm run
```

## Deploying to Heroku with mongoDB atlas


To Deploy the code to Heroku you will need at least a free tier account to mongoDB atlas and Heroku account.

To create a mongoDB connection uri you need to 
1. Create a cluster
2. Choose location of cluster
3. Go to Database Access page and create a New user with "Read and Write" permissions to the database.
4. Create a new security rule and white list all IP with "Allow Access from anywhere" or set "White list Entry" to 0.0.0.0/0
5.Go to main page of your cluster and choose connect
6. Choose "Connect Your Application" and copy the connection string only.
7. Replace the password with the new users password and save this string for Herokus env variables.

To Deploy the production folders files 
1. Login to Heroku
2. Create new app
3. Choose app name and region
4. You can either deploy the production folder to your github and connect via github or download herroku CLI. For this instructions I've chosen to use Heroku Cli
6. Download Heroku cli
7. Start bash and write
```
heroku login
```
8. login with your credentials and write
```
cd production
git init
heroku git:remote -a <YourAppNameGoesHere>
```
9. Then add all the files with git and push
```
git add.
git commit -am "comment"
git push heroku master
```

10. In your app dashboard, go to settings, choose reveal Config Vars and enter for

KEY = MONGODB_URI
VALUE = <YOUR MONGODB URI YOU MADE IN MONGODB GOES HERE>

Now your application should be running on heroku.
git add.
git commit -am "comment"
git push heroku master
```

10. In your app dashboard, go to settings, choose reveal Config Vars and enter for

KEY = MONGODB_URI
VALUE = <YOUR MONGODB URI YOU MADE IN MONGODB GOES HERE>

Now your application should be running on heroku.