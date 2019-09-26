const { ipcRenderer, shell } = require('electron')
const process = require('process'); 

let linkFechar = document.querySelector("#link-fechar")
let linkTwitter = document.querySelector('#link-twitter')
let versaoElectron = document.querySelector('#versao-electron')

window.onload = function(){
    versaoElectron.textContent = process.versions.electron //process.versions.chrome
}

linkFechar.addEventListener('click',() => {
    ipcRenderer.send('fechar-janela-sobre')
})

linkTwitter.addEventListener('click',() => {
    shell.openExternal("https://www.twitter.com/dquintanilhas")
})