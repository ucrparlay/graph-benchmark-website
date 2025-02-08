'use client'

import graphs from '@/graphs'
import GraphTable from '@/components/GraphTable'
import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import elasticlunr from 'elasticlunr'

export default function Search() {
  const searchParams = useSearchParams()

  const queryText = useMemo(() => searchParams.get('query'), [searchParams])

  const searchResults = useMemo(() => {
    const index = elasticlunr(function () {
      this.addField('title')
      this.addField('categories')
      this.addField('about')
      this.setRef('path')
    })

    Object.values(graphs).forEach((graph) => {
      index.addDoc({
        title: graph?.title?.replaceAll('_', '-'),
        categories: graph?.categories?.join(' '),
        about: graph?.about,
        path: graph?.path,
      })
    })
    const searchResults = index.search(queryText?.replaceAll('_', '-'), {
      fields: {
        title: { boost: 2 },
        categories: { boost: 1 },
        about: { boost: 1 },
      },
      expand: true,
    })

    return searchResults.map((result) => graphs[result.ref])
  }, [queryText])

  return (
    <>
      <div className='text-3xl mb-4'>
        Search results for <strong>{queryText}</strong>
      </div>
      <GraphTable graphs={searchResults} />
    </>
  )
}
