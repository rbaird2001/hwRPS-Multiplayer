
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC1nlsPzD47URLFbroPfG5aOyZREqH_-4k",
    authDomain: "ropaslip.firebaseapp.com",
    databaseURL: "https://ropaslip.firebaseio.com",
    projectId: "ropaslip",
    storageBucket: "",
    messagingSenderId: "334383988417",
    appId: "1:334383988417:web:ec700d273103dcec"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

//collection that holds the various play selections and outcomes
let selectionOutcomes = db.collection("selectionOutcomes");

//collection and doc for the game details
let playID = db.collection("plays").doc("game");

//collection and doc for chats
let chatter = db.collection("plays").doc("chat");

//object to store the selectionOutcomes locally
//rpslp is short for Rock, Paper, Scissors, Lizard, sPock
let playerNum = "";
let player = "";
let otherPlayer = "";
let opponentName = "";
let yourPlay = "";
let winner = "";

//ensure the collection docs are reset on start
playID.get().then(function (doc) {
    if (doc.data().gameStatus === "waiting") {
        setupFirestoreListener()
        return true;
    }
    playID.set({ reset: true });
    chatter.set({
        message: "",
        chatName: "",

    });
    setupFirestoreListener()
});

//play is setup and initiated by this button
$("#newPlay").click(function () {
    player = $("#playerName").val();
    if (!player) {
        $("#playerName").addClass("border border-danger").attr("placeholder", "Name is required.");
        return false;
    }
    else {
        $("#playerName").removeClass("border border-danger").attr("placeholder", "");
    }
    yourPlay = null;
    winner = null;

    // selectionOutcomes.get().then(function (snap) {
    //     snap.forEach(function (doc) {
    //         rpslp[doc.id] = doc.data();
    //     });
    // });

    //determine if player will be player 1 or player 2. Based on whoever adds name first.
    playID.get().then(function (doc) {
        let p1Set = doc.data().p1
        if (!p1Set) {
            playerNum = "p1"
            otherPlayer = "p2"
            playID.set({
                p1: player,
                p2: "",
                p1Choice: "",
                p2Choice: "",
                pWinner: "",
                gameStatus: "waiting",
                replayRequester: ""
            });
        }
        else {
            playerNum = "p2";
            otherPlayer = "p1";
            playID.update({
                p2: player,
                gameStatus: "playing"
            });
        }
    });
});

//Analyze play after selection made. 
$("input[name='p1']").click(function () {
    yourPlay = $(this).val();
    $("input[name='p1']").attr("disabled", true);
    rpslk = db.collection(yourPlay);
    let choiceProperty = playerNum + "Choice"
    playID.update({
        [choiceProperty]: yourPlay,
        gameStatus: playerNum + "Submitted"
    }).then(function () {
        playID.get().then(function (doc) {
            let curPlay = doc.data();
            let otherChoice = "";
            if (playerNum === "p1") {
                otherChoice = curPlay.p2Choice;
            }
            else {
                otherChoice = curPlay.p1Choice;
            }
            if (otherChoice) {
                rpslk.doc(otherChoice).get().then(function (doc) {
                    let outcome = doc.data().defeat;
                    let outcomeMethod = doc.data().method;
                    let winnerChoice = ""
                    let loserChoice = ""
                    if (outcome === 1) {
                        winner = curPlay[playerNum];
                        winnerChoice = yourPlay;
                        loserChoice = otherChoice;
                    }
                    else if (outcome === 0) {
                        winner = curPlay[otherPlayer];
                        winnerChoice = otherChoice;
                        loserChoice = yourPlay
                    }
                    else {
                        winner = "Draw";
                        winnerChoice = yourPlay;
                        loserChoice = otherChoice;
                    }
                    playID.update({
                        pWinner: winner,
                        pWinMethod: winnerChoice + " " + outcomeMethod + " " + loserChoice,
                        gameStatus: "finished"
                    })
                })

            }
        });
    });
});

//This is for playing again without resetting the entire interface.
$("#replay").click(function () {
    playID.get().then(function (doc) {
        let replayStatus = doc.data().gameStatus
        if (replayStatus === 'finished') {
            playID.update({
                gameStatus: "requestReplay",
                replayRequester: player,
                p1Choice: "",
                p2Choice: "",
                pWinMethod: "",
                pWinner: ""
            })
        }
        else if (replayStatus === "requestReplay") {
            playID.update({ gameStatus: "playing" });
        }
    });
});

chatter.onSnapshot(function (snap) {
    let chName = snap.data().chatName
    if (chName) {
        let msg = snap.data().message;
        let newMessage = $("<p>").text(chName + ": " + msg);
        $("#chatBox").prepend(newMessage);
    }
    return false;
});

$("#sendMsg").click(function () {
    if(!player){
        $("#newMsg").val("").attr("placeholder","Chat requires the game to start");
    }
    else{

        let newMessage = $("#newMsg").val();
        chatter.update({
            message: newMessage,
            chatName: player
        });
    }
});

//what is returned to players is largely determined by player submissions and by game status.
//this listener examines data changes against status. It returns to player appropriate responses.
function setupFirestoreListener() {
    playID.onSnapshot(function (snap) {
        let gStatus = snap.data().gameStatus;
        if (gStatus === "waiting") {
            if (playerNum === "p1") {
                $("#playerLabel").text("You are Player " + player);
                $("#playerName").val("Waiting for opponent to join");
                $("#newPlay").css("display", "none");
                return true;
            }
        }
        if (gStatus === "playing") {
            if (playerNum === "p1") {
                opponentName = snap.data().p2
                if (!opponentName) {
                    return false;
                }
                $("#playerName").val("").attr("placeholder", "You are playing " + opponentName)
            }
            else {
                opponentName = snap.data().p1;
                if (!opponentName) {
                    return false;
                }
                $("#newPlay").css("display", "none");
                $("#playerLabel").html("You are player " + player)
                $("#playerName").val("").attr("placeholder", "You are playing " + opponentName);
            }
            $("#replay").css("display", "none");
            $("input[name='p1']").attr("disabled", false).prop("checked", false);
            $("#rpslpChoices").css("display", "block");
        }
        if (gStatus === "finished") {
            $("input[name='p1']").attr("disabled", true);
            winMethod = snap.data().pWinMethod;
            getWinner = snap.data().pWinner;
            if (getWinner) {
                $("#playerLabel").html("Winner: " + getWinner);
                $("#playerName").val("").attr("placeholder", winMethod);
                $("#replay").css("display", "inline-block");
                return true;
            }
            else {
                return false;
            }
        }
        if (gStatus === "requestReplay") {
            rRequester = snap.data().replayRequester;
            if (rRequester === player) {
                $("#playerLabel").html("You are player " + player);
                $("#playerName").attr("placeholder", "Waiting for " + opponentName).val("");
                $("#replay").css("display", "none");
            }

            else {
                $("#playerLabel").html("You are player " + player);
                $("#playerName").attr("placeholder", opponentName + " has requested a replay.");
                return true;
            }
        }
        return false;
    })
}
