import { BibliaService } from './biblia.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'biblia',
  templateUrl: './biblia.component.html',
  styleUrls: ['./biblia.component.scss']
})


export class BibliaComponent implements OnInit {
  
  book:JSON = this.bibliaService.getBook();
  texto:string;
  textoSize:number = this.bibliaService.getTextoSize();
  fontSizes:Array<any> = this.bibliaService.getFontSizes();
  endereco:string;
  mostraMenu:boolean = false;
  mostraAtalho:boolean = false;
  capitulo = this.bibliaService.getCapitulo();
  versiculo:number = this.bibliaService.getVersiculo();
  versao = this.bibliaService.getVersao();
  livro = this.bibliaService.getLivro();
  maxVersiculo = this.bibliaService.getMaxVersiculo();
  maxCapitulo = this.bibliaService.getMaxCapitulo();

  constructor(private bibliaService: BibliaService) { }
 
  ngOnInit() { 
    this.charge();
  }
  atualizaMaximos(){

  }
  
  getfont(){
    console.log(this.texto.length);
    if(this.fontSizes[this.texto.length] == undefined){      
      //Pega o valor salvo das lengths
      let keys = Object.keys(this.fontSizes);
      //let valor = 80; //length atual que também é o nome da key
      //Ordena as length salvos do menor para o maior
      keys.sort(function(a, b){return +a-(+b)});
      //verifica se o length é o menor de todos
      if(this.texto.length < +keys[0]){
        console.log("menor de todos");
        //caso seja o menor pega exatamente o tamanho do menor
        this.textoSize = this.fontSizes[+keys[0]];        
      }else
      //verifica se é o maior de todos
      if(this.texto.length > +keys[+keys.length-1]){
        console.log("maior de todos de todos");
        //caso seja o maior pega exatamente o tamanho do maior
        this.textoSize = this.fontSizes[+keys[+keys.length-1]];        
      }else{
        //descobre qual é o sucessor e o antercessor
        for(let i = 0; i < keys.length; i++){
          if (+keys[i] > this.texto.length){ // ou usar somente ">"
          var antercessor = i == 0 ? keys[i] : keys[i - 1];
          var sucessor = keys[i];
          break;  
          } 
        }
        //cálculo tamanho da fonte
        let cem = (+sucessor) - (+antercessor);
        let texto = (+this.texto.length) - (+antercessor);
        let porcentagem_length = (texto*100)/cem;
        let cem_font = (+this.fontSizes[+antercessor]) - (+this.fontSizes[+sucessor]);
        let valor_para_subtrair = (cem_font*porcentagem_length)/100;
        console.log("Antercessor:");
        console.log(+this.fontSizes[+antercessor]);
        console.log("Sucessor:");
        console.log(+this.fontSizes[+sucessor]);
        console.log("calculo:");
        console.log(valor_para_subtrair);
        console.log("Subtraido:");
        console.log(+this.fontSizes[+antercessor]+valor_para_subtrair);
        this.textoSize = +this.fontSizes[+antercessor]-(+valor_para_subtrair);
        if(+sucessor - this.texto.length < this.texto.length - +antercessor){
          console.log("mais perto do sucessor:"+sucessor+" o antercessor é: "+antercessor);
        }else{
          console.log("mais perto do antercessor:"+antercessor+" o sucessor é: "+sucessor);
        }        
      }
    }else{
      //caso já exista pega do mesmo tamanho
      console.log("já existe");
      this.textoSize = this.fontSizes[this.texto.length];
    }   
    return this.textoSize; 
  }
  showMenu(){
    this.mostraMenu = true;    
  } 
   
