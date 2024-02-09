let numerosSorteados = [];
let numeroLimite = 20;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Jogo no número secreto");
    exibirTextoNaTela("p", "Escolha um número entre 1 e 20");
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector("input").value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela("h1", "Acertou!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você acabou de descobrir o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela("p", "O número secreto é menor");
        } else {
            exibirTextoNaTela("P", "O número secreto é maior ");
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let qntdElementosNaLista = numerosSorteados.length;

    if (qntdElementosNaLista == numeroLimite) {
        numerosSorteados = [];
    }
    if (numerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        numerosSorteados.push(numeroEscolhido);
        console.log(numerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    let a = document.getElementById('reiniciar');
    a.setAttribute('disabled', true);
}