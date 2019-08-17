game will have notice of two people playing

no play analysis function occurs until the both players play.
    a 10 sec. timeout will trigger to ensure play if only one plays during this time, the other wins by default.

player one enters email addr. 
player two enters email addr.
    email addresses are converted into usable ids
    play begins
    play id added to each player's record
    next round begins

player1 selects
player2 selects
    play analysis: winner determined

    winner and loser marked for the round
    player's record/playid win or loss incremented
    results displayed
    play again prompted
    next round.

Play analysis:
Each selection is a Firebase db container with all other options contained as properties within. each property hold numeric value: 0,1,-1 (loss, win, tie).
player one selection matched to container. player two selection matched to container properties.
Resulting value indicates outcome.

    


rock{
    rock: -1,
    paper : 0,
    scissors: 1,
    lizard: 1,
    spock: 0,
}
paper{
    rock: 1,
    paper: -1,
    scissors: 0,
    lizard: 0,
    spock: 1
}
scissors{
    rock: 0,
    paper : 1,
    scissors: -1,
    lizard: 1,
    spock: 0
}
lizard{
    rock: 0,
    paper : 1,
    scissors: 0,
    lizard: -1,
    spock: 1
}
spock{
    rock: 1,
    paper : 0,
    scissors: 1,
    lizard: 0,
    spock: -1
}

selectionOutcomes.get().then(function(snapshot){
	console.log(snapshot.docs.map(doc => doc.data()));
})


/person~at~domain~d~com{
    name:
    /plays
        playid1: wins_losses
        playid2: wins_losses
        playid3: wins_losses
}

DB2
/playID{
    p1:,
    p2:,
    /chat: {

    }
    /roundid: {
        winner:,
        loser:,
    },
}



<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/6.4.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#config-web-app -->