  charge(){
    this.mostraMenu = false;
    this.mostraAtalho = false;

    this.livro = this.bibliaService.getLivro();
    this.capitulo = this.bibliaService.getCapitulo();
    this.versiculo = this.bibliaService.getVersiculo();
    this.bibliaService.setMaxCapitulo(this.book[+this.livro].chapters.length);
    this.maxCapitulo = this.bibliaService.getMaxCapitulo();

    let versiculos = this.book[+this.livro].chapters[+this.capitulo][(+this.capitulo+1)];
    let maxVersiculo = 0;
    for (let [key, value] of Object.entries(versiculos)) {
      maxVersiculo++;
    }
    this.bibliaService.setMaxVersiculo(maxVersiculo);
    this.maxVersiculo = this.bibliaService.getMaxVersiculo();    
    
    let nomeLivro = this.book[+this.livro].book;   
    if(nomeLivro == "Lamentações de Jeremias"){
      nomeLivro = "Lamentações";
    }
    this.texto = this.book[+this.livro].chapters[+this.capitulo][(+this.capitulo+1)][+this.versiculo];
    this.endereco = nomeLivro+" "+(+this.capitulo+1)+":"+this.versiculo;    
  }

  retira_acentos(palavra) {    
    let com_acento = "áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ";
    let sem_acento = "aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC";
    let nova = "";
  
    for(let i=0;i<palavra.length;i++) {
        if (com_acento.search(palavra.substr(i,1))>=0)
            nova += sem_acento.substr(com_acento.search(palavra.substr(i,1)),1);
        else 
            nova += palavra.substr(i,1);
    }
    return nova;
  }
    
