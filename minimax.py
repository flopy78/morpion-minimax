import math
import time

game = [[None,None,None],
        [None,None,None],
        [None,None,None]]

role = "x"
enemy = "o"

 
coups = 0


def coupsPossibles(game):
    coups = []
    for y in range(3):
        for x in range(3):
            if game[y][x] is None:
                coups.append((x,y))#yield (x,y)
    return coups

def getWinner(game):
    for i in range(3):
        if (game[i][0] == game[i][1] == game[i][2]):
            return game[i][1]
        elif (game[0][i] == game[1][i] == game[2][i]):
            return game[1][i]
        elif (game[0][0] == game[1][1] == game[2][2] or game[0][2] == game[1][1] == game[2][0]):
            return game[1][1]
        else:
            return None
    
def evaluate(game):
    winner = getWinner(game)

    if winner == role:
        return 1
    elif winner == enemy:
        return -1
    else:
        return 0
    
def minimax(depth,start = None):#,a = -math.inf,b = math.inf):
    global coups
    coups += 1
    if start is None: start = depth

    if depth == 0 or not coupsPossibles(game):
        return evaluate(game)

    joueur = ("o","x")[depth%2]

    if joueur == role:
        meilleurCoup = None
        meilleurScore = -math.inf

        for x,y in coupsPossibles(game):
            game[y][x] = joueur

            score = minimax(depth - 1,start)#,a,b)

            game[y][x] = None

            if score > meilleurScore:
                meilleurScore = score
                meilleurCoup = (x,y)
                '''if score > a:
                    a = score
                    if a >= b:
                        break'''

    else:
        meilleurCoup = None
        meilleurScore = math.inf

        for x,y in coupsPossibles(game):
            game[y][x] = joueur

            score = minimax(depth - 1,start)#,a,b)

            game[y][x] = None

            if score < meilleurScore:
                meilleurScore = score
                meilleurCoup = (x,y)
                '''if score < b:
                    b = score
                    if b <= a:
                        break'''
    if depth == start:
        return (meilleurCoup,meilleurScore)
    else:
        return meilleurScore
    
start = time.time()
print(minimax(9))
print(time.time()-start)
print(coups)
