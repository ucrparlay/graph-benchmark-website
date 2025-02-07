import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { Bars3Icon, ChevronDownIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import appLogo from '@/../public/app_logo.png'
import Link from 'next/link'
import getCategories from '@/utils/getCategories'

const navigation = [
  { name: 'Graphs', href: '/graphs' },
  { name: 'About Us', href: '/about-us' },
]

function CategoriesDropdown() {
  const categories = getCategories()
  return (
    <>
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <MenuButton className='flex items-center gap-x-0.5 text-gray-300 hover:text-white'>
            Categories
            <ChevronDownIcon aria-hidden='true' className='size-4' />
          </MenuButton>
        </div>
        <MenuItems
          transition
          className='absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white divide-y divide-gray-300 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden'>
          <div className='py-1'>
            <MenuItem>
              <Link href='/categories' className='block px-4 py-2'>
                Categories Page
              </Link>
            </MenuItem>
          </div>
          <div className='py-1'>
            {Object.keys(categories).map((category) => (
              <MenuItem key={category}>
                <Link
                  href={`/category/${category}`}
                  className='block px-4 py-2'>
                  {category}
                </Link>
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>
      {navigation.map((item) => (
        <Link
          key={item?.href}
          href={item?.href}
          className='text-gray-300 hover:text-white my-2'>
          {item?.name}
        </Link>
      ))}
    </>
  )
}

export default function Header() {
  return (
    <Disclosure as='nav'>
      <div className='px-2 md:px-6 lg:px-8 py-2 bg-blue-500'>
        <div className='relative flex items-center justify-between'>
          <div className='flex items-center md:hidden'>
            {/* Mobile menu button*/}
            <DisclosureButton className='group relative inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset'>
              <span className='sr-only'>Open main menu</span>
              <Bars3Icon
                aria-hidden='true'
                className='block size-6 group-data-open:hidden'
              />
            </DisclosureButton>
          </div>
          <div className='flex flex-1 items-center justify-start'>
            <Link href='/' className='flex items-center'>
              <Image
                alt='App Logo'
                src={appLogo}
                width={40}
                className='my-2 mr-2'
              />
              <div className='text-white text-xl'>Graph Repository</div>
            </Link>
            <div className='hidden md:ml-6 md:flex items-center space-x-4'>
              <CategoriesDropdown />
            </div>
          </div>
          <div className='pr-2 hidden md:block'>
            <input
              type='text'
              placeholder='Search'
              className='rounded-md bg-white py-1.5 px-3 focus:outline-none'
            />
          </div>
        </div>
      </div>
      <DisclosurePanel className='md:hidden bg-blue-500'>
        <div className='space-y-2 px-4 pt-2 pb-3 flex flex-col'>
          <CategoriesDropdown />
          <input
            type='text'
            placeholder='Search'
            className='rounded-md bg-white py-1.5 px-3 focus:outline-none'
          />
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
