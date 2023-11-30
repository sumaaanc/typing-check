 

const RANDOM_QUOTE_URL = "https://api.quotable.io/quotes/random"


let timer = document.querySelector('.timer')
let randomText = document.querySelector('.random-quotes')
let textArea = document.querySelector('#textarea')


//function will be called as the user types in the textarea
let count = 0
let isTimerStarted = false
let correct = false
function startTimer(){
        setInterval(()=> {
            timer.innerHTML = `${parseInt(count++)}`;
        } , 1000)
}
textArea.addEventListener('input', (e)=>{
    if(!isTimerStarted){
        startTimer()
        isTimerStarted = true
    }
    const quoteArray = randomText.querySelectorAll('span')
    const inputArray = textArea.value.split('')

    quoteArray.forEach((characterspan, index)=>{
        const inputValue = inputArray[index]
        if(inputValue == null){
            characterspan.classList.remove('correct')
            characterspan.classList.remove('incorrect')
            correct = false
        }
        else if(inputValue == characterspan.innerText){
            characterspan.classList.add('correct')
            characterspan.classList.remove('incorrect')
            correct = true
        }else{
            characterspan.classList.add('incorrect')
            characterspan.classList.remove('correct')
            correct = false
        }
    })

    if(correct){
        textArea.value = ''
        renderNewQuote()
        
    }
    
})


function getRandomQuote(){
    return fetch(RANDOM_QUOTE_URL).then((response) => response.json())
    .then((data) => data[0].content)
    .catch((error)=> error)
}

async function renderNewQuote(){
    let quote = await getRandomQuote()
    randomText.innerHTML = ''
    quote.split('').forEach(character => {
        const span = document.createElement('span')
        span.innerText = character
        randomText.appendChild(span)
    });
    textArea.innerHTML = null
}
renderNewQuote()












