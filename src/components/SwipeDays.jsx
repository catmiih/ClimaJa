import { useSwipeable } from "react-swipeable";

export default function SwipeDays({ index, setIndex, children, max }) {
  const handlers = useSwipeable({
    onSwipedLeft: () => setIndex(Math.min(index + 1, max)),
    onSwipedRight: () => setIndex(Math.max(index - 1, 0)),
    trackTouch: true,
  });
  return <div {...handlers}>{children}</div>;
}
