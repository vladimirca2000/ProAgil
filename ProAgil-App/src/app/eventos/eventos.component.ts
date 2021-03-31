import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Evento } from '../_models/Evento';
import { EventoService } from '../_services/evento.service';
import { Validators } from '@angular/forms';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import {  BsLocaleService } from 'ngx-bootstrap/datepicker';
defineLocale('pt-br', ptBrLocale); 

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  eventosFiltrados: Evento[];
  eventos: Evento[];
  evento: Evento;
  imagemLargura: number = 50;
  imagemMargem: number = 2;
  mostrarImagem: boolean = false;
  registerForm: FormGroup;

  modoSalvar = 'post';

  _filtroLista: string;

  constructor(private eventoService: EventoService
              ,private modalService: BsModalService
              ,private fb: FormBuilder
              ,private localService: BsLocaleService
            ) 
  {
    this.localService.use('pt-br');
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
        }, error => {
            console.log(error);
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
        }, error => {
            console.log(error);
          }
        );
      }
      
    }

  }

  validation(){
    this.registerForm = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', [Validators.required, Validators.maxLength(50)]],
      dataEvento: ['', Validators.required],
      imagemURL: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(15000)]],
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
      });
  }

}
