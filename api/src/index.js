import db from './db.js'
import express from 'express'
import cors from 'cors'
import e from 'express'

const app = express()
app.use(cors())
app.use(express.json())


app.get('/produto', async(req, resp) => {
    try {
        let p = await db.tb_produto.findAll({order: [['id_produto', 'desc']]})
        resp.send(p)
    } catch (e) {
        resp.send({erro: e.toString()})
    }
})

app.post ('/produto', async(req, resp) => {
    try {
        let {nome, categoria, precoDe, precoPor, avaliacao, descProduto, estoque, imagem} = req.body

         let r = await db.tb_produto.create({
                  nm_produto: nome,
                  ds_categoria: categoria,
                  vl_preco_de: precoDe,
                  vl_preco_por: precoPor,
                  vl_avaliacao: avaliacao,
                  ds_produto: descProduto,
                  qtd_estoque: estoque,
                  img_produto: imagem,
                  dt_inclusao: new Date()
            }) 
        resp.send(r)
    }  catch {
        resp.send({ erro: e.toString() })
    }
})

app.put('/produto/:id', async(req, resp) => {
    try {
        let {nome, categoria, precoDe, precoPor, avaliacao, descProduto, estoque, imagem, data} = req.body
        let {id} = req.params

        let r = await db.tb_produto.update(
            {
                  nm_produto: nome,
                  ds_categoria: categoria,
                  vl_preco_de: precoDe,
                  vl_preco_por: precoPor,
                  vl_avaliacao: avaliacao,
                  ds_produto: descProduto,
                  qtd_estoque: estoque,
                  img_produto: imagem,
                  dt_inclusao: data
            },
            {
                where: {id_produto: id}
            }
        )
        resp.sendStatus(200)
    } catch (e) {
        resp.send({ error: e.toString() })
    }
    })

    app.delete('/produto/:id', async(req, resp) => {
        try {
            let { id } = req.params

            let r = await db.tb_produto.destroy ({where: { id_produto: id } })
            resp.sendStatus(200)
        } catch (e) {
            resp.send({ erro: e.toString() })
        }
    })










app.listen(process.env.PORT,
    x => console.log(`>> Server up at port ${process.env.PORT}`))