'use client'

import graphs from '@/graphs'
import { usePathname, useSearchParams } from 'next/navigation'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import getCategories from '@/utils/getCategories'

export default function Graphs() {
  const categories = Object.entries(getCategories(graphs)).map(
    ([category, graphs]) => ({ category, count: graphs.length })
  )

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const selectedSortField = searchParams.get('sort_field')
  const selectedsortOrder = searchParams.get('sort_order')

  const createSortURL = (sortField) => {
    const params = new URLSearchParams(searchParams)
    if (sortField === selectedSortField) {
      if (selectedsortOrder === 'asc') {
        params.set('sort_order', 'dsc')
      } else if (selectedsortOrder === 'dsc') {
        params.delete('sort_field')
        params.delete('sort_order')
      } else {
        params.set('sort_field', sortField)
        params.set('sort_order', 'asc')
      }
    } else {
      params.set('sort_field', sortField)
      params.set('sort_order', 'asc')
    }
    return `${pathname}?${params.toString()}`
  }

  const cellClassName = 'p-3'

  const sortedCategories = categories.sort((a, b) => {
    if (selectedSortField && selectedsortOrder) {
      if (
        (selectedsortOrder === 'asc' &&
          a?.[selectedSortField] > b?.[selectedSortField]) ||
        (selectedsortOrder === 'dsc' &&
          a?.[selectedSortField] < b?.[selectedSortField])
      ) {
        return 1
      }
      return -1
    } else {
      return 0
    }
  })

  const SortIcon = ({ sortField, label }) => {
    return (
      <Link
        href={createSortURL(sortField)}
        replace
        className='flex items-center gap-2'>
        {label}
        {sortField && (
          <div>
            <ChevronUpIcon
              aria-hidden='true'
              className={`size-4 ${
                selectedsortOrder === 'asc' && selectedSortField === sortField
                  ? ''
                  : 'text-gray-400'
              }`}
            />
            <ChevronDownIcon
              aria-hidden='true'
              className={`size-4 ${
                selectedsortOrder === 'dsc' && selectedSortField === sortField
                  ? ''
                  : 'text-gray-400'
              }`}
            />
          </div>
        )}
      </Link>
    )
  }
  return (
    <div className='w-full max-w-full overflow-x-auto'>
      <table className='table-auto w-full'>
        <thead>
          <tr className='border-t border-b-2'>
            <th className={cellClassName}>
              <SortIcon sortField='category' label='Category' />
            </th>
            <th className={cellClassName}>
              <SortIcon sortField='count' label='Graphs Count' />
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedCategories.map(({ category, count }) => (
            <tr key={category} className='border-b hover:bg-gray-100'>
              <td className={cellClassName}>
                <Link
                  href={`/category/${category}`}
                  className='text-blue-500 underline'>
                  {category}
                </Link>
              </td>
              <td className={cellClassName}>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
