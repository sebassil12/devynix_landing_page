'use client'
import React from 'react';
import Image from "next/image";
import LogoIcon from '@public/images/logos/devynix-mark.svg'
import Link from 'next/link';
const Logo = () => {
  return (
   <Link href={'/'}>
      <Image src={LogoIcon} alt="Devynix" width={40} height={40} />
    </Link>
  )
}

export default Logo
