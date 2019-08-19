

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
let selectionOutcomes = db.collection("selectionOutcomes");
let playID = db.collection("plays").doc("game");
let chatter = db.collection("plays").doc("chat");
let rpslp = {} //short for Rock, Paper, Scissors, Lizard, sPock
let playerNum = ""
let otherPlayer = ""
let opponentName = ""
let yourPlay = null;
let winner = "";
let firstGame = 1

playID.set({reset : true});

$("#newPlay").click(function () {
    let pName = $("#playerName").val();
    if(!pName){
        $("#playerName").addClass("border border-danger").attr("placeholder","Name is required.");
        return false;
    }
    else{
        $("#playerName").removeClass("border border-danger").attr("placeholder","");
    }
    yourPlay = null;
    p2Played = null;
    rpslp = {};
    winner = null;
    playID.onSnapshot(function(){});
    playID.get().then(function(doc){
        let p1Set = doc.data().p1
        if(!p1Set){
            playID.set({
                p1: pName,
                p2: "",
                p1Choice: "",
                p2Choice: "",
                pWinner: "",
            }).then(function(){
                playerNum = "p1"
                otherPlayer = "p2"
                $("#playerLabel").text("You are Player 1");
                $("input[name='p1']").prop("checked",false);
                $("#rpslpChoices").css("display", "block");
                $("#playerName").val("Waiting for Player 2");
                $("#newPlay").css("display","none");
            });
        }
        else{
            playID.update({
                p2: pName,
            }).then(function(){
                selectionOutcomes.get().then(function (snap) {
                    snap.forEach(function (doc) {
                        rpslp[doc.id] = doc.data();
                    });
                })
                playID.get().then(function(doc){
                    opponentName = doc.data().p1;
                    $("#playerLabel").text("You are Player 2");
                    $("#playerName").val("").attr("placeholder","You are playing " + opponentName)
                    $("input[name='p1']").prop("checked",false);
                    $("#rpslpChoices").css("display", "block");
                    $("#newPlay").css("display","none");
                })
                playerNum = "p2";
                otherPlayer = "p1";




            });
        }
    })
});

$("#replay").click(function(){
    clearTimeout(replayTimer);
    playID.onSnapshot(function(){});
    playID.update({
        p1Choice : "",
        p2Choice : "",
        pWinner : ""
    }).then(function(){
        $("input[name='p1']").prop("checked",false);
    })
})

$("input[name='p1']").click(function () {
    yourPlay = $(this).val();
    let choiceProperty = playerNum + "Choice"
    playID.update({ [choiceProperty]: yourPlay }).then(function(){
        playID.onSnapshot(function(snap){
            getWinner = snap.data().pWinner;
            if(getWinner){
                $("#playerLabel").html("Winner: " + getWinner);
            }
        });
        playID.get().then(function(doc){
            let curPlay = doc.data();
            let otherChoice = "";
            if (playerNum === "p1"){
                otherChoice = curPlay.p2Choice;
            }
            else{
                otherChoice = curPlay.p1Choice;
            }
            if(otherChoice){
                outcome = rpslp[yourPlay][otherChoice];
                if(outcome === 1){
                    winner = curPlay[playerNum];
                }
                else if(outcome === 0){
                    winner = curPlay[otherPlayer];
                }
                else {winner = "Draw";}
                playID.update({pWinner: winner})
                $("#replay").css("display","inline-block")
                replayTimer = setTimeout(function(){
                    playID.set({reset : true});
                    $("#replay").css("display","none");
                    $("#playerName").val("").attr("placeholder","Enter your name");
                }
                ,20000);
            }
        });    
    });

});

chatter.onSnapshot(function(snap){
    let msg = snap.data().message;
    let newMessage = $("<p>").text(msg);
    $("#chatBox").prepend(newMessage);
});

$("#sendMsg").click(function(){
    let newMessage = $("#newMsg").val();
    chatter.update({message : newMessage});
});

