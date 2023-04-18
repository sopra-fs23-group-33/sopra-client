
const WinRate = {

    calculate(user) {
        let winRate;

        if (!user) {
            winRate = 0;
        } else if (user.numberOfBetsLost >= 0 && user.numberOfBetsWon === 0) {
            winRate = 0;
        } else if (user.numberOfBetsLost === 0) {
            winRate = 100.00;
        } else {
            winRate = ((1 - (user.numberOfBetsLost / user.numberOfBetsWon)) * 100).toFixed(2);
        }
        return winRate;
    }

}

export default WinRate;