  carregarAtalho(string){
    if(!string){
      this.mostraAtalho = false;
      return false;
    }
    let livro = string.split(" ")[0] || 0;
    livro = this.retira_acentos(livro);
    livro = livro.toLowerCase();
  
    let capitulo = string.split(" ")[1] || 1;
    capitulo = +capitulo-1 || 0;	
    let versiculo = string.split(" ")[2] || 1;
    
    if(livro == 'gn'  || livro == 'genesis'){             livro = 0;}
    if(livro == 'ex'  || livro == 'exodo'){               livro = 1;}
    if(livro == 'lv'  || livro == 'levitico'){            livro = 2;}
    if(livro == 'nm'  || livro == 'numeros'){             livro = 3;}
    if(livro == 'dt'  || livro == 'deuteronomio'){        livro = 4;}
    if(livro == 'js'  || livro == 'josue'){               livro = 5;}
    if(livro == 'jz'  || livro == 'juizes'){              livro = 6;}
    if(livro == 'rt'  || livro == 'rute'){                livro = 7;}
    if(livro == '1sm' || livro == '1samuel'){             livro = 8;}
    if(livro == '2sm' || livro == '2samuel'){             livro = 9;}
    if(livro == '1rs' || livro == '1reis'){               livro = 10;}
    if(livro == '2rs' || livro == '2reis'){               livro = 11;}
    if(livro == '1cr' || livro == '1cronicas'){           livro = 12;}
    if(livro == '2cr' || livro == '2cronicas'){           livro = 13;}
    if(livro == 'ed'  || livro == 'esdras'){              livro = 14;}
    if(livro == 'ne'  || livro == 'neemias'){             livro = 15;}
    if(livro == 'et'  || livro == 'ester'){               livro = 16;}
    if(livro == 'jo'  ){                                  livro = 17;}
    if(livro == 'sl'  || livro == 'salmos'){              livro = 18;}
    if(livro == 'pv'  || livro == 'proverbios'){          livro = 19;}
    if(livro == 'ec'  || livro == 'eclesiastes'){         livro = 20;}
    if(livro == 'ct'  || livro == 'canticos'){            livro = 21;}
    if(livro == 'is'  || livro == 'isaias'){              livro = 22;}
    if(livro == 'jr'  || livro == 'jeremias'){            livro = 23;}
    if(livro == 'lm'  || livro == 'lamentacoes'){         livro = 24;}
    if(livro == 'ez'  || livro == 'ezequiel'){            livro = 25;}
    if(livro == 'dn'  || livro == 'daniel'){              livro = 26;}
    if(livro == 'os'  || livro == 'oseias'){              livro = 27;}
    if(livro == 'jl'  || livro == 'joel'){                livro = 28;}
    if(livro == 'am'  || livro == 'amos'){                livro = 29;}
    if(livro == 'ob'  || livro == 'obadias'){             livro = 30;}
    if(livro == 'jn'  || livro == 'jonas'){               livro = 31;}
    if(livro == 'mq'  || livro == 'miqueias'){            livro = 32;}
    if(livro == 'na'  || livro == 'naum'){                livro = 33;}
    if(livro == 'hc'  || livro == 'habacuque'){           livro = 34;}
    if(livro == 'sf'  || livro == 'sofonias'){            livro = 35;}
    if(livro == 'ag'  || livro == 'ageu'){                livro = 36;}
    if(livro == 'zc'  || livro == 'zacarias'){            livro = 37;}
    if(livro == 'ml'  || livro == 'malaquias'){           livro = 38;}
    if(livro == 'mt'  || livro == 'mateus'){              livro = 39;}
    if(livro == 'mc'  || livro == 'marcos'){              livro = 40;}
    if(livro == 'lc'  || livro == 'lucas'){               livro = 41;}
    if(livro == 'joa' || livro == 'joao'){                livro = 42;}
    if(livro == 'at'  || livro == 'atos'){                livro = 43;}
    if(livro == 'rm'  || livro == 'romanos'){             livro = 44;}
    if(livro == '1co' || livro == '1corintios'){          livro = 45;}
    if(livro == '2co' || livro == '2corintios'){          livro = 46;}
    if(livro == 'gl'  || livro == 'galatas'){             livro = 47;}
    if(livro == 'ef'  || livro == 'efesios'){             livro = 48;}
    if(livro == 'fp'  || livro == 'filipenses'){          livro = 49;}
    if(livro == 'cl'  || livro == 'colossenses'){         livro = 50;}
    if(livro == '1ts' || livro == '1tessalonicenses'){    livro = 51;}
    if(livro == '2ts' || livro == '2tessalonicenses'){    livro = 52;}
    if(livro == '1tm' || livro == '1timoteo'){            livro = 53;}
    if(livro == '2tm' || livro == '2timoteo'){            livro = 54;}
    if(livro == 'tt'  || livro == 'tito'){                livro = 55;}
    if(livro == 'fm'  || livro == 'filemom'){             livro = 56;}
    if(livro == 'hb'  || livro == 'hebreus'){             livro = 57;}
    if(livro == 'tg'  || livro == 'tiago'){               livro = 58;}
    if(livro == '1pe' || livro == '1pedro'){              livro = 59;}
    if(livro == '2pe' || livro == '2pedro'){              livro = 60;}
    if(livro == '1jo' || livro == '1joao'){               livro = 61;}
    if(livro == '2jo' || livro == '2joao'){               livro = 62;}
    if(livro == '3jo' || livro == '3joao'){               livro = 63;}
    if(livro == 'jd'  || livro == 'judas'){               livro = 64;}
    if(livro == 'ap'  || livro == 'apocalipse'){          livro = 65;}
    
    if((!isNaN(livro)) && (livro<'66') && (livro>='0')){
      
      //Verifica se existe o capitulo solicitado
      let maxCapitulo = this.book[livro].chapters.length;
      if(capitulo > maxCapitulo){
        console.log("Capítulo não encontrado");
        return false;
      }
      //Verifica se existe o versículo solicitado
      let capitulo_mais_um = +capitulo == 0 ? 1 : +capitulo+1;
      
      let versiculos = this.book[livro].chapters[+capitulo][+capitulo_mais_um];
      let maxVersiculo = 0;
      for (let [key, value] of Object.entries(versiculos)) {
        maxVersiculo++;
      }
      if(versiculo > maxVersiculo){
        console.log("Versículo não encontrado");
        return false;
      }
      //Realiza as modificações e solicita um novo carregamento
      this.bibliaService.setLivro(+livro);
      this.livro = this.bibliaService.getLivro();
      this.bibliaService.setCapitulo(+capitulo);
      this.capitulo = this.bibliaService.getCapitulo();
      this.bibliaService.setVersiculo(+versiculo);
      this.versiculo = this.bibliaService.getVersiculo();

      this.bibliaService.setMaxCapitulo(this.book[+this.livro].chapters.length);
      this.maxCapitulo = this.bibliaService.getMaxCapitulo();

      this.bibliaService.setMaxVersiculo(maxVersiculo);
      this.maxVersiculo = this.bibliaService.getMaxVersiculo();

      this.charge();
    }else{
      console.log("Livro não encontrado");
    }   
  }
  @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) { 
      if(this.mostraMenu == false && this.mostraAtalho == true){
        if(event.key == 'Escape'){
          this.mostraAtalho = false;
        }
      }else
      if(this.mostraMenu == false && this.mostraAtalho == false){
        if(event.key == 'Enter'){
          this.mostraAtalho = true;
        }
        if(event.key == 'ArrowRight'){
          if((+this.versiculo+1)>0 && (+this.versiculo+1)<=+this.maxVersiculo){
            this.bibliaService.setVersiculo((+this.versiculo+1));
            this.versiculo = this.bibliaService.getVersiculo();
            
            this.bibliaService.setMaxCapitulo(this.book[+this.livro].chapters.length);
            this.maxCapitulo = this.bibliaService.getMaxCapitulo();

            let versiculos = this.book[+this.livro].chapters[+this.capitulo][(+this.capitulo+1)];
            var maxVersiculo = 0;
            for (let [key, value] of Object.entries(versiculos)) {
              maxVersiculo++;
            }
            this.bibliaService.setMaxVersiculo(maxVersiculo);
            
            this.charge();
            //caso versiculo seja maior chama o primeiro versiculo do próximo capitulo
          }else if((+this.versiculo+1) > +this.maxVersiculo){
            //verifica se tem mais capitulos
            if((+this.capitulo+1)<(+this.maxCapitulo)){
              this.bibliaService.setCapitulo((+this.capitulo+1));
              this.capitulo = this.bibliaService.getCapitulo();
              
              this.bibliaService.setVersiculo(1);
              this.versiculo = this.bibliaService.getVersiculo();

              let versiculos = this.book[+this.livro].chapters[+this.capitulo][(+this.capitulo+1)];
              let maxVersiculo = 0;
              for (let [key, value] of Object.entries(versiculos)) {
                maxVersiculo++;
              }

              this.bibliaService.setMaxCapitulo(this.book[+this.livro].chapters.length);
              this.maxCapitulo = this.bibliaService.getMaxCapitulo();

              this.bibliaService.setMaxVersiculo(maxVersiculo);
              this.maxVersiculo = this.bibliaService.getMaxVersiculo();
              this.charge();
              //caso o capitulo seja maior chama o próximo livro
            }else if((+this.capitulo+1)>=+this.maxCapitulo){
              //verifica se tem mais livros
              if((+this.livro+1) < 66){
                this.bibliaService.setLivro((+this.livro+1));
                this.livro = this.bibliaService.getLivro();

                this.bibliaService.setCapitulo(0);
                this.capitulo = this.bibliaService.getCapitulo();
                
                this.bibliaService.setMaxCapitulo(this.book[+this.livro].chapters.length);
                this.maxCapitulo = this.bibliaService.getMaxCapitulo();

                let versiculos = this.book[+this.livro].chapters[+this.capitulo][(+this.capitulo+1)];
                var maxVersiculo = 0;
                for (let [key, value] of Object.entries(versiculos)) {
                  maxVersiculo++;
                }
                this.bibliaService.setMaxVersiculo(maxVersiculo);
                this.bibliaService.setVersiculo(1);
                this.maxVersiculo = this.bibliaService.getMaxVersiculo();
                this.versiculo = this.bibliaService.getVersiculo();
                this.charge();            
              }
              /* if((+this.livro+1) < 66){

                this.bibliaService.setLivro((+this.livro+1));
                this.livro = this.bibliaService.getLivro();

                this.bibliaService.setCapitulo((+this.capitulo+1));
                this.capitulo = this.bibliaService.getCapitulo();
                this.bibliaService.setMaxCapitulo(this.capitulo);

                this.bibliaService.setVersiculo((+this.versiculo+1));
                this.versiculo = this.bibliaService.getVersiculo();

                let versiculos = this.book[+this.livro].chapters[+this.capitulo][(+this.capitulo+1)];
                let maxVersiculo = 0;
                for (let [key, value] of Object.entries(versiculos)) {
                  maxVersiculo++;
                }
                this.bibliaService.setMaxVersiculo(maxVersiculo);
                this.maxVersiculo = this.bibliaService.getMaxVersiculo();
                
                this.charge();
              } */
            }
          }
        }
        if(event.key == 'ArrowLeft'){
          if((+this.versiculo-1)>0 && (+this.versiculo-1)<=+this.maxVersiculo){
            this.bibliaService.setVersiculo((+this.versiculo-1));
            this.versiculo = this.bibliaService.getVersiculo();
            console.log("normal");
            this.charge();
          }
          //Caso o versiculo for menor ou igual a zero precisa chamar o capitulo anterior no último versículo
          if((+this.versiculo-1) <=0){
            if((+this.capitulo-1)>=0){
              this.bibliaService.setCapitulo((+this.capitulo-1));
              this.capitulo = this.bibliaService.getCapitulo();            
              let versiculos = this.book[+this.livro].chapters[+this.capitulo][(+this.capitulo+1)];
              let maxVersiculo = 0;
              for (let [key, value] of Object.entries(versiculos)) {
                maxVersiculo++;
              }
              this.bibliaService.setMaxVersiculo(maxVersiculo);
              this.bibliaService.setVersiculo(maxVersiculo);
              this.maxVersiculo = this.bibliaService.getMaxVersiculo();
              this.versiculo = this.bibliaService.getVersiculo();
              this.charge();
            }
            //Caso o capitulo for menor ou igual a zero precisa chamar o último capitulo do livro anterior
            if((+this.capitulo-1)<0){
              if((+this.livro-1) >= 0){

                this.bibliaService.setLivro((+this.livro-1));
                this.livro = this.bibliaService.getLivro();

                this.bibliaService.setMaxCapitulo(this.book[+this.livro].chapters.length);
                this.maxCapitulo = this.bibliaService.getMaxCapitulo();

                this.bibliaService.setCapitulo(((+this.book[+this.livro].chapters.length)-1));
                this.capitulo = this.bibliaService.getCapitulo();

                let versiculos = this.book[+this.livro].chapters[+this.capitulo][(+this.capitulo+1)];
                var maxVersiculo = 0;
                for (let [key, value] of Object.entries(versiculos)) {
                  maxVersiculo++;
                }
                this.bibliaService.setMaxVersiculo(maxVersiculo);
                this.bibliaService.setVersiculo(maxVersiculo);
                this.maxVersiculo = this.bibliaService.getMaxVersiculo();
                this.versiculo = this.bibliaService.getVersiculo();
                this.charge();            
              }
            }
          }
        }
        if(event.key == 'ArrowUp'){
          if(this.textoSize < 1){
            this.bibliaService.setTextoSize(1);
            this.textoSize = this.bibliaService.getTextoSize();
            return false;
          }
          this.bibliaService.setTextoSize((+this.textoSize+0.05));
          this.textoSize = this.bibliaService.getTextoSize();
          this.fontSizes[this.texto.length] = this.textoSize;
          this.bibliaService.setFontSizes(this.fontSizes);
        }
        if(event.key == 'ArrowDown'){
          if(this.textoSize > 500){
            this.bibliaService.setTextoSize(500);
            this.textoSize = this.bibliaService.getTextoSize();
            return false;
          }
          this.bibliaService.setTextoSize((+this.textoSize-0.05));
          this.textoSize = this.bibliaService.getTextoSize();
          this.fontSizes[this.texto.length] = this.textoSize;
          this.bibliaService.setFontSizes(this.fontSizes);
        }
      }
       
  }
}
