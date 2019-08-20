# hwRPS-Multiplayer
Rock Paper Scissors Lizard Spock

## Description
This project is in its most basic form. It allows multiplayers, but only two can play at a time. Attempts to launch a third or fourth page into this will have negative consequences. This will be addressed in the future.

This project demonstrates the use of cloud-based database systems, namely Firebase. The use of realtime updates supplies multi-player interactivity. However, it also shows limitation in a cloud-system for storage only without cloud-server functions for data processing. It is most likely the case that this project will advance to a Node.js implementation in the future. 

This project also proves the value of JS objects in making selections with varying outcomes. Using objects to resolve the winner for each player's selections removed the need for _if_ statements to accomplish this. The reason for extending game to a five selection option, was to test if one could increase the game selections without exponentionally increasing the coding needed.

## Getting Started
Make a fork of this project to your own repository and clone it to your workspace. Create your own Firebase project and use the Firestore database. The access to Firebase in this game will be restricted by the author in the future.

The Firestore database uses two collections the main collection is  _plays_, and contains two documents: _chat_ and _game_. You'll want to set these up in your Firestore database.

The second collection, _selectionOutcomes_ holds documents for each of the selections - Rock,Paper,Scissors,Lizard, Spock (rpslp) - and the results of each selection against the others are found in its properties. A copy of these as a JS object can be found in the file _selectionLoader.js_.

## Prerequisites
Desktop, notebook, or mobile device with browser. All code tested against Chrome only, connections to Firebase via Firefox, Safari, or Edge have not been tested. Project utilizes JQuery, Bootstrap 4, and Firebase 6.3.5. Project built with mobile device sizes in mind.

## Built With
* Microsoft VS Code.
* Firebase/Firestore 6.3.5
* JQuery
* Bootstrap 4

## Contributing

Project is a Solo Project. 

## Authors
* Robert Baird

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.

Project requires additional Firebase licensing. Project built with privately held license and is not intended for wide release. Attempts to use this project beyond demonstration purposes with the included Firebase access will result in access revocation.
