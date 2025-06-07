import { use, useState } from "react"
import type { DictionaryApiResponse } from "./types";
import { HiArrowNarrowRight } from "react-icons/hi";

function DictionaryData({ dataPromise }: { dataPromise: Promise<DictionaryApiResponse> }) {
  const data = use(dataPromise)[0];

  const [showMeaning, setShowMeaning] = useState<boolean>(false);

  const moreMeanings = () :string[] =>{ 
    let value :string[] = [];
    data.meanings.map((meaning)=>{
      const partOfSpeech = meaning.partOfSpeech;
      meaning.definitions.map((defintion)=>{
        value.push(`${partOfSpeech} - ${defintion.definition}`);
      })
    })        
    return value;
}

  return (
    <>
      <div className="m-[50px] mx-auto w-md text-center rounded-xl border bg-gray-300 border-gray-300">
          <div className="text-3xl mt-[5rem]">
            <span className="font-bold">{data.word.toLocaleUpperCase()}</span> ( <span className="italic">{data.phonetic.replace('/', '').replace('/', '')}</span> )
          </div>
        {
          !showMeaning ?
            <>
              <div className="mx-2 mt-[2.5rem] mb-[5rem] text-start">
                {data.meanings[0].definitions[0].definition}
              </div>
              <div className="text-indigo-500 text-end mb-[1rem] text-2xl cursor-pointer">
                <span onClick={() => setShowMeaning(!showMeaning)}> See More Meanings  <HiArrowNarrowRight style={{ display: 'inline' }} /> </span>
              </div>
            </>
            :
            <div className="text-start p-[2rem]">
              <ol className="list-decimal p-2">
              {moreMeanings().map((meanings,index)=>(
              <li className="p-[0.5rem] marker:font-bold" key={index}>
                {meanings}
              </li>
             ))}
              </ol>

            </div>
        }
      </div >
    </>
  )
}

export default DictionaryData