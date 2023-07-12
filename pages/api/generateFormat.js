import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { Configuration, OpenAIApi } from 'openai'
import clientPromise from '../../lib/mongodb'

async function handler(req, res) {
  try {
    const { user } = await getSession(req, res)
    const client = await clientPromise
    const db = await client.db('silverbot')
    const userProfile = await db.collection('users').findOne({ auth0Id: user.sub })

    if (!userProfile?.tokens || userProfile?.tokens < 1) {
      res.status(403).json({ error: 'Not enough tokens' })
      return
    }

    const configuration = new Configuration({
      organization: 'org-A9OEdG25Slh35gD1KB42fdUY',
      apiKey: process.env.OPENAI_API_KEY
    })

    const openai = new OpenAIApi(configuration)

    const { instruction, raw } = req.body

    await db.collection('users').updateOne({ auth0Id: user.sub }, { $inc: { tokens: -1 } })

    const formatContentResponse = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      temperature: 0,
      messages: [
        {
          role: 'system',
          content: 'You are a formatter of text'
        },
        {
          role: 'user',
          content: `Write only a response with the following format: ${instruction}, with the following raw text: ${raw}`
        }
      ]
    })

    const formatContent = formatContentResponse.data.choices[0]?.message?.content || ''

    console.log(formatContent)

    const format = await db.collection('formats').insertOne({
      formatContent,
      instruction,
      raw,
      userId: userProfile?._id,
      createdAt: new Date()
    })

    res.status(200).json({
      formatId: format.insertedId
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}

export default withApiAuthRequired(handler)
