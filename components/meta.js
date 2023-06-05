import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Meta = ({ title = '' }) => {
  const router = useRouter()
  const meta = {
    title: title ? ` | ${title}` : 'silverbot',
    description: 'AI powered blog generator'
    // cardImage: '/og.png'
  }

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name='robots' content='follow, index' />
      <link href='/favicon.ico' rel='shortcut icon' />
      <meta content={meta.description} name='description' />
      <meta property='og:url' content={`https://silverbot.vercel.app${router.asPath}`} />
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content={meta.title} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:title' content={meta.title} />
      {/* <meta property="og:image" content={meta.cardImage} /> */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='https://silverbot.vercel.app/' />
      <meta name='twitter:title' content={meta.title} />
      <meta name='twitter:description' content={meta.description} />
      {/* <meta name="twitter:image" content={meta.cardImage} /> */}
    </Head>
  )
}

export default Meta
