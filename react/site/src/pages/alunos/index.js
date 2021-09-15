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
    
    const [alunos, setAlunos] = useState([])
    const [nome, setNome] = useState('')
    const [chamada, setChamada] = useState('')
    const [turma, setTurma] = useState('')
    const [curso, setCurso] = useState('')
    const [idAlterando, setIdAlterando] = useState(0)
    let loading               = useRef(null);

    
    async function listar() {
        loading.current.continuousStart();

        let r = await api.listar()
        setAlunos(r) 

        loading.current.complete();
    }

    useEffect(() => {
        listar()
    }, [])


    async function inserir() {
        loading.current.continuousStart();

        
        if(chamada > 0){
            if(idAlterando == 0 ){
                let r = await api.inserir (nome, chamada, curso, turma); 
                if(r.erro)
                    toast.error('♏'+ r.erro)
                else 
                    toast.dark('♏Aluno inserido')
            } else {
                let r = await api.alterar(idAlterando, nome, chamada, curso, turma);
                if(r.erro)
                    toast.error('♏' + r.erro)
                else
                    toast.dark('♏Aluno alterado')
            }
        } else (
            toast.dark('♏O campo de chamada está preenchido incorretamente')
        )
        listar()
        limparCampos()

        loading.current.complete();
    }


    function limparCampos() {
        setNome('')
        setChamada('')
        setCurso('')
        setTurma('')
        setIdAlterando(0)
    }

    async function remover(id){
        loading.current.continuousStart();

        confirmAlert({
            title: 'Remover aluno',
            message: `Tem certeza que quer remover o aluno ${id} ?`,
            buttons: [
                {
                    label: '♏Sim',
                    onClick: async() => {
                        let r = await api.remover(id);
                        if(r.erro){
                            toast.dark(`♏${r.erro}`);
                        } else {
                            toast.dark('♏Aluno removido com sucesso')
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

        setNome(item.nm_aluno)
        setChamada(item.nr_chamada)
        setCurso(item.nm_curso)
        setTurma(item.nm_turma)
        setIdAlterando(item.id_matricula)

        loading.current.complete();
    }




    return (
        <Container>
            <ToastContainer />
            <LoadingBar color="#EA10C7" ref={loading} />
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
                                            <input class="input" type="text" value={chamada} onChange={e => setChamada(e.target.value)} /> 
                                        </div>
                                        <div class="agp-input">
                                            <div class="number-product"> Avaliação: </div>  
                                            <input class="input" type="text" value={chamada} onChange={e => setChamada(e.target.value)} /> 
                                        </div>
                                    </div>

                                    <div class="input-right">
                                        <div className ="input-haha">
                                        <div class="agp-input">
                                            <div class="corse-product"> Preço De: </div>  
                                            <input class="input" type="text" value={curso} onChange={e => setCurso(e.target.value)} />
                                        </div>
                                        <div class="agp-input">
                                            <div class="class-product"> Preço Por: </div>  
                                            <input class="input" type="text" value={turma} onChange={e => setTurma(e.target.value)} />
                                        </div>
                                        <div class="agp-input">
                                            <div class="number-product"> Estoque: </div>  
                                            <input class="input" type="text" value={chamada} onChange={e => setChamada(e.target.value)} /> 
                                        </div>
                                    </div>
                                    </div>
                                    <div className="input-hehe">
                                        <div class="text">
                                        <div  class="agp-img">
                                       <div class="img-product"> Link Imagem: </div>  
                                       <input class="inputimg" type="text" value={chamada} onChange={e => setChamada(e.target.value)} /> 
                                    </div>
                                          <div class="desc">Descrição:</div>
                                          <textarea class="descTextarea" ></textarea>
                                        </div>
                                        </div>
                                                <div class="button-create"> <button onClick={inserir}> {idAlterando == 0 ? "Cadastrar" : "Alterar"} </button> </div>
                                </div>
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
                                        {alunos.map((item, i) =>    
                                            <tr className={i % 2 == 0 ? "linha-alternada" : ""}>
                                                <td> {item.id_matricula} </td>
                                                <td title={item.nm_aluno}> {item.nm_aluno != null && item.nm_aluno.length >= 20 ? item.nm_aluno.substr(0, 20) + "..." : item.nm_aluno} </td>
                                                <td> {item.nr_chamada} </td>
                                                <td> {item.nm_turma} </td>
                                                <td> {item.nm_curso} </td>
                                                <td className="coluna-acao" > <button onClick={ () => editar(item) }> <img src="/assets/images/edit.svg" alt="" /> </button> </td>
                                                <td className="coluna-acao" > <button onClick={ () => remover(item.id_matricula) }> <img src="/assets/images/trash.svg" alt="" /> </button> </td>
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