import Head from 'next/head'
import MainLayout from '@/components/MainLayout/MainLayout'

export default function Home() {
  return (
    <MainLayout>
      <Head>
        <title>TradeLink | App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </Head>
      <p className='text-2xl'>TradeLink</p>
    </MainLayout>
  )
}
