import type { BookmarksType } from "./types";

function Bookmarks() {
  const bookmarks: BookmarksType[] | null = (() => {
    const stored = localStorage.getItem('bookmarks');
    return stored ? (JSON.parse(stored) as BookmarksType[]) : null;
  })();

  return (
    <>
      {
        bookmarks && bookmarks.sort((a,b)=>a.word.localeCompare(b.word.toLowerCase())).map((bookmark) => {
          return (
            <div className="flex m-4 bg-gray-100 border-gray-100 rounded-2xl p-3" key={bookmark.uuid}>
             <span className="text-indigo-400">{`${bookmark.word.charAt(0).toUpperCase()}${bookmark.word.substring(1,bookmark.word.length)}`}</span> . {bookmark.partOfSpeech.charAt(0)} . ({bookmark.phonetic.replace('/','').replace('/','')}): {bookmark.definition}
            </div>
          )
        })
      }
    </>
  )
}

export default Bookmarks