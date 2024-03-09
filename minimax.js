game = [[null,null,null],[null,null,null],[null,null,null]]

role = "x"
enemy = "o"

 

ncoups = 0


function coupsPossibles(game) {
    coups = []
    for (let y = 0 ; y < 3 ; y++){
        for (let x = 0 ; x < 3 ; x++){
            if (game[y][x] == null) {
                coups.push([x,y])
            }
        }
    }
    return coups
 }
function getWinner(game) {
    for (let i = 0 ; i < 3 ; i++) {
        if (game[i][0] == game[i][1] == game[i][2]) {
            return game[i][1];
        } else if (game[0][i] == game[1][i] == game[2][i]) {
            return game[1][i];
        } else if (game[0][0] == game[1][1] == game[2][2] || game[0][2] == game[1][1] == game[2][0]) {
            return game[1][1];
        } else {
            return null
        }
    }
}
    
function evaluate(game) {
    winner = getWinner(game)

    if (winner == role) {
        return 1;
     } else if (winner == enemy) {
        return -1;
     } else {
        return 0;
    }
}
function minimax(depth,start = null) {
    ncoups ++;
    if (start == null) start = depth;

    if (depth == 0 || coupsPossibles(game).length == 0) {
        return evaluate(game);
    }
    joueur = ["o","x"][depth%2];

    if (joueur == role) {
        meilleurCoup = null
        meilleurScore = -Infinity;

        for ([x,y] of coupsPossibles(game)) {
            game[y][x] = joueur;

            score = minimax(depth - 1,start)

            game[y][x] = null;

            if (score > meilleurScore) {
                meilleurScore = score;
                meilleurCoup = (x,y);
            }
        }

    } else {
        meilleurCoup = null
        meilleurScore = Infinity

        for ([x,y] of coupsPossibles(game)) {
            game[y][x] = joueur;

            score = minimax(depth - 1,start)

            game[y][x] = null;

            if (score < meilleurScore) {
                meilleurScore = score
                meilleurCoup = (x,y)
            }
        }
    }
    if (depth == start) {
        return [meilleurCoup,meilleurScore]
    } else {
        return meilleurScore
    }
}

console.log(minimax(9))
console.log(ncoups,"coups")
