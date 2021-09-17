
import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:3030'
})

export default class Api {
    
    async listar () {
        let r = await api.get(`/produto`)
        return r.data;
    }    

    async inserir (nmProduto, dsCategoria, vlPrecoDe, vlPrecoPor, vlAvaliacao, dsProduto, qtdEstoque, imgProduto, btAtivo, inclusao) {

        let produtoJSON = {
        nm_produto: nmProduto ,
        ds_categoria: dsCategoria,
        vl_preco_de: vlPrecoDe,
        vl_preco_por:  vlPrecoPor,
        vl_avaliacao: vlAvaliacao,
        ds_produto: dsProduto,
        qtd_estoque: qtdEstoque ,
        img_produto: imgProduto,
        bt_ativo:  btAtivo,
        dt_inclusao: inclusao
        }
        
        let r = await api.post(`/produto`,  produtoJSON )
        return r.data;
    }

    async remover (id) {
        let r = await api.delete(`/produto/${id}`)
        return r.data;
    }

    async alterar(id, nmProduto, dsCategoria, vlPrecoDe, vlPrecoPor, vlAvaliacao, dsProduto, qtdEstoque, imgProduto, btAtivo, inclusao ) {

        let produtoJSON = {
            nm_produto: nmProduto ,
            ds_categoria: dsCategoria,
            vl_preco_de: vlPrecoDe,
            vl_preco_por:  vlPrecoPor,
            vl_avaliacao: vlAvaliacao,
            ds_produto: dsProduto,
            qtd_estoque: qtdEstoque ,
            img_produto: imgProduto,
            bt_ativo:  btAtivo,
            dt_inclusao: inclusao
            }

        let r = await api.put(`/produto/${id}`, produtoJSON)
        return r.data;
    }
   
}