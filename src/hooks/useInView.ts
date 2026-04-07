import { useRef, useState, useEffect, type RefObject } from "react";

interface UseInViewOptions {
  threshold?: number;
  triggerOnce?: boolean;
  root?: Element | null;
}

export function useInView<T extends Element = HTMLDivElement>(
  options: UseInViewOptions = {}
): { ref: RefObject<T | null>; inView: boolean } {
  const { threshold = 0.5, triggerOnce = true, root = null } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) {
            observer.unobserve(node);
          }
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold, root }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, triggerOnce, root]);

  return { ref, inView };
}
