import express from 'express'
import multer from 'multer'
import { GenerateUserTalentEval } from '../handlers/GenerateUserTalentEval.js'

const router = express.Router()

router.post('/user-talent-eval-text', multer().none(), async (req, res) => {
    const username = req.body.username
    console.log('talent-eval-username', username)

    const user_talent_eval = new GenerateUserTalentEval(username)
    const eva_info = await user_talent_eval.summaryByLLM()
    const eva_text = eva_info.choices[0].message.content
    res.json(eva_text)
})

export default router
