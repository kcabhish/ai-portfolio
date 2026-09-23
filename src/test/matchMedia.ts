type Listener = (event: MediaQueryListEvent) => void;

const listeners = new Map<string, Set<Listener>>();
let matchingQueries = new Set<string>();

function install() {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: (query: string): MediaQueryList => {
      const queryListeners = listeners.get(query) ?? new Set<Listener>();
      listeners.set(query, queryListeners);

      return {
        media: query,
        get matches() {
          return matchingQueries.has(query);
        },
        onchange: null,
        addEventListener: (_type: string, listener: Listener) => queryListeners.add(listener),
        removeEventListener: (_type: string, listener: Listener) => queryListeners.delete(listener),
        addListener: (listener: Listener) => queryListeners.add(listener),
        removeListener: (listener: Listener) => queryListeners.delete(listener),
        dispatchEvent: () => true,
      } as unknown as MediaQueryList;
    },
  });
}

/** Sets whether a media query matches and notifies subscribed listeners. */
export function setMediaQuery(query: string, matches: boolean) {
  if (matches) matchingQueries.add(query);
  else matchingQueries.delete(query);

  listeners
    .get(query)
    ?.forEach((listener) => listener({ matches, media: query } as MediaQueryListEvent));
}

export function resetMatchMedia() {
  listeners.clear();
  matchingQueries = new Set();
  install();
}

install();
