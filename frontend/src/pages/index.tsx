import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

type Props = {}

const index = (props: Props) => {
  return (
    <div className='pt-60 ml-[42%]'>
            <Link href="/dashboard">
        <Button size="lg" className='text-3xl p-6 ' >
            Go to Users 
        </Button>

            </Link>

    </div>
  )
}

export default index