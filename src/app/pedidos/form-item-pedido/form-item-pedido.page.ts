import { ToastService } from './../../core/shared/toast.service';
import { CarrinhoService } from './../shared/carrinho.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from 'src/app/produtos/shared/produtos-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-item-pedido',
  templateUrl: './form-item-pedido.page.html',
  styleUrls: ['./form-item-pedido.page.scss'],
})
export class FormItemPedidoPage implements OnInit {
produtos: Observable<any[]>;
produto: any = {}
form: FormGroup;
total: number = 0;
/*varia´vel para receber a img*/
produtoImg: string;
selectedRadioItem: any;
voltagemOp: any[];
formItemPedidoPage: Array<any>[] = [
 // {valor: CarrinhoService.CATEGORIA_SEM_VOLTAGEM.SERRAS}
];

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private produtosService: ProdutosService,
              private carrinhoService: CarrinhoService,
              private toast: ToastService) { }

  ngOnInit(){
    this.criarFormulario();
    let key = this.route.snapshot.paramMap.get('key');
    if (key) {
      const subscribe = this.produtosService.getByKey(key).subscribe( (produto: any) => {
        subscribe.unsubscribe();
        this.produto = produto;
        /*produtoImg é uma variável que foi criada para receber as informações da variável 'produto' e informando o caminho do banco*/
        this.produtoImg = produto.img;

        this.form.patchValue({
          produtoKey: produto.key,
          produtoNome: produto.nome,
          produtoImg: produto.img,
          produtoDescricao: produto.descricao,
          produtoVoltagem: produto.voltagem,
          produtoPreco: produto.preco,
          quantidade: 1
        })
        this.executaCalcularTotal();

        this.voltagemOp = this.carrinhoService.getVoltagem();
      })
    }
  }

  criarFormulario() {
    this.form = this.formBuilder.group({
      produtoKey: [''],
      produtoNome: [''],
      produtoDescricao: [''],
      produtoImg: [''],
      produtoPreco: [''],
      quantidade: [''],
      observacao: [''],
      voltagem: [''],
      total: ['']
    })
  }

  //atualiza o valor total mostrado
  executaCalcularTotal(){
    this.atualizaTotal(this.form.value.quantidade);
  }
  //adicionar quantidade de itens do carrinho
  adicionarQuantidade(){
    let qtd = this.form.value.quantidade;
    qtd++;
    this.atualizaTotal(qtd);
  }
  //retirar quantidade do produto
  removerQuantidade(){
    let qtd = this.form.value.quantidade;
    qtd--;
    if(qtd <=0)
      qtd=1;
    
    this.atualizaTotal(qtd);
  }
  //Recebe o preço do produto e realiza a multiplicação
  atualizaTotal(quantidade: number){
    this.total = this.produto.preco * quantidade;
    this.form.patchValue({quantidade:quantidade, total: this.total});
  }
  //inserindo produtos no carrito (spanish xd)
  onSubmit(){
    if (this.form.valid){
      this.carrinhoService.insert(this.form.value)
        .then( () => {
          this.toast.show('Produto adicionado ao carrito com sucesso !');
          this.router.navigate(['/tabs/produtos']);
        })
    }
  }

  //o clique no produto que leva para adição de quantidade.
  adicionarProduto(produtoKey: string){
    this.router.navigate(['pedido/carrinho/novo-item/', produtoKey]);
  }

}
