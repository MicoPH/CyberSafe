function probabilityRandomChoice(items,prob){
    let i;
    let possibleChoice = [];
    for( i = 0; i < prob.length; i++){
        possibleChoice[i] = prob[i] + (possibleChoice[i - 1] || 0);
    }

    const maxpossibleChoice = possibleChoice[possibleChoice.length - 1];
    const randNum = Math.random() * maxpossibleChoice;

    for(i = 0; i < possibleChoice.length; i++){
        if (possibleChoice[i] >= randNum) {
            return items[i];
        }
    }
}