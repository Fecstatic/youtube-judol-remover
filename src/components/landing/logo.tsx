import Image from 'next/image';
import Link from 'next/link';

import { AppConfig } from '@/utils/AppConfig';

const Logo = () => (
  <Link
    href="/"
    className="flex content-center items-center text-xl font-semibold"
  >
    <Image
      src="/logo.svg"
      className="text-black dark:text-white"
      alt={AppConfig.name}
      width="32"
      height="32"
    />
    {AppConfig.name}
  </Link>
);

export { Logo };
