import Image from 'next/image'
import Script from 'next/script'
import appLogo from '@/../public/app_logo.png'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import graphs from '@/graphs'
import getCategories from '@/utils/getCategories'
import GraphsByCategoriesChart from '@/components/graphsByCategoriesChart'
import GraphsByGenerationTypeChart from '@/components/graphsByGenerationTypeChart'

export default function Home() {
  const categories = getCategories()
  return (
    <>
      <div className='flex flex-col text-center  items-center mt-3'>
        <Image src={appLogo} className='mt-4 mb-2' width='150' alt='App Logo' />
        <p className='text-5xl font-bold mb-4'>Graph Repository</p>
        <p className='md:mx-20 mb-6'>
          Discover, analyze and evaluate algorithms with a curated colection of
          standard graph datasets, designed to accelerate research and foster
          innovation in graph-based problem solving.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-2'>
          <div className='flex flex-col items-center'>
            <p className='text-5xl'>{Object.keys(graphs).length}</p>
            <p className='mb-1'>Total Graphs in the Repository</p>
            <Link
              href='/graphs'
              className='text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 rounded-lg px-5 py-2.5 flex items-center'>
              View Graphs
              <ArrowRightIcon aria-hidden='true' className='size-5 ml-2' />
            </Link>
          </div>
          <div className='flex flex-col items-center'>
            <p className='text-5xl'>{Object.keys(categories).length}</p>
            <p className='mb-1'>Total Categories in the Repository</p>
            <Link
              href='/categories'
              className='text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 rounded-lg px-5 py-2.5 flex items-center'>
              View Categories
              <ArrowRightIcon aria-hidden='true' className='size-5 ml-2' />
            </Link>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-2 mt-8'>
        <div className='text-center col-span-1 md:col-span-2'>
          <p className='text-2xl'>Graphs by Categories</p>
          <GraphsByCategoriesChart categories={categories} />
        </div>
        <div className='text-center col-span-1'>
          <p className='text-2xl'>Graphs by Generation Type</p>
          <GraphsByGenerationTypeChart categories={categories} />
        </div>
      </div>
    </>
  )
}
