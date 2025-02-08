import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Pagination({ totalPages, currentPage, createPageURL }) {
  const paginationButtons = Array.from({ length: totalPages }, (_, i) => ({
    key: i + 1,
    label: i + 1,
    href: createPageURL(i + 1),
    active: currentPage === i + 1,
  }))

  if (currentPage < totalPages - 3) {
    paginationButtons.splice(currentPage + 1, totalPages - currentPage - 3, {
      key: '...2',
      label: '...',
    })
  }

  if (currentPage > 4) {
    paginationButtons.splice(2, currentPage - 4, {
      key: '...1',
      label: '...',
    })
  }

  return (
    <nav
      className='isolate inline-flex -space-x-px rounded-md shadow-xs'
      aria-label='Pagination'>
      <Link
        replace
        disabled={currentPage === 1}
        href={currentPage === 1 ? '' : createPageURL(currentPage - 1)}
        className='relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400'>
        <span className='sr-only'>Previous</span>
        <ChevronLeftIcon aria-hidden='true' className='size-4' />
      </Link>
      {paginationButtons.map(({ key, label, disabled, active, href }) =>
        label === '...' ? (
          <span
            key={key}
            className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 bg-white border border-gray-200'>
            ...
          </span>
        ) : (
          <Link
            replace
            key={key}
            href={href}
            disabled={disabled}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
              active
                ? 'text-white bg-blue-500 hover:bg-blue-600'
                : 'text-gray-900 bg-white hover:bg-gray-100'
            } border border-gray-200 disabled:bg-gray-100 disabled:text-gray-400`}>
            {label}
          </Link>
        )
      )}
      <Link
        replace
        type='button'
        disabled={currentPage === totalPages}
        href={currentPage === totalPages ? '' : createPageURL(currentPage + 1)}
        className='relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 disabled:bg-gray-100  disabled:text-gray-400'>
        <span className='sr-only'>Next</span>
        <ChevronRightIcon aria-hidden='true' className='size-4' />
      </Link>
    </nav>
  )
}
