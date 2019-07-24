import { BibliaService } from './../../biblia/biblia.service';
import { Component, OnInit, ViewChild, ElementRef,Input, Output, EventEmitter } from '@angular/core';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mensagem-atalho',
  templateUrl: './atalho.component.html',
  styleUrls: ['./atalho.component.scss']
})
export class AtalhoComponent implements OnInit {
  @ViewChild('atalho', {static: false}) public atalho;
  @ViewChild('focusInput', {static: false}) focusInput: ElementRef;
  @Input() menuShow:boolean;
  @Input() calibracaoShow:boolean;
  @Output() mudaTexto = new EventEmitter();
  @HostListener('focusout', ['$event']) public onListenerTriggered(event: any): void {
    this.setFocusToInput();
  }

  constructor(private bibliaService: BibliaService,private router: Router) { }
  ngOnInit() { }
  
  //Variaveis
  atalhoInput:string;
  book:JSON = this.bibliaService.getBook();
  error:string;
  
  setFocusToInput() {
      this.focusInput.nativeElement.focus();
  }

  enviarFechar(){
    this.error = null;
    this.atalhoInput = null;
    this.atalho.hide();
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
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(event.key == 'Enter' && !this.menuShow && !this.calibracaoShow){
      if(this.atalho.isShown && this.atalhoInput){
        let livro:any = this.atalhoInput.split(" ")[0] || 0;
        livro = this.retira_acentos(livro);
        livro = livro.toLowerCase();
        let capitulo = this.atalhoInput.split(" ")[1] || 1;
        capitulo = +capitulo-1 || 0;	
        let versiculo = this.atalhoInput.split(" ")[2] || 1;
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
        if(livro == 'jo'  || livro == 'joao'){                livro = 42;}
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
        if((!isNaN(+livro)) && (livro<'66') && (livro>='0')){
          //Verifica se existe o capitulo solicitado
          let maxCapitulo = this.book[livro].chapters.length;
          if(capitulo > maxCapitulo){
            this.error = "Capítulo não encontrado";
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
            this.error = "Versículo não encontrado";
            return false;
          }
          this.enviarFechar();
          this.bibliaService.setLivro(+livro);
          this.bibliaService.setCapitulo(+capitulo);
          this.bibliaService.setVersiculo(+versiculo);
          this.bibliaService.setMaxCapitulo(this.book[+livro].chapters.length);
          this.bibliaService.setMaxVersiculo(maxVersiculo);
          this.router.navigateByUrl('/biblia');
        }else{
          this.error = "Livro não encontrado";
        }
      }else{
        this.atalho.show();
        this.setFocusToInput();
      }
    }
  }
}
