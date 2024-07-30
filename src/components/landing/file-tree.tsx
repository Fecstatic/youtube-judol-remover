'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { File, Folder, Tree } from '@/components/ui/file-tree';

const ELEMENTS = [
  {
    id: '1',
    isSelectable: true,
    name: 'src',
    children: [
      {
        id: '2',
        isSelectable: true,
        name: 'app',
        children: [
          {
            id: '3',
            isSelectable: true,
            name: '[locale]',
            children: [
              {
                id: '4',
                isSelectable: true,
                name: '(auth)',
              },
              {
                id: '5',
                isSelectable: true,
                name: '(unauth)',
              },
            ],
          },
          {
            id: '6',
            isSelectable: true,
            name: 'page.tsx',
          },
        ],
      },
      {
        id: '7',
        isSelectable: true,
        name: 'components',
        children: [
          {
            id: '8',
            isSelectable: true,
            name: 'header.tsx',
          },
          {
            id: '9',
            isSelectable: true,
            name: 'footer.tsx',
          },
        ],
      },
      {
        id: '10',
        isSelectable: true,
        name: 'lib',
        children: [
          {
            id: '11',
            isSelectable: true,
            name: 'utils.ts',
          },
        ],
      },
    ],
  },
];

export function FileTree() {
  return (
    <div className="relative flex items-center justify-between gap-2 overflow-hidden">
      <div className="w-1/2">
        <Tree
          className="overflow-hidden rounded-md bg-background p-2"
          initialSelectedId="7"
          initialExpandedItems={[
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
          ]}
          elements={ELEMENTS}
        >
          <Folder element="src" value="1">
            <Folder value="2" element="app">
              <Folder value="3" element="[locale]">
                <Folder value="4" element="(auth)">
                  <File value="4">
                    <p>page.tsx</p>
                  </File>
                </Folder>
                <Folder value="5" element="(unauth)">
                  <File value="6">
                    <p>login.tsx</p>
                  </File>
                </Folder>
              </Folder>
            </Folder>
            <Folder value="5" element="components">
              <Folder value="6" element="ui">
                <File value="7">
                  <p>button.tsx</p>
                </File>
              </Folder>
              <File value="8">
                <p>header.tsx</p>
              </File>
              <File value="9">
                <p>footer.tsx</p>
              </File>
            </Folder>
          </Folder>
        </Tree>
      </div>
      <motion.div
        initial={{ opacity: 0.6 }}
        whileHover={{
          scale: 1.1,
          transition: { duration: 1 },
        }}
        whileTap={{ scale: 0.9 }}
        whileInView={{ opacity: 1 }}
        animate={{ opacity: 1, scale: [1, 1.1, 1] }}
        className="absolute -top-2 right-0 w-1/2"
      >
        <Image
          src="/code/login.svg"
          alt="Boilerplate"
          width={500}
          height={500}
        />
      </motion.div>
    </div>
  );
}
