

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
let roundID = "";
let p1Played = null;
let p2Played = null;

$("#newPlay").click(function () {
    let p1 = $("#p1Name").val()
    let p2 = $("#p1Name").val()
    if (p1 && p2) {
        selectionOutcomes.get().then(function (snap) {
            snap.forEach(function (doc) {
                rpslp[doc.id] = doc.data();
            })
        })
        playID = db.collection("plays").doc();
        playID.set({
            player1: p1,
            player2: p2,
            p1Choice: "",
            p2Choice: "",
            winner: ""

        })
        newRound();
    }
})

function newRound (){$("#newRound").click(function () {
    roundID = playID.collection("rounds").doc();
    roundID.set({
        p1: "",
        p2: "",
        p1Choice: "",
        p2Choice: "",
        winner: ""
    });
})
}
roundID.onSnapshot(function (doc) {
    if (roundID.p1Choice && roundID.p2Choice) {
        outcome = rpslp[p1Played][p2Played]
        if (outcome === 0) {
            winner = p1;
        }
        else if (outcome === 1) {
            winner = p2;
        }
        else {
            winner = "draw"
        }
    }
});

$("#p1Choice").click(function () {
    p1Played = $(this).val();
    roundID.update({ p1Choice: p1Played });
});

$("#p2Choice").click(function () {
    p2Played = $(this).val();
    roundID.update({ p2Choice: p2Played });
});
