const jsonfile = require('jsonfile-promised')
const fs = require('fs'); 

module.exports = {
    salvaDados(curso,tempoEstudado){
        let arquivoDoCurso = __dirname + '/data/' + curso + '.json'; 
        if(fs.existsSync(arquivoDoCurso)){

        }else{
            this.criaArquivoDeCurso(arquivoDoCurso,{})
                .then(() => {

                }) 
        }
    }, 
    criaArquivoDeCurso(nomeArquivo, conteudoArquivo){
        return jsonfile.writeFile(nomeArquivo,conteudoArquivo)
                .then(() => {
                    console.log('Arquivo Criado'); 
                }).catch((err) => {
                    console.log(err); 
                }); 
    }
}