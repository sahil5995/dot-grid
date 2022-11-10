import { useRef, useEffect } from "react";
import "./Tile.css";

type ItemProps = {
  id: number;
  tabIndex: number;
};

function Tile(props: ItemProps) {
  const { tabIndex } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.focus()
  }, [ref]);

  return (
    <div className="tile">
      <div
        ref={ref}
        tabIndex={tabIndex}
      />
      {tabIndex === 0 &&
        <h1 className="dot">.</h1>
      }
    </div>
  );
}

export default Tile;