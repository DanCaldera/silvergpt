import { Configuration, OpenAIApi } from 'openai'

export default async function handler(req, res) {
  const configuration = new Configuration({
    organization: 'org-A9OEdG25Slh35gD1KB42fdUY',
    apiKey: process.env.OPENAI_API_KEY
  })
  const openai = new OpenAIApi(configuration)
  // const response = await openai.listModels()
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    temperature: 0,
    max_tokens: 3600,
    prompt: 'Generate a blog post about owning dogs'
  })

  // console.log('response', response.data)
  console.log('response', response)

  res.status(200).json({
    post: response.data.choices
  })
}
