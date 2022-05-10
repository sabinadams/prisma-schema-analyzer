// https://github.com/storybookjs/react-inspector
import { SchemaForm } from '~/components/schema-form'
import { useFetcher } from '@remix-run/react';
import { SchemaOutput } from '~/components/schema-output';

export default function Index() {
  const fetcher = useFetcher()
  return (
    <div className="h-screen w-full bg-gray-900 font-mono flex flex-col pt-8">
      <p className="text-gray-900 p-2 relative font-extrabold text-4xl text-center bg-gradient-to-r from-green-400 to-blue-500 ">
        Prisma Schema Analyzer
        <span className="absolute right-4 text-sm top-5">
          Made with ❤️ by&nbsp;
          <a className="text-teal-300 animate-pulse" href="https://www.twitter.com/sabinthedev" target="_blank">@sabinthedev</a>
        </span>
      </p>
      <div className="flex gap-x-10 h-full w-full p-12">
        <div className="h-full flex-1 rounded-xl overflow-scroll">
          <SchemaForm fetcher={fetcher} />
        </div>
        <div className="flex items-center">
          <button type="submit" form="schema-form" className="bg-teal-400 transition duration-700 ease-in-out hover:-translate-y-2 bg-gradient-to-r from-green-400 to-blue-500 hover:opacity-75 hover:drop-shadow-xl rounded-full w-24 h-24 flex justify-center items-center relative font-bold text-slate-800">
            Process
          </button>
        </div>
        <div className={`
        ${fetcher?.data?.error && 'flex justify-center items-center drop-shadow-xl animate-pulse text-center'}
        h-full flex-1  rounded-xl overflow-scroll p-4 bg-slate-800 px-8
      `}>
          {
            fetcher?.data?.error ? (
              <p className="font-extrabold text-2xl m-0 p-0 text-rose-400">{fetcher.data.error}</p>
            ) : fetcher?.data && <SchemaOutput dmmf={fetcher?.data} />
          }
        </div>
      </div>
    </div>
  );
}