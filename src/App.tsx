import { keyboardKey } from "@testing-library/user-event";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import Tile from "./components/Tile";
import tiles from './tiles.json'

function App() {

  const tilesRef = useRef<HTMLElement>(null);
  const [cursor, setCursor] = useState(1);
  const numberOfColumns = 4;
  const totalNumberOfTiles = tiles.length;

  useEffect(() => {

    const handleKey = (event: keyboardKey) => {
      if (event.key === "ArrowRight") {
        setCursor((prevCursor) => {
          if (prevCursor === totalNumberOfTiles) {
            return totalNumberOfTiles;
          }
          return prevCursor + 1;
        });
      }

      if (event.key === "ArrowLeft") {
        setCursor((prevCursor) => {
          if (prevCursor === 1) {
            return 1;
          }
          return prevCursor - 1;
        });
      }

      if (event.key === "ArrowDown") {
        setCursor((prevCursor) => {
          if (prevCursor + numberOfColumns > totalNumberOfTiles) {
            return prevCursor;
          }
          return prevCursor + numberOfColumns;
        });
      }

      if (event.key === "ArrowUp") {
        setCursor((prevCursor) => {
          if (prevCursor - numberOfColumns <= 0) {
            return prevCursor;
          }
          return prevCursor - numberOfColumns;
        });
      }
    };

    if (tilesRef.current) {
      const currentCursor = tilesRef.current;
      currentCursor.addEventListener("keydown", handleKey);
      return () => currentCursor.removeEventListener("keydown", handleKey);
    }
  }, [totalNumberOfTiles, numberOfColumns]);


  return (
    <main ref={tilesRef} className="main">
      <section className="tiles">
        {tiles.map((tiles) => {
          const tabIndex = cursor === tiles.id ? 0 : -1;
          return <Tile id={tiles.id} tabIndex={tabIndex} />;
        })}
      </section>
    </main>
  );
}

export default App;