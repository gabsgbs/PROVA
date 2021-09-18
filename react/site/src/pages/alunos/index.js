import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import LoadingBar from 'react-top-loading-bar'

import Cabecalho from '../../components/cabecalho'
import Menu from '../../components/menu'

import { Container, Conteudo } from './styled'
import { useState, useEffect, useRef } from 'react'

import Api from '../../services/api'
const api = new Api()


export default function Index() {
    
    const [produto, setProduto] = useState([])
    const [nome, setNome] = useState('')
    const [categoria, setCategoria] = useState('')
    const [precoDe, setPrecoDe] = useState('')
    const [precoPor, setPrecoPor] = useState('')
    const [avaliacao, setAvaliacao] = useState('')
    const [descProduto, setDescProduto] = useState('')
    const [estoque, setEstoque] = useState('')
    const [imagem, setImagem] = useState('')
    const [idAlterando, setIdAlterando] = useState(0)
    let loading               = useRef(null);

    
    async function listar() {
        loading.current.continuousStart();

        let r = await api.listar()
        setProduto(r) 

        loading.current.complete();
    }

    useEffect(() => {
        listar()
    }, [])


    async function r() {
        loading.current.continuousStart();

        const  r = await api.listar()
        
        setProduto(r) 
        
        if(loading.current != null) 
            loading.current.complete();
        
    }

 
    useEffect(() => {
       
        
        listar()

       
    }, [])

    

    const validarResposta = (resp) => {
       

        if (!resp.erro)
            return true;
            toast.error(`${resp.erro}`);
        return false;
    }

    const inserir = async () => {
     
        if(avaliacao, estoque, precoDe, precoPor < 0)
        return toast.dark('♏Não é possivel inserir números negativo')     
       
        if(nome, categoria, precoDe, precoPor, avaliacao, descProduto, estoque, imagem == ""){
            toast.dark('♏ todos os campos são obrigatorios')   
        } else
          if(idAlterando === 0) {
        const r = await api.inserir(nome, categoria, precoDe, precoPor, avaliacao, descProduto, estoque, imagem )
        if (!validarResposta(r))   
        toast.dark('♏Produto Inserido')
     } else {
       const r = await api.alterar(idAlterando, nome, categoria, precoDe, precoPor, avaliacao, descProduto, estoque, imagem )
        if (!validarResposta(r)) 
        return toast.dark('♏Produto Alterado')
    } 

        listar()
        limparCampos()

        loading.current.complete();
    }


    function limparCampos() {
        setNome('')
        setCategoria('')
        setPrecoDe('')
        setPrecoPor('')
        setAvaliacao('')
        setDescProduto('')
        setEstoque('')
        setImagem('')
        setIdAlterando(0)
    }

    async function remover(id){
        loading.current.continuousStart();

        confirmAlert({
            title: 'Remover produto',
            message: `Tem certeza que quer remover o produto ${id} ?`,
            buttons: [
                {
                    label: '♏Sim',
                    onClick: async() => {
                        let r = await api.remover(id);
                        if(r.erro){
                            toast.dark(`♏${r.erro}`);
                        } else {
                            toast.dark('♏Produto removido com sucesso')
                            listar();
                        }
                    }
                },
                {
                    label: '♏Não'
                }
            ]
        })

        listar();

        loading.current.complete();
    }

    async function editar(item) {
        loading.current.continuousStart();

        setNome(item.nm_produto)
        setCategoria(item.ds_categoria)
        setPrecoDe(item.vl_preco_de)
        setPrecoPor(item.vl_preco_por)
        setAvaliacao(item.vl_avaliacao)
        setDescProduto(item.ds_produto)
        setEstoque(item.qtd_estoque)
        setImagem(item.img_produto)
        setIdAlterando(item.id_produto)

        loading.current.complete();
    }




    return (
        <Container>
            <ToastContainer />
            <LoadingBar color="cyan" ref={loading} />
            <Menu />
            <Conteudo>
                        <Cabecalho />
                        <div class="body-right-box">
                            <div class="new-student-box">
                                
                                <div class="text-new-student">
                                    <div class="bar-new-student"></div>
                                    <div class="text-new-student"> {idAlterando == 0 ? "Novo Produto" : "Alterando Produto " + idAlterando } </div>
                                </div>

                                <div class="input-new-student"> 
                                    <div class="input-left">
                                        <div class="agp-input"> 
                                            <div class="name-product"> Nome: </div>  
                                            <input class="input" type="text" value={nome} onChange={e => setNome(e.target.value)} />
                                        </div> 
                                        <div class="agp-input">
                                            <div class="number-product"> Categoria: </div>  
                                            <input class="input" type="text" value={categoria} onChange={e => setCategoria(e.target.value)} /> 
                                        </div>
                                        <div class="agp-input">
                                            <div class="number-product"> Avaliação: </div>  
                                            <input class="input" type="text" value={avaliacao} onChange={e => setAvaliacao(e.target.value)} /> 
                                        </div>
                                    </div>
                                    <div class="input-right">
                                        <div class="agp-input">
                                            <div class="corse-product"> Preço De: </div>  
                                            <input class="input" type="text" value={precoDe} onChange={e => setPrecoDe(e.target.value)} />
                                        </div>
                                        <div class="agp-input">
                                            <div class="class-product"> Preço Por: </div>  
                                            <input class="input" type="text" value={precoPor} onChange={e => setPrecoPor(e.target.value)} />
                                        </div>
                                        <div class="agp-input">
                                            <div class="number-product"> Estoque: </div>  
                                            <input class="input" type="text" value={estoque} onChange={e => setEstoque(e.target.value)} /> 
                                        </div>
                                    </div>
                                    </div>
                                    <div class="agp-input" class="agp-img">
                                       <div class="img-product"> Link Imagem: </div>  
                                       <input class="inputimg" type="text" value={imagem} onChange={e => setImagem(e.target.value)} /> 
                                    </div>
                                        <div class="text">
                                          <div class="desc">Descrição:</div>
                                          <textarea class="descTextarea" type="text" value={descProduto} onChange={e => setDescProduto(e.target.value)} ></textarea>
                                        </div>
                                        <div class="button-create"> <button onClick={inserir}> {idAlterando == 0 ? "Cadastrar" : "Alterar"} </button> </div>                             
                            </div>

                            <div class="student-registered-box">
                                <div class="row-bar"> 
                                    <div class="bar-new-student"> </div>
                                    <div class="text-registered-student"> Produtos Cadastrados </div>
                                </div>
                            
                                <table class ="table-user">
                                    <thead>
                                        <tr>
                                            <th class="imagem-coluna"></th>
                                            <th> ID </th>
                                            <th> Produto </th>
                                            <th>  Categoria </th>
                                            <th> Preço </th>
                                            <th> Estoque </th>
                                            <th class="coluna-acao"> </th>
                                            <th class="coluna-acao"> </th>
                                        </tr>
                                    </thead>
                            
                                    <tbody>
                                        {produto.map((item, i) =>    
                                            <tr className={i % 2 == 0 ? "linha-alternada" : ""}>
                                                <td className="imagem-pr"><img src={item.img_produto}/></td>
                                                <td> {item.id_produto}</td>
                                                <td title={item.nm_produto}> {item.nm_produto != null && item.nm_produto.length >= 25 ? item.nm_produto.substr(0, 25) + "..." : item.nm_produto} </td>
                                                <td> {item.ds_categoria} </td>
                                                <td> {item.vl_preco_por} </td>
                                                <td> {item.qtd_estoque} </td>
                                                <td className="coluna-acao" > <button onClick={ () => editar(item) }> <img src="/assets/images/edit.svg" alt="" /> </button> </td>
                                                <td className="coluna-acao" > <button onClick={ () => remover(item.id_produto) }> <img src="/assets/images/trash.svg" alt="" /> </button> </td>
                                            </tr>
                                        )}
                                    </tbody> 
                                </table>
                            </div>
                        </div>
                    </Conteudo>
            </Container>
            
        )
}