import { useEffect, useRef } from "react";

interface useClickOutsideProps {
  handler: () => void;
}

const useClickOutside = ({ handler }: useClickOutsideProps) => {
  const domNode = useRef<HTMLTableDataCellElement | null>(null);
  useEffect(() => {
    let maybeHandler = (e: MouseEvent) => {
      if (domNode.current && !domNode.current.contains(e.target as Node)) {
        handler();
        console.log(domNode.current);
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  }, [handler]);

  return domNode;
};

export default useClickOutside;
