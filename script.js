const html = document.querySelector('html') // Variável para poder alterar meu valor de 'data-contexto' localizado no começo do código HTML
const btn_foco = document.querySelector('.app__card-button--foco') // Variável para acessar o botão que coloca a página com o data-contexto = "foco"
const btn_curto = document.querySelector('.app__card-button--curto') // Variável para acessar o botão que coloca a página com o data-contexto = "descanso-curto"
const btn_longo = document.querySelector('.app__card-button--longo') // Variável para acessar o botão que coloca a página com o data-contexto = "descanso-longo"
const img = document.querySelector('.app__image') // Variável para acessar e alterar a imagem que aparece na página
const title = document.querySelector('.app__title') // Variável para poder acessar e alterar o texto que aparece no começo da página
const btns = document.querySelectorAll('.app__card-button') // Variável para poder referenciar os botões de 'Foco', 'Descanso curto' e 'Descanso Longo'

const startPause = document.querySelector('#start-pause') // Variável para referenciar o botão de Começar / Pausar
const img_startPause = document.querySelector('.app__card-primary-butto-icon') // Varíavel para referenciar a IMAGEM de Play / Pause dentro do botão do timer
const btn_startPause = document.querySelector('#start-pause span') // Variável para referenciar o texto DENTRO do botão

const showTimer = document.querySelector('#timer') // Variável para trabalharmos com o timer sendo impresso na tela.

const musicaFoco = document.querySelector('#alternar-musica') // Variável para podermos controlar a música através do checkbox
const music = new Audio('/sounds/luna-rise-part-one.mp3') // Referênciando a música que toca durante o modo foco

// ! Referenciando os audios que são tocados com o timer
const audioPlay = new Audio('/sounds/play.wav') // Áudio tocado ao ativar o timer
const audioPause = new Audio('/sounds/pause.mp3') // Áudio tocado ao pausar o timer
const audioFim = new Audio('/sounds/beep.mp3') // Áudio tocado quando o timer é finalizado

music.loop = true; // Colocando a música em loop
musicaFoco.addEventListener('change', () => {
    if(music.paused){
        music.play() // Se a música estiver pausada, ela inicia.
    }
    else{
        music.pause() // Se a música estiver tocando, ela pausa.
    }
})

btn_foco.addEventListener('click', () => { // Função para ativar o modo foco e adicionar a classe 'active' ao botão
    timer = 1500
    alterarContexto('foco')
    btn_foco.classList.add('active')
})

btn_curto.addEventListener('click', () => { // Função para ativar o modo descanso-curto e adicionar a classe 'active' ao botão
    timer = 300
    alterarContexto('descanso-curto')
    btn_curto.classList.add('active')
})

btn_longo.addEventListener('click', () => { // Função para ativar o modo descanso-longo e adicionar a classe 'active' ao botão
    timer = 900
    alterarContexto('descanso-longo')
    btn_longo.classList.add('active')
})

function alterarContexto(contexto){
    printTimer()
    btns.forEach(function(contexto) {
        contexto.classList.remove('active') // Removendo a classe 'active' dos botões.
    })
    html.setAttribute('data-contexto', contexto) // Alterando o 'data-contexto' usando o parâmetro 'contexto' que é chamado em cada botão.
    img.setAttribute('src', `/images/${contexto}.png`) // Alterando a imagem da página
   
    // ! Alterar o texto da página de acordo com o modo atual usando o innerHTML
    switch (contexto) {
        case 'foco':
            title.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`

            break;
        case 'descanso-curto':
            title.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`

            break;
        case 'descanso-longo':
            title.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        default:
            break;
    }
}

// ! Configurando o timer

let timer = 1500
let intervalId = null

const countdown = () => {
    if (timer <= 0){
        audioFim.play()
        alert('Descanso finalizado')
        zerar()
        return
    }
    printTimer()
    timer -= 1
}

startPause.addEventListener('click', iniciarOuPausar) //

function iniciarOuPausar() {
    if(intervalId){
        btn_startPause.textContent = 'Começar'
        img_startPause.setAttribute('src', '/images/play_arrow.png')
        audioPause.play()
        zerar()
        return;
    }
    btn_startPause.textContent = 'Pausar'
    img_startPause.setAttribute('src', '/images/pause.png')
    audioPlay.play()
    intervalId = setInterval(countdown, 1000)
}

function zerar(){ // Zerar o intervalo
    clearInterval(intervalId)
    intervalId = null
}

function printTimer(){ 
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    showTimer.innerHTML = formattedTime;
}

printTimer()