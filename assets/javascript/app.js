

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
let rpslp = {} //short for Rock, Paper, Scissors, Lizard, sPock
let playID = "";
//let roundID = "";
let p1Played = null;
let p2Played = null;
let winner = "";

$("#newPlay").click(function () {
    let p1 = "Smash BuffBody" //$("#p1Name").val()
    let p2 = "Stump BoneMeal" //$("#p2Name").val()
    $("input[name='p1']").prop("checked",false);
    $("input[name='p2']").prop("checked",false);
    p1Played = null;
    p2Played = null;
    rpslp = {};
    winner = null;
    playID = db.collection("plays").doc("game")
    playID.onSnapshot(function(){});
    console.log(p1 + " vs " + p2);
    if (p1 && p2) {
        selectionOutcomes.get().then(function (snap) {
            snap.forEach(function (doc) {
                rpslp[doc.id] = doc.data();
            });
        })
            playID.set({
                player1: p1,
                player2: p2,
                p1Choice: "",
                p2Choice: "",
                pWinner: "",
                p1Wins: 0,
                p2Wins: 0,
            })
    }
});

$("input[name='p1']").click(function () {
    p1Played = $(this).val();
    playID.update({ p1Choice: p1Played }).then(function(){
        playID.onSnapshot(function(snap){
            getWinner = snap.data().pWinner;
            if(getWinner){
                $("#winner").html(getWinner);
            };
        });
        playID.get().then(function(doc){
            let curPlay = doc.data();
            let p2c = curPlay.p2Choice;
            if(p2c){
                outcome = rpslp[p1Played][p2c]
                if(outcome === 1){
                    winner = curPlay.player1;
                }
                else if(outcome === 0){
                    winner = curPlay.player2;
                }
                else {winner = "Draw";}
                playID.update({pWinner: winner})
            }
        })    
    });

});

$("input[name='p2']").click(function () {
    p2Played = $(this).val();
    playID.update({ p2Choice: p2Played }).then(function(){
        playID.onSnapshot(function(snap){
            getWinner = snap.data().pWinner;
            if(getWinner){
                $("#winner").html(getWinner)
            };
        });
        playID.get().then(function(doc){
            let curPlay = doc.data();
            let p1c = curPlay.p1Choice
            console.log(p2Played)
            if(p1c){
                let outcome = rpslp[p2Played][p1c]
                if(outcome === 1){
                    winner = curPlay.player2;
                }
                else if(outcome === 0){
                    winner = curPlay.player1;
                }
                else {winner = "Draw";}  
                playID.update({pWinner: winner})
            }
    
        })    
    });

});


// function analyzePlay(pid) {
//     pid.onSnapshot(function (doc) {
//         console.log("snapshot triggered")
        // outcome = rpslp[p1Played][p2Played];
        // console.log(outcome);
        // if (pid.p1Choice && pid.p2Choice) {
        //     if (outcome === 0) {
        //         pid.update({ winner: p1 });
        //     }
        //     else if (outcome === 1) {
        //         pid.update({ winner: p2 });
        //     }
        //     else {
        //         pid.update({ winner: "Draw" })
        //     }
        // }
        //pid.onSnapshot(function(){});
//     });
// }