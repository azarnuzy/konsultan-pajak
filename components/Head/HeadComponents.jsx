import Head from 'next/head'
import React from 'react'

function HeadComponent() {
  return (
    <Head>
      <meta charSet='UTF-8' />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0'
      />
      <meta
        httpEquiv='X-UA-Compatible'
        content='ie=edge'
      />
      <meta
        name='description'
        content='Konsultan Pajak yang menyediakan informasi dan jadwal konsultasi untuk kebutuhan perpajakan.'
      />
      <meta
        name='keywords'
        content='konsultan pajak, perpajakan, jadwal konsultasi'
      />
      <meta
        name='author'
        content='Nama Konsultan Pajak'
      />
      <meta
        name='robots'
        content='index, follow'
      />
      <meta
        name='theme-color'
        content='#ffffff'
      />
      <meta
        property='og:title'
        content='Konsultan Pajak | Informasi dan Jadwal Konsultasi'
      />
      <meta
        property='og:description'
        content='Konsultan Pajak yang menyediakan informasi dan jadwal konsultasi untuk kebutuhan perpajakan.'
      />
      <meta
        property='og:type'
        content='website'
      />
      <meta
        property='og:url'
        content='https://www.konsultasi-pajak.com/'
      />
      <meta
        property='og:image'
        content='https://www.konsultasi-pajak.com/images/logo.png'
      />
      <meta
        property='twitter:title'
        content='Konsultan Pajak | Informasi dan Jadwal Konsultasi'
      />
      <meta
        property='twitter:description'
        content='Konsultan Pajak yang menyediakan informasi dan jadwal konsultasi untuk kebutuhan perpajakan.'
      />
      <meta
        property='twitter:image'
        content='https://www.contohkonsultanpajak.com/images/logo.png'
      />
      <link
        rel='icon'
        href='/favicon.ico'
      />
      <title>Konsultan Pajak | Informasi dan Jadwal Konsultasi</title>
    </Head>
  )
}

export default HeadComponent
