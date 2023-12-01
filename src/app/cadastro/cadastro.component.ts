import { ConsultaCepService } from './../service/consulta-cep.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { NgForOfContext } from '@angular/common';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(
    private router: Router,
    private ConsultaCepService: ConsultaCepService
  ) { }

  ngOnInit(): void {
  }

  cadastrar(form: NgForm) {
    // if(form.valid){
    //   console.log('Formulário enviado');
    //   console.log(form);
    //   this.router.navigate(['sucesso'])
    // }else{
    //   alert('Formulario Invalido!')
    // }
    console.log(form.controls);
  }

  consultaCEP(ev: any, f: NgForm) {
    const cep = ev.target.value;

    if (cep !== '') {
      this.ConsultaCepService.getConsultaCep(cep).subscribe( 
        resultado => {
          this.populandoEndereco(resultado , f)
        });
    }
    
  }


  populandoEndereco(dados: any, f: NgForm){
    f.form.patchValue({
      endereco: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    })
  }
}
