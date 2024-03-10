let game = [[undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined]];

let role = "x";
let enemy = "o";

let ncoups = 0;


function coupsPossibles(game) {
    let coups = [];
    for (let y = 0 ; y < 3 ; y++){
        for (let x = 0 ; x < 3 ; x++){
            if (game[y][x] === undefined) {
                coups.push([x, y]);
            }
        }
    }
    return coups;
 }


function getWinner(game) {
    for (let i = 0 ; i < 3 ; i++) {
        if (game[i][0] === game[i][1] && game[i][1] === game[i][2]) {
            return game[i][1];
        } else if (game[0][i] === game[1][i] && game[1][i] === game[2][i]) {
            return game[1][i];
        }
    }

    if ((game[0][0] === game[1][1] && game[1][1] === game[2][2]) || (game[0][2] === game[1][1] && game[1][1] === game[2][0])) {
        return game[1][1];
    } else {
        return undefined;
    }
}   


function evaluate(game) {
    let winner = getWinner(game)

    if (winner === role) {
        return 1;
     } else if (winner === enemy) {
        return -1;
     } else {
        return 0;
    }
}


function minimax(depth,start = undefined,a=-Infinity,b=Infinity) {
    ncoups ++;
    if (start === undefined) start = depth;

    if (depth === 0 || coupsPossibles(game).length === 0){
        return evaluate(game);
    }
    let joueur = ["o", "x"][depth%2];
    let meilleurCoup = undefined;
    let meilleurScore = 0;
    if (joueur === role) {
        meilleurScore = -Infinity;
        let x,y;
        for ( [x, y] of coupsPossibles(game)) {
            game[y][x] = joueur;

            let score = minimax(depth - 1,start,a,b)

            game[y][x] = undefined;

            if (score > meilleurScore) {
                meilleurScore = score;
                meilleurCoup = [x, y];

                if (meilleurScore > a) {
                    a = meilleurScore;
                    if (a >= b) {
                        break;
                    }
                }
            }
        }

    } else {
        let meilleurCoup = undefined;
        let meilleurScore = Infinity;
        let x,y;
        for ([x, y] of coupsPossibles(game)) {
            game[y][x] = joueur;

            let score = minimax(depth - 1,start,a,b)

            game[y][x] = undefined;

            if (score < meilleurScore) {
                meilleurScore = score;
                meilleurCoup = [x, y];
                if (meilleurScore < b) {
                    b = meilleurScore;
                    if (b <= a) {
                        break;
                    }
                }
            }
        }
    }
    if (depth === start) {
        return [meilleurCoup, meilleurScore];
    } else {
        return meilleurScore;
    }
}

start = Date.now()
console.log(minimax(9));
stop = Date.now()
console.log(`${(stop-start)/1000}`);
console.log(ncoups,"coups");
