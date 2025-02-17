const states = {
    score:{
        player: 0,
        computer: 0,
        win: document.getElementById('win'),
        lose: document.getElementById('lose'),
        boxScore: document.getElementById('score')
    },
    cardsLeft:{
        avatar: document.getElementById('cardSelect'),
        name: document.getElementById('cardName'),
        type: document.getElementById('cardType')
    },
    cardsRight:{
        computerCard: document.getElementById('computerCards'),
        playerCard: document.getElementById('playerCards'),
        playerVersus: document.querySelector('#playerCardVersus'),
        computerVersus: document.querySelector('#computerCardVersus')
    },
    actions:{
        reset:document.getElementById('nextDuel')
    }
}

const imgPath = "src/assets/icons"
const cards = [
    {
        id: 0,
        name: 'Blue-eyed white dragon',
        type: 'Paper',
        img: `${imgPath}/dragon.png`,
        win: [1],
        lose:[2]
    },
    {
        id: 1,
        name: 'Black magician',
        type: 'Rock',
        img: `${imgPath}/magician.png`,
        win: [2],
        lose:[0]
    },
    {
        id: 2,
        name: 'Exodia',
        type: 'Scissors',
        img: `${imgPath}/exodia.png`,
        win: [0],
        lose:[1]
    },
]

async function loadingCards(quantCards,player) {
    for(let i=0; i<quantCards; i++){
        const randomId = await getIdCard()
        const cardImage = await createImage(randomId,player)
        
        player.appendChild(cardImage)
    }

}

function getIdCard(){
    const randomId = Math.floor(Math.random()*cards.length)
    
    return randomId
}

async function createImage(id,player){
    const criateImage = document.createElement('img')
    criateImage.setAttribute('src',"./src/assets/icons/card-back.png")
    criateImage.setAttribute('height','100px')
    criateImage.setAttribute('data-Id',id)
    criateImage.classList.add('card')

    return criateImage
}

async function drawSelectedCard(index){
    states.cardsLeft.avatar.src= `${cards[index].img}`
    states.cardsLeft.name.innerHTML=cards[index].name
    states.cardsLeft.type.innerHTML="Attribute:"+ '<br>'+ '<br>' + cards[index].type
    
}

states.cardsRight.playerCard.addEventListener('click',(e)=>{
    const clickedElement = e.target
    const idCardClicked = clickedElement.getAttribute('data-id')

    if(clickedElement.tagName=== 'IMG'){
        removeallcards()

        states.cardsRight.playerVersus.style.display ='block'
        states.cardsRight.computerVersus.style.display ='block'

        let computerCardIdImg = getIdCard()
        
        states.cardsRight.computerVersus.src = cards[computerCardIdImg].img

        states.cardsRight.playerVersus.src = cards[idCardClicked].img

        let winner= checkWinner(idCardClicked,computerCardIdImg)

        updateScore(winner)

        drawButton(winner)
    } 
})

function removeallcards(){
    const cardsRemove = document.querySelectorAll('.card')
    cardsRemove.forEach(item=>item.remove())
    
}

function checkWinner(player,computer){
    if(cards[player].type===cards[computer].type) return 'Empate'
    else if(cards[player].type=== 'Paper' && cards[computer].type=== 'Rock' || cards[player].type=== 'Rock' && cards[computer].type=== 'Scissors' || cards[player].type=== 'Scissors' && cards[computer].type=== 'Paper'){

        adcSound('win')
        states.score.player ++
        return 'Player Win'
    
    }else{
        adcSound('lose')
        states.score.computer ++
        return 'Computer Win'
    }
}

function updateScore(winner){
    if(winner=== 'Player Win'){      
        states.score.win.innerHTML = states.score.player
    }
    if(winner=== 'Computer Win'){
        states.score.lose.innerHTML = states.score.computer
    }
}

function adcSound(status){
    let sound = new Audio(`./src/assets/audios/${status}.wav`)

    sound.play()
}

function drawButton(text){
    states.actions.reset.innerText = text
    states.actions.reset.style.visibility= 'visible'
}

states.actions.reset.addEventListener('click', nextRound)

function nextRound(){
    states.cardsLeft.avatar.src = ''
    states.cardsLeft.name.innerHTML='Selecione'
    states.cardsLeft.type.innerHTML='uma carta'
    states.cardsRight.playerVersus.src= ' '
    states.cardsRight.computerVersus.src=' '
    states.actions.reset.style.visibility= 'hidden'

    if(states.score.player === 5 ){
        document.querySelector('dialog .vencedor').innerHTML= "Player Win"
        document.querySelector('dialog').showModal()
    }

    if(states.score.computer === 5){
         document.querySelector('dialog .vencedor').innerHTML= "Computer Win"
        document.querySelector('dialog').showModal()
    }

    document.querySelector('dialog button').addEventListener('click',()=>{
        document.querySelector('dialog').close()
        window.location.reload()
    })

    init()
    
}

states.cardsRight.playerCard.addEventListener("mouseover",(e)=>{
    const elementSelected = e.target
    
    if(elementSelected.tagName==='IMG'){
        const dataId = elementSelected.getAttribute('data-id')
    
        drawSelectedCard(dataId)
    }
    
})

function audioBackg(){
    const audioBackg = document.querySelector('#audioBackg')
    audioBackg.play()
}

function init(){                          
    audioBackg()
    loadingCards(5,states.cardsRight.playerCard)
    loadingCards(5,states.cardsRight.computerCard)
}

init()