import { ToastService } from './../../core/shared/toast.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EnderecoService } from '../shared/endereco.service';

@Component({
  selector: 'app-form-endereco',
  templateUrl: './form-endereco.page.html',
  styleUrls: ['./form-endereco.page.scss'],
})
export class FormEnderecoPage implements OnInit {
  formEndereco: FormGroup;
  key: string;

  constructor(private enderecoService: EnderecoService, private formBuilder: FormBuilder,
              private route: ActivatedRoute, private toast: ToastService) { }

              //método utilizado par visualizar os itens dos endereços
  ngOnInit() {
    this.criarFormulario();
    let key = this.route.snapshot.paramMap.get('key');
    //caso não tenho um endereço cadastrado ele ira trazer o formulário
    if (key) {
      const subscribe = this.enderecoService.getByKey(key).subscribe( (endereco: any) => {
        subscribe.unsubscribe();
        this.key = endereco.key;
        this.formEndereco.patchValue({
          cep: endereco.cep,
          logradouro: endereco.logradouro,
          numero: endereco.numero,
          complemento: endereco.complemento,
          bairro: endereco.bairro
        })
      })
    }
  }

  //formulário para criação do endereço
  criarFormulario() {
    this.key = null;
    this.formEndereco = this.formBuilder.group({
      cep: [''],
      logradouro: [''],
      numero: [''],
      complemento: [''],
      bairro: ['']
    });
  }

  //caso um endereço seja válido, execute o toast de confirmção de endereço
  onSubmit() {
    if (this.formEndereco.valid) {
      let result: Promise<{}>;
      if (this.key) {
        result = this.enderecoService.update(this.formEndereco.value, this.key);
      } else {
        result = this.enderecoService.insert(this.formEndereco.value);
      }

      result
      .then( () => {
        this.toast.show('Endereço salvo com sucesso');
        if (!this.key) {
          this.criarFormulario();
        }
      })
      .catch( () => {
        this.toast.show('Erro ao salvar o endereço');
      })
    }
  }
}
