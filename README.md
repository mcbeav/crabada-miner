# Crabada Bot

Auto-mining bot for Crabada that automatically starts & closes games every 4 hours originally written by SavageCabbagee (https://github.com/SavageCabbagee), and updated by mcbeav (https://github.com/mcbeav) adding a few new features & support for multiple teams.

## Running 
Git clone, install dependencies using npm, setup required information in .env file, run the bot

```
git clone https://github.com/mcbeav/crabada-miner.git
npm install
node bot.js
```

### Steps
1. Get the proper checksummed address of your wallet that has your crabada teams by visiting https://snowtrace.io/. Paste your wallet address in the search bar and hit return. Copy the wallet address that is displayed on the resulting page. Assign the value to ADDRESS in the .env file.

2. Get your private wallet key (NOT THE PNEUMONIC PHRASE) and assign it as the value of KEY in the .env file.

3. Get your telegram user id by sending a message to @userinfobot. Assign the value to TELEGRAM in the .env file.

4. Set the value of USERNAME in the .env file to your telegram username.

5. Create a new telegram bot by sending a message to the telegram username @BotFather. The /newbot command will create a new bot. The API key that is provided needs to be assigned to TELEGRAM in the .env file.

6. Each team has an ID that you'll need to assign in the .env file. To find the ID of each team, you must have started a mining session at least once with the team. You'll go to https://snowtrace.io/ and input your wallet address with the crabada team ID you want to find to view your wallet transactions. In the list of transactions look under the Method column for Start Game. Click the Txn Hash of this Start Game transaction to view the details. Click the Click to see More link to view the details of the transaction. The team ID is found in the Input Data box and is labelled as MethodID. There are 2 strings you'll need to combine together to create the team id. The first string is 10 characters and looks like 0xa5aa5a55. The second string is 64 characters and is mostly 0's and looks like 0000000000000000000000000000000000000000000000000000000000005555. You'll combine these 2 strings to get the team id and it should look something like 0xa5aa5a550000000000000000000000000000000000000000000000000000000000005555.

7. To use more than 1 team with the auto-miner you'll set the TEAMS value equal to a comma separated list of team id's. Do NOT add any spaces.

```
TEAMS="0xa5aa5a550000000000000000000000000000000000000000000000000000000000005555,0xa5aa5a550000000000000000000000000000000000000000000000000000000000005556,0xa5aa5a550000000000000000000000000000000000000000000000000000000000005557"
```

8. Run the bot with node bot.js in the terminal

9. To start mining, send the /start message to your bot using telegram

10. The bot can be paused by issuing the /pause message using telegram


## Issues