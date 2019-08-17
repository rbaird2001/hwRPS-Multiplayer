const selectionOutcomes = { rock : {
    rock: -1,
    paper : 0,
    scissors: 1,
    lizard: 1,
    spock: 0,
},
paper : {
    rock: 1,
    paper: -1,
    scissors: 0,
    lizard: 0,
    spock: 1
},
scissors : {
    rock: 0,
    paper : 1,
    scissors: -1,
    lizard: 1,
    spock: 0
},
lizard : {
    rock: 0,
    paper : 1,
    scissors: 0,
    lizard: -1,
    spock: 1
},
spock : {
    rock: 1,
    paper : 0,
    scissors: 1,
    lizard: 0,
    spock: -1
}};

for(i=0; i<Object.keys(selectionOutcomes).length; i++){
  let document = (Object.keys(selectionOutcomes)[i]);
  let prop = selectionOutcomes[document];
  db.collection("selectionOutcomes").doc(document).set(prop)
};