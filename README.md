# http-and-mqtt-based-macao-game
Macao Game made in javascript using http and mqtt protocols.
## Tech Stack
### Backend
- async-mqtt
- express
### Frontend
- react
- async-mqtt
- axios
- redux
## Features
### Login Page
![2021-03-24](https://user-images.githubusercontent.com/72603663/112275952-71ed1f00-8c80-11eb-89e0-40454af2bed1.png)
### Select Room Page
You can create a new room, or join already existing room provided that you know the room id.
![2021-03-24 (1)](https://user-images.githubusercontent.com/72603663/112276058-90531a80-8c80-11eb-9671-f3978eda1bee.png)
### Waiting Lobby
Room with chat, list of players and number of spectators. List of players is refreshing everytime a player joins the room.
![2021-03-24 (6)](https://user-images.githubusercontent.com/72603663/112276308-e0ca7800-8c80-11eb-8414-b8b19e0a77cb.png)
### Game Room
- Rules are just like in a standard macao game.
- In the left bottom corner is the chat.
- In the right bottom corner the panel with information about current effect is displayed.
- Above the panel on the right there is a button, where you can ask other players if you can revert your last move. To revert every player in the game has to agree.
![2021-03-24 (7)](https://user-images.githubusercontent.com/72603663/112276660-4880c300-8c81-11eb-91a8-58609338d86f.png)
If your card of choice has some effect requiring you to select some value a panel pops out.
![2021-03-24 (9)](https://user-images.githubusercontent.com/72603663/112276905-7f56d900-8c81-11eb-9211-5c3b47554088.png)
When the game is finished, the information about the winner pops out and all the players go back to the Waiting lobby with the possibility to start another game.
![2021-03-24 (10)](https://user-images.githubusercontent.com/72603663/112277133-baf1a300-8c81-11eb-9d7a-c8be5ae2dec9.png)

### Game Room from spectator perspective
![2021-03-24 (8)](https://user-images.githubusercontent.com/72603663/112276728-59313900-8c81-11eb-8814-2dbf1422427e.png)



