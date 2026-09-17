import express from "express";
import multer from "multer";
import OpenAI, { toFile } from "openai";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 12 * 1024 * 1024 } });
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "public")));

const modes = {
 fix: "Corrija iluminação, exposição, balanço de branco, enquadramento, nitidez e apresentação, mantendo o alimento real.",
 preserve: "Preserve rigorosamente quantidade, ingredientes, formato, recheio, embalagem e proporções. Melhore somente a qualidade fotográfica e apresentação.",
 delivery: "Crie fotografia gastronômica de alta conversão para delivery, produto em destaque, fundo limpo e profissional, sem texto.",
 desire: "Valorize apenas características realmente existentes como crocância, suculência, queijo, molho e frescor, sem inventar ingredientes.",
 scene: "Mantenha o prato fiel e coloque-o em um cenário gastronômico profissional coerente, sem alterar o alimento.",
 variation: "Crie nova composição e ângulo profissional do mesmo produto, mantendo identidade, ingredientes e quantidade."
};

app.post("/api/generate", upload.single("image"), async (req,res)=>{
 try{
  if(!req.file) return res.status(400).json({error:"Imagem obrigatória."});
  const mode=modes[req.body.mode] || modes.preserve;
  const prompt=`Fotografia gastronômica comercial hiper-realista. A imagem enviada é a referência obrigatória e fonte de verdade. ${mode}
Produto informado: ${req.body.product || "não informado"}.
Observações: ${req.body.notes || "nenhuma"}.
Não adicionar ou remover ingredientes, unidades ou acompanhamentos sem solicitação explícita. Sem textos, logotipos ou marcas inventadas. Aparência natural, fotografia profissional de estúdio para restaurante.`;
  const imageFile=await toFile(req.file.buffer, req.file.originalname || "food.png", {type:req.file.mimetype});
  const out=await client.images.edit({model:"gpt-image-2",image:imageFile,prompt,size:req.body.size||"1024x1024",quality:"medium"});
  res.json({image:out.data[0].b64_json});
 }catch(err){console.error(err);res.status(500).json({error:err?.message || "Erro interno."})}
});
const port=process.env.PORT||3000;app.listen(port,()=>console.log(`Webstore Food Studio: http://localhost:${port}`));
