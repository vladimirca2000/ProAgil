import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService  } from 'ngx-bootstrap/modal';
import { Evento } from '../_models/Evento';
import { EventoService } from '../_services/evento.service';
import { Validators } from '@angular/forms';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';

defineLocale('pt-br', ptBrLocale); 

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  titulo = 'Eventos';

  eventosFiltrados: Evento[];
  eventos: Evento[];
  evento: Evento;
  imagemLargura: number = 50;
  imagemMargem: number = 2;
  mostrarImagem: boolean = false;
  registerForm: FormGroup;
  bodyDeletarEvento = '';

  modoSalvar = 'post';

  _filtroLista: string;

  constructor(private eventoService: EventoService
              , private modalService: BsModalService
              , private fb: FormBuilder
              , private localeService: BsLocaleService 
              , private toastr: ToastrService
            ) 
  {
    this.localeService.use('pt-br');
  }

  get filtroLista(): string{
    return this._filtroLista;
  }
  set filtroLista(value: string){
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista): this.eventos;
  }

  openModal(template: any){
    this.registerForm.reset();
    template.show();
  }

  ngOnInit(): void {
    this.validation();
    this.getEventos();
  }

  filtrarEventos(filtrarPor: string): Evento[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  alternarImagem(){
    this.mostrarImagem = !this.mostrarImagem;
  }

  editarEvento(evento: Evento, template: any){
    this.modoSalvar = 'put';
    this.openModal(template);
    this.evento = evento;
    this.registerForm.patchValue(evento);    
    console.log(evento);
  }

  excluirEvento(evento: Evento, template: any){    
    this.openModal(template);
    this.evento = evento;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.id}`;
  }

  novoEvento(template: any){
    this.modoSalvar = 'post';
    this.openModal(template);    
  }

  salvarAlteracao(template: any){
    if (this.registerForm.valid){
      if(this.modoSalvar === 'post')
      {
        this.evento = Object.assign({}, this.registerForm.value);
        this.eventoService.postEvento(this.evento).subscribe(
        (novoEvento: Evento) => {
          console.log(novoEvento);
          template.hide();
          this.getEventos();
          this.toastr.success('Inserido com Sucesso');
        }, error => {
            console.log(error);
            this.toastr.error(`Erro ao tentar inserir: ${error}`);
          }
        );
      } else {
        this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
        console.log('Alterar Evento');
        console.log(this.evento);
        this.eventoService.putEvento(this.evento).subscribe(
        () => {
          template.hide();
          this.getEventos();
          this.toastr.success('Alterado com Sucesso');
        }, error => {
            console.log(error);
            this.toastr.error(`Erro ao tentar alterar: ${error}`);
          }
        );
      }      
    }
  }

  confirmeDelete(template: any){
    this.eventoService.deleteEvento(this.evento.id).subscribe(
      () => {
        template.hide();
        this.getEventos();
        this.toastr.success('Deletado com Sucesso');
      }, error => {
        console.log(error);
        this.toastr.error('Erro ao tentar deletar');
      }
    );
  }

  validation(){
    this.registerForm = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', [Validators.required, Validators.maxLength(50)]],
      dataEvento: ['', [Validators.required]],
      imagemURL: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(1500)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  getEventos() {
    this.eventoService.getAllEvento().subscribe(
      (_eventos: Evento[]) => {
       this.eventos = _eventos; 
       console.log(this.eventos);
       this.eventosFiltrados = this.eventos;
    }, error => {
      console.log(error);
      this.toastr.error(`Erro ao tentar carregar: ${error}`);
      });
  }

}
