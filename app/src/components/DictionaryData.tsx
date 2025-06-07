import { use, useEffect, useState, type ChangeEvent } from "react"
import type { BookmarksType, DictionaryApiResponse } from "./types";
import { HiArrowNarrowRight } from "react-icons/hi";
import { v4 } from "uuid";

function DictionaryData({ dataPromise }: { dataPromise: Promise<DictionaryApiResponse> }) {
  const data = use(dataPromise)[0];
  const [showMeaning, setShowMeaning] = useState<boolean>(false);
  const store = localStorage.getItem('bookmarks');
  const [bookmarks, setBookmarks] = useState<BookmarksType[]>(store ? (JSON.parse(store) as BookmarksType[]) : []);

  const [isBookmark, setIsBookmark] = useState<boolean>(false);

  const moreMeanings = (): string[] => {
    let value: string[] = [];
    data.meanings.map((meaning) => {
      const partOfSpeech = meaning.partOfSpeech;
      meaning.definitions.map((defintion) => {
        value.push(`${partOfSpeech} - ${defintion.definition}`);
      })
    })
    return value;
  }

  const checkBookmark = () =>{
    const wordAvailable = bookmarks.filter((bookmark)=>bookmark.word === data.word);
    setIsBookmark(wordAvailable.length > 0);
  }


  const handleAddBookmark = (e: ChangeEvent<HTMLInputElement>) => {
    setIsBookmark(e.target.checked);
    if (!isBookmark) {
      setBookmarks([...bookmarks, {
        'uuid': v4(),
        'word': data.word,
        'definition': data.meanings[0]?.definitions[0]?.definition
      }])
    }
    else {
      setBookmarks(bookmarks.filter((bookmark) => bookmark.word !== data.word))
    }
  }

  useEffect(() => {
    checkBookmark();
  }, [])
  
  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [isBookmark])


  return (
    <>
      <div className="m-[50px] mx-auto w-md text-center rounded-xl border bg-gray-300 border-gray-300">
        <div className="text-3xl mt-[5rem]">
          <span className="font-bold">{data.word.toLocaleUpperCase()}</span> ( <span className="italic">{data.phonetic.replace('/', '').replace('/', '')}</span> )

          <input onChange={handleAddBookmark} className="ms-4 bg-gray-500" type="checkbox" checked={isBookmark} />
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
                {moreMeanings().map((meanings, index) => (
                  <li className="p-[0.5rem] marker:font-bold" key={index}>
                    {meanings}
                  </li>
                ))}
              </ol>
              <div className="text-indigo-500 text-end mb-[1rem] text-2xl cursor-pointer">
                <span onClick={() => setShowMeaning(!showMeaning)}> Back</span>
              </div>
            </div>
        }
      </div >
    </>
  )
}

export default DictionaryData