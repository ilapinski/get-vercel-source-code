import { useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'

const navigation = [
  { name: 'E-Mail Composer', href: '/', current: true },
//   { name: 'Saved', href: '/saved', current: false },
//   { name: 'Editor', href: '/editor', current: false },
]
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

// check if the current page is the same as the href
// if so, set the current property to true
// otherwise, set it to false
function checkCurrentPage(href: string) {
  const router = useRouter()
  const currentPage = router.pathname
  if (currentPage === href || (currentPage === '/' && href === '#')) {
    return true
  } else {
    return false
  }
}

// set the current property of each navigation item
// to true or false depending on the current page
function setCurrentPage() {
  navigation.forEach((item) => {
    item.current = checkCurrentPage(item.href)
  })
}

export default function Header() {
  setCurrentPage();

  return (
    <>
      {/*d
        This example requires updating your template:

        ```
        <html class="h-full bg-zinc-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-zinc-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                    <svg width="32" height="32" viewBox="0 0 50 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M30.9754 17.4185C32.9746 17.4185 34.4147 18.0284 35.2958 19.2652C36.1598 20.4173 36.5834 22.1624 36.5834 24.4836V24.3141C36.5834 26.6014 36.1598 28.3465 35.2958 29.5324C34.4147 30.7354 32.9746 31.3453 30.9754 31.3453L20.9285 31.3792V40.2063C20.9285 40.6468 20.8268 40.9348 20.6066 41.0364C20.3863 41.155 20.2169 41.2059 20.0983 41.2059H17.4044C17.2858 41.2059 17.1164 41.1381 16.8961 41.0364C16.6759 40.9178 16.5742 40.6468 16.5742 40.2063V28.0754C16.5742 27.6349 16.6759 27.3638 16.8961 27.2621C17.1164 27.1435 17.2689 27.0927 17.4044 27.0927H30.213C30.9585 27.0927 31.4837 26.8894 31.7717 26.4489C32.0767 26.0253 32.2461 25.3307 32.2461 24.365C32.2461 23.3992 32.0936 22.7046 31.7717 22.281C31.4837 21.8575 30.9585 21.6372 30.213 21.6372H17.4044C17.2858 21.6372 17.1164 21.5864 16.8961 21.4847C16.6759 21.3661 16.5742 21.095 16.5742 20.6545V18.3673C16.5742 17.9098 16.6759 17.6218 16.8961 17.5371C17.1164 17.4185 17.2689 17.3677 17.4044 17.3677H30.9754V17.4185Z" fill="white"/>
                      <path d="M24.6722 4.05111L46.3078 16.5378V41.5111L24.6722 53.9978L3.03653 41.5111V16.5547L24.6722 4.05111ZM0.105469 14.8435V43.2223L24.6722 57.4033L49.2389 43.2223V14.8435L24.6722 0.662598L0.105469 14.8435Z" fill="white"/>
                    </svg>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-zinc-900 text-white'
                                : 'text-zinc-300 hover:bg-zinc-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>
      </div>
    </>
  )
}
