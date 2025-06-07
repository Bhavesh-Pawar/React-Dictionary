import { Suspense, useState } from "react";
import DictionaryData from "./DictionaryData";

function Dictionary() {
    const fetchData = async (word: string) => {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        return await response.json();
    }

    const [word, setWord] = useState<string>("");
    const [searchWord, setSearchWord] = useState<string>("");

    return (
        <>
            <div className="text-center">
                <h1 className="text-3xl font-bold">Dicty</h1>
                <input className="bg-gray-500/50 w-md rounded-3xl text-center focus:border-gray-500/50 placeholder:text-white m-2 p-4 focus-visible:border-white"
                    placeholder="Search..."
                    type="text" value={word} onChange={(e) => setWord(e.target.value)} />
            </div>
            <div className="ms-2 text-center">
                <button className="me-4 cursor-pointer p-2 bg-sky-500 rounded text-white" onClick={() => setSearchWord(word)}>Search Word</button>
                <button className="me-4 cursor-pointer p-2 bg-orange-500 rounded text-white" onClick={() => { setSearchWord(''); setWord('') }}>Reset Word</button>
            </div>
            <Suspense fallback={<>Searching the word...</>}>
                {
                    searchWord ? <DictionaryData dataPromise={fetchData(searchWord)} /> : <></>
                }

            </Suspense>
        </>
    )
}

export default Dictionary