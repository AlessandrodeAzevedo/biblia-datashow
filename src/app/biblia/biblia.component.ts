import { BibliaService } from './biblia.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { AnimationBuilder } from 'css-animator';

let animator = new AnimationBuilder();

@Component({
  selector: 'biblia',
  templateUrl: './biblia.component.html',
  styleUrls: ['./biblia.component.scss']
})


export class BibliaComponent implements OnInit {
  @ViewChild('calibracao') public calibracao;
  @ViewChild('calibrando') public calibrando;

  book:JSON = this.bibliaService.getBook();
  logo:string = this.bibliaService.getLogo();;
  texto:string;
  textoSize:number = this.bibliaService.getTextoSize();
  fontSizes:Array<any> = this.bibliaService.getFontSizes();
  endereco:string;
  mostraMenu:boolean = false;
  mostraMenuLateral:boolean = false;
  mostraAtalho:boolean = false;
  capitulo = this.bibliaService.getCapitulo();
  versiculo:number = this.bibliaService.getVersiculo();
  versao = this.bibliaService.getVersao();
  livro = this.bibliaService.getLivro();
  maxVersiculo = this.bibliaService.getMaxVersiculo();
  maxCapitulo = this.bibliaService.getMaxCapitulo();
  historics:Array<any> = this.bibliaService.getHistorics();
  saves:Array<any> = this.bibliaService.getSaves();
  mostraCalibracao:boolean = false;
  passosCalibracao:number;
  primeiraUtilizacao:boolean = this.bibliaService.getPrimeiraUtilizacao();
  navigationSubscription;

