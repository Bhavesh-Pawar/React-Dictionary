import type { BookmarksType } from "./types";

function Bookmarks() {
  const bookmarks: BookmarksType[] | null = (() => {
    const stored = localStorage.getItem('bookmarks');
    return stored ? (JSON.parse(stored) as BookmarksType[]) : null;
  })();

  return (
    <>
      {
        bookmarks && bookmarks.map((bookmark) => {
          return (
            <div key={bookmark.uuid}>
              {bookmark.word}
            </div>
          )
        })
      }
    </>
  )
}

export default Bookmarks