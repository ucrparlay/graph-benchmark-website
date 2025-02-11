'use client'

import Pagination from '@/components/Pagination'
import { PAGE_SIZE } from '@/constants'
import { usePathname, useSearchParams } from 'next/navigation'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function GraphTable({ graphs }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const selectedSortField = searchParams.get('sort_field')
  const selectedsortOrder = searchParams.get('sort_order')

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

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
  const totalItems = graphs.length

  const cellClassName = 'p-3'

  const sortedGraphs = graphs.sort((a, b) => {
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

  const SortFieldHeader = ({ sortField, label }) => {
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
              <SortFieldHeader sortField='title' label='Graph Name' />
            </th>
            <th className={cellClassName}>Categories</th>
            <th className={cellClassName}>
              <SortFieldHeader
                sortField='generation_type'
                label='Generation Type'
              />
            </th>
            <th className={cellClassName}>
              <SortFieldHeader sortField='symmetric' label='Symmetric' />
            </th>
            <th className={cellClassName}>
              <SortFieldHeader sortField='weighted' label='Weighted' />
            </th>
            <th className={cellClassName}>
              <SortFieldHeader sortField='vertices_count' label='Vertices' />
            </th>
            <th className={cellClassName}>
              <SortFieldHeader sortField='edges_count' label='Edges' />
            </th>
            <th className={cellClassName}>
              <SortFieldHeader sortField='density' label='Density' />
            </th>
            <th className={cellClassName}>
              <SortFieldHeader sortField='avg_degree' label='Average Degree' />
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedGraphs
            .slice(PAGE_SIZE * (currentPage - 1), PAGE_SIZE * currentPage)
            .map((graph) => (
              <tr key={graph?.path} className='border-b hover:bg-gray-100'>
                <td className={cellClassName}>
                  <Link
                    key={graph?.path}
                    href={`/graph/${graph?.path}`}
                    className='text-blue-500 underline'>
                    {graph?.title}
                  </Link>
                </td>
                <td className={`${cellClassName} flex flex-col`}>
                  {graph?.categories?.map((category) => (
                    <Link
                      key={`${graph?.path} - ${category}`}
                      href={`/category/${category}`}
                      className='text-blue-500 underline'>
                      {category}
                    </Link>
                  ))}
                </td>
                <td className={cellClassName}>{graph?.generation_type}</td>
                <td className={cellClassName}>
                  {graph?.symmetric ? 'Yes' : 'No'}
                </td>
                <td className={cellClassName}>
                  {graph?.weighted ? 'Yes' : 'No'}
                </td>
                <td className={cellClassName}>{graph?.vertices_count}</td>
                <td className={cellClassName}>{graph?.edges_count}</td>
                <td className={cellClassName}>{graph?.density?.toFixed(6)}</td>
                <td className={cellClassName}>{graph?.avg_degree}</td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td className={cellClassName} colSpan={9}>
              <div className='flex items-center justify-between'>
                <div>
                  Showing <strong>{PAGE_SIZE * (currentPage - 1) + 1}</strong>{' '}
                  to{' '}
                  <strong>
                    {Math.min(PAGE_SIZE * currentPage, totalItems)}
                  </strong>{' '}
                  of <strong>{totalItems}</strong> items
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(totalItems / PAGE_SIZE)}
                  createPageURL={createPageURL}
                />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
