import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently being read: the first section crossing a band
 * just above the middle of the viewport, or the last section once the page bottom is reached.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    const intersecting = new Set<string>();
    let atBottom = false;

    const update = () => {
      const lastId = ids[ids.length - 1];
      if (atBottom && lastId) {
        setActive(lastId);
        return;
      }
      const current = ids.find((id) => intersecting.has(id));
      if (current) setActive(current);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target.id);
          else intersecting.delete(entry.target.id);
        }
        update();
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    elements.forEach((element) => observer.observe(element));

    // Short final sections never reach the detection band, so the page bottom selects the last one.
    const onScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (bottom !== atBottom) {
        atBottom = bottom;
        update();
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [ids]);

  return active;
}
