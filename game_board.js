document.addEventListener('DOMContentLoaded', function () {
    let body = document.querySelector("body")
    let squareContainer = document.createElement('div')

    let testText = document.createElement('div')
    let restartBtn = document.createElement('button')
    restartBtn.innerText = "Restart"
    squareContainer.className = 'squareContainer'
    squareContainer.style.display = "inline-block"

    let classArr = {}
    let boxArr = {}
    
    let winTeam = null
    let idx = 0;
    // creating a 3 by 3 grid
    for (i = 0; i < 3; i++) {
        let createBr = document.createElement('br');
        if (i > 0) {
            squareContainer.append(createBr)
        }
        // css, positions, and classes; data for positions of the blocks
        for (j = 0; j < 3; j++) {
            let createBlock = document.createElement('div');
            createBlock.className = "block-" + (j + 1) + "-of-" + (i + 1)
            createBlock.style.display = "inline-block"
            createBlock.style.margin = "10px"
            createBlock.style.width = "100px"
            createBlock.style.height = "100px"
            createBlock.style.border = "10px solid black"
            squareContainer.append(createBlock)
            body.append(squareContainer)
            // game logic
            createBlock.addEventListener('click', function () {
                testText.innerText += "Placed"

                let XObject = document.createElement('img')
                let OObject = document.createElement('img')

                let objects = [XObject, OObject];

                XObject.src = "Tic-Tac-Toe-X.png"
                OObject.src = "Tic-Tac-Toe-O.png"
                if (!createBlock.querySelector('img') && winTeam == null) {
                    // if the number is even it is 'X', starting from 0 which is even so start with 'X'
                    if (idx % 2 === 0) {
                        testText.innerText += " X"
                        createBlock.className += " XObject"
                        createBlock.append(XObject)
                        XObjectPlaced = true
                    }
                    // if odd do 'O'
                    if (idx % 2 === 1) {
                        testText.innerText += " O"
                        createBlock.className += " OObject"
                        createBlock.append(OObject)
                        XObjectPlaced = false
                    }
                    idx++
                }
                testText.innerText += " at " + createBlock.classList[0] + "\n"
                for (i = 0; i < objects.length; i++) {
                    objects[i].style.width = "75px"
                    objects[i].style.height = "75px"
                    objects[i].style.display = "block";
                    objects[i].style.position = "absolute"
                    objects[i].style.transform = "translate(15%, 15%)";
                    objects[i].style.margin = "auto"
                }
                
                for (i = 0; i < squareContainer.querySelectorAll('div').length; i++) {
                    classArr[i] = squareContainer.querySelectorAll('div')[i].classList[1]
                    boxArr[i] = squareContainer.querySelectorAll('div')[i]
                }
                // if you win you cannot make more moves
                if (winTeam == null) {
                    // if diangnal, then that team wins
                    if (classArr[0] != null && classArr[4] != null && classArr[8] != null) {
                        if ((classArr[0] == classArr[4]) && (classArr[0] == classArr[8])) {
                            winTeam = classArr[0]
                            testText.style.color = "Green"
                            boxArr[0].style.backgroundColor = "green"
                            boxArr[4].style.backgroundColor = "green"
                            boxArr[8].style.backgroundColor = "green"
                            testText.innerText += "Team " + winTeam + " wins!"
                        }
                    }
                    if (classArr[2] != null && classArr[4] != null && classArr[6] != null) {
                        if ((classArr[2] == classArr[4]) && (classArr[2] == classArr[6])) {
                            winTeam = classArr[2]
                            testText.style.color = "Green"
                            boxArr[2].style.backgroundColor = "green"
                            boxArr[4].style.backgroundColor = "green"
                            boxArr[6].style.backgroundColor = "green"
                            testText.innerText += "Team " + winTeam + " wins!"
                        }
                    }
                    // right and left wins
                    let idx = 0
                    for (strightWin = 0; strightWin < 7; strightWin += 3){
                        if (classArr[strightWin] != null && classArr[strightWin + 1] != null && 
                        classArr[strightWin + 2] != null) {
                            if (classArr[strightWin] == classArr[strightWin + 1] &&
                            classArr[strightWin] == classArr[strightWin + 2]) {
                                winTeam = classArr[strightWin]
                                testText.style.color = "Green"
                                for (i = 0; i < 3; i++) {
                                    boxArr[strightWin + i].style.backgroundColor = "green"
                                }
                                testText.innerText += "Team " + winTeam + " wins!"
                            }
                        }
                    }
                    // up and down wins
                    idx = 0
                    for (downWin = 0; downWin < 3; downWin++) {
                        if (classArr[downWin] != null && classArr[downWin + 3] != null &&
                        classArr[downWin + 6] != null) {
                            if (classArr[downWin] == classArr[downWin + 3] &&
                            classArr[downWin] == classArr[downWin + 6]) {
                                winTeam = classArr[downWin]
                                testText.style.color = "Green"
                                for (i = 0; i < 7; i+= 3) {
                                    boxArr[downWin + i].style.backgroundColor = "green"
                                }
                                testText.innerText += "Team " + winTeam + " wins!"
                            }
                        }
                        idx += 3
                    }

                    if (classArr[0] != null && classArr[1] != null && classArr[2] != null &&
                    classArr[3] != null && classArr[4] != null && classArr[5] != null &&
                    classArr[6] != null && classArr[7] != null && classArr[8] != null &&
                    winTeam == null) {
                            winTeam = "Cat-Scan"
                            testText.style.color = "Red"
                            for (i = 0; i < 9; i++) {
                                boxArr[0 + i].style.backgroundColor = "Red"
                            }
                            testText.innerText += winTeam
                    }
                    body.append(testText)
                }
            })
            // creating the restart button
        }
    }
    body.append(restartBtn)
    restartBtn.addEventListener('click', function () {
        for (i = 0; i < squareContainer.querySelectorAll('div').length; i++) {
            let imgElement = squareContainer.querySelectorAll('div')[i].querySelector('img')
            if(imgElement) {
                squareContainer.querySelectorAll('div')[i].style.backgroundColor = "white"
                squareContainer.querySelectorAll('div')[i].removeChild(imgElement)
                squareContainer.querySelectorAll('div')[i].classList.remove(squareContainer.querySelectorAll('div')[i].classList[1])
            }
        }
        winTeam = null
        testText.innerText = winTeam
        body.append(testText)
    })
}) 