  constructor(private elementRef: ElementRef,private bibliaService: BibliaService,private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      this.logo = this.bibliaService.getLogo();
    });
  }

  ngOnInit() { 
    animator.setDuration(500).setType('bounceInLeft').show(this.elementRef.nativeElement);
    this.charge();
  }

  ngAfterViewInit() {
    if(this.primeiraUtilizacao){
      this.calibracao.show();
    }
  }

  salvar(){
    let dados:Object = {};
    dados['caminho'] = this.livro+" "+(+this.capitulo+1)+" "+this.versiculo;
    dados['data'] = moment().format("DD-MM-YYYY HH:mm:ss");
    if(this.saves.length > 49){
      this.saves.pop();
    }
    this.saves.unshift(dados);
    this.bibliaService.setSaves(this.saves);
    this.saves = this.bibliaService.getSaves();    
  }

  historico(){
    let dados:Object = {};
    dados['caminho'] = this.livro+" "+this.capitulo+" "+this.versiculo;
    dados['data'] = moment().format("YYYY-MM-DDTHH:mm:ss");
    if(this.historics.length > 49){
      this.historics.pop();
    }
    this.historics.unshift(dados);
    this.bibliaService.setHistorics(this.historics);
    this.historics = this.bibliaService.getHistorics();    
  }
  calibrar_font(calibrar){
    this.calibracao.hide();    
    if(calibrar){
      this.bibliaService.resetFont();
      this.fontSizes = this.bibliaService.getFontSizes();
      this.mostraCalibracao = true;
      this.passosCalibracao = 1;
      this.livro = 0;
      this.capitulo = 10;
      this.versiculo = 10;
      this.maxCapitulo = this.book[+this.livro].chapters.length;
      let versiculos = this.book[+this.livro].chapters[+this.capitulo][(+this.capitulo+1)];
      let maxVersiculo = 0;
      for (let [key, value] of Object.entries(versiculos)) {
        maxVersiculo++;
      }
      this.maxVersiculo = maxVersiculo;
      this.charge(true);
      this.calibrando.show();
      this.bibliaService.setPrimeiraUtilizacao(false)
      this.primeiraUtilizacao = false;
    }
  }
  getfont(){
    //console.log(this.texto.length);
    if(this.fontSizes[this.texto.length] == undefined){      
      //Pega o valor salvo das lengths
      let keys = Object.keys(this.fontSizes);
      //let valor = 80; //length atual que também é o nome da key
      //Ordena as length salvos do menor para o maior
      keys.sort(function(a, b){return +a-(+b)});
      //verifica se o length é o menor de todos
      if(this.texto.length < +keys[0]){
        //console.log("menor de todos");
        //caso seja o menor pega exatamente o tamanho do menor
        this.textoSize = this.fontSizes[+keys[0]];        
      }else
      //verifica se é o maior de todos
      if(this.texto.length > +keys[+keys.length-1]){
        //console.log("maior de todos de todos");
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

        /*
        * função regra de três
        *   a = 100%
        *   b     x%
        */

        //pega a diferença entre a informação anterior e a próxima|| base (a) da regra de três (lenght)
        let cem = (+sucessor) - (+antercessor);
        //pega a diferença entre a informação anterior e a atual|| base (b) regra de três (lenght)
        let texto = (+this.texto.length) - (+antercessor);
        //descobre o valor de x% (lenght) esse valor é o base x% da regra de três (font)
        let porcentagem_length = (texto*100)/cem;


        //pega a diferença entre a informação anterior e a próxima|| base (a) regra de três (font)
        let cem_font = (+this.fontSizes[+antercessor]) - (+this.fontSizes[+sucessor]);
        //decobre o valor de (b) da regra de três esse é a diferença da fonte
        let valor_para_subtrair = (cem_font*porcentagem_length)/100;
        //Como são inversamente proporcionais (quanto maior o numero de caracteres, menor a fonte) e fiz o calculo pelo antercessor, subtrai do valor do antercessor o cálculo obtido
        this.textoSize = +this.fontSizes[+antercessor]-(+valor_para_subtrair);

        if(+sucessor - this.texto.length < this.texto.length - +antercessor){
          //console.log("mais perto do sucessor:"+sucessor+" o antercessor é: "+antercessor);
        }else{
          //console.log("mais perto do antercessor:"+antercessor+" o sucessor é: "+sucessor);
        }        
      }
    }else{
      //caso já exista pega do mesmo tamanho
      //console.log("já existe");
      this.textoSize = this.fontSizes[this.texto.length];
    }   
    return this.textoSize;
  }
  showMenu(){
    this.mostraMenu = true;        
  } 
  mudaVersao(string){
    this.bibliaService.setVersao(string);
    this.versao = string;
    this.book = this.bibliaService.getBook();
    this.charge();
  }
  charge(calibrar = false,menu = false){
    this.mostraMenu = false;
    this.mostraMenuLateral = false;
    this.mostraAtalho = false;
    if(!calibrar || menu){
      this.historico();
      this.livro = this.bibliaService.getLivro();
      this.capitulo = this.bibliaService.getCapitulo();
      this.versiculo = this.bibliaService.getVersiculo();
      this.maxCapitulo = this.bibliaService.getMaxCapitulo();
      this.maxVersiculo = this.bibliaService.getMaxVersiculo();
      this.book = this.bibliaService.getBook();
    }
    
    let nomeLivro = this.book[+this.livro].book;   
    if(nomeLivro == "Lamentações de Jeremias"){
      nomeLivro = "Lamentações";
    }
    this.texto = this.book[+this.livro].chapters[+this.capitulo][(+this.capitulo+1)][+this.versiculo];
    this.endereco = nomeLivro+" "+(+this.capitulo+1)+":"+this.versiculo;   
  }

  retira_acentos(palavra) {  
    if(palavra.toLowerCase() == 'jó'){
      return palavra;
    }  
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
    let livro:any = string.split(" ")[0] || 0;
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
    if(livro == 'jó'  ){                                  livro = 17;}
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
    if(livro == 'jo' || livro == 'joao'){                livro = 42;}
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
      if(this.mostraMenu || this.mostraAtalho || this.mostraMenuLateral == true){
        if(event.key == 'Escape'){
          this.mostraMenuLateral = false;
          this.mostraMenu = false;
          this.mostraAtalho = false;
        }
      }
      if(!this.mostraMenu && !this.mostraAtalho && !this.mostraMenuLateral){
        if(event.key == '1'){
          this.mudaVersao('ara.json'); 
        }
        if(event.key == '2'){
          this.mudaVersao('acf.json'); 
        }
        if(event.key == '3'){
          this.mudaVersao('aa.json');
        }
        if(event.key == '4'){
          this.mudaVersao('nvi.json');
        }
        if(event.key == '5'){
          this.mudaVersao('ntlh.json');
        }
        if(event.key == '6'){
          this.mudaVersao('kja.json');
        }
        if(event.key == '7'){
          this.mudaVersao('jerusalem.json');
        }
        if(event.key == '8'){
          this.mudaVersao('avemaria.json');
        }
        if(event.key == '9'){
          this.mudaVersao('tnm.json');
        }
      }

      if(!this.mostraMenu && !this.mostraAtalho && !this.mostraMenuLateral){
        if(event.keyCode == 78 && event.ctrlKey && event.altKey){
          this.calibracao.show();
          this.calibracao.backdrop = false;
        }
        if(event.key == 's' && event.ctrlKey){
          this.salvar();          
          return false;
        }
        if(event.key == 'b' && event.ctrlKey){
          this.bibliaService.setIndice(this.saves);
          this.mostraMenuLateral = true;
        }
        if(event.key == 'Enter'){
          if(this.mostraCalibracao && this.passosCalibracao){
            if(this.passosCalibracao == 1){
              this.livro = 0;
              this.capitulo = 2;
              this.versiculo = 18;
              this.maxCapitulo = this.book[+this.livro].chapters.length;
              let versiculos = this.book[+this.livro].chapters[+this.capitulo][(+this.capitulo+1)];
              let maxVersiculo = 0;
              for (let [key, value] of Object.entries(versiculos)) {
                maxVersiculo++;
              }
              this.maxVersiculo = maxVersiculo;
              this.passosCalibracao = 2;
              this.charge(true);
            }else
            if(this.passosCalibracao == 2){
              this.livro = 0;
              this.capitulo = 0;
              this.versiculo = 2;
              this.maxCapitulo = this.book[+this.livro].chapters.length;
              let versiculos = this.book[+this.livro].chapters[+this.capitulo][(+this.capitulo+1)];
              let maxVersiculo = 0;
              for (let [key, value] of Object.entries(versiculos)) {
                maxVersiculo++;
              }
              this.maxVersiculo = maxVersiculo;
              this.passosCalibracao = 3;
              this.charge(true);
            }else
            if(this.passosCalibracao == 3){
              this.livro = 0;
              this.capitulo = 0;
              this.versiculo = 21;
              this.maxCapitulo = this.book[+this.livro].chapters.length;
              let versiculos = this.book[+this.livro].chapters[+this.capitulo][(+this.capitulo+1)];
              let maxVersiculo = 0;
              for (let [key, value] of Object.entries(versiculos)) {
                maxVersiculo++;
              }
              this.maxVersiculo = maxVersiculo;
              this.passosCalibracao = 4;
              this.charge(true);
            }else
            if(this.passosCalibracao == 4){
              this.livro = 1;
              this.capitulo = 12;
              this.versiculo = 15;
              this.maxCapitulo = this.book[+this.livro].chapters.length;
              let versiculos = this.book[+this.livro].chapters[+this.capitulo][(+this.capitulo+1)];
              let maxVersiculo = 0;
              for (let [key, value] of Object.entries(versiculos)) {
                maxVersiculo++;
              }
              this.maxVersiculo = maxVersiculo;
              this.passosCalibracao = 5;
              this.charge(true);
            }else
            if(this.passosCalibracao == 5){
              this.livro = 16;
              this.capitulo = 7;
              this.versiculo = 9;
              this.maxCapitulo = this.book[+this.livro].chapters.length;
              let versiculos = this.book[+this.livro].chapters[+this.capitulo][(+this.capitulo+1)];
              let maxVersiculo = 0;
              for (let [key, value] of Object.entries(versiculos)) {
                maxVersiculo++;
              }
              this.maxVersiculo = maxVersiculo;
              this.charge(true);
              this.passosCalibracao = 6;
            }else
            if(this.passosCalibracao == 6){
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
              this.passosCalibracao = null;
              this.mostraCalibracao = null;
              this.calibrando.hide();
              this.charge(true);
              this.fontSizes = this.bibliaService.getFontSizes();
              //this.router.navigate(['biblia']);
              return false;
            }
          }else{
            if(this.mostraCalibracao){
              this.mostraCalibracao = false;
            }else{
              this.mostraAtalho = true;
            }
          }
        }
        if(!this.mostraCalibracao && !this.passosCalibracao){
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
              }
            }
          }
          if(event.key == 'ArrowLeft'){
            if((+this.versiculo-1)>=0 && (+this.versiculo-1)<=+this.maxVersiculo){
              this.bibliaService.setVersiculo((+this.versiculo-1));
              this.versiculo = this.bibliaService.getVersiculo();
              this.charge();
            }
            //Caso o versiculo for menor ou igual a zero precisa chamar o capitulo anterior no último versículo
            if((+this.versiculo-1) <0){
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
              }else{
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
