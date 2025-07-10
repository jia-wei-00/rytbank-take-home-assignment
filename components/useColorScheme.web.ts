// NOTE: The default React Native styling doesn't support server rendering.
// Server rendered styles should not change between the first render of the HTML
// and the first render on the client. Typically, web developers will use CSS media queries
// to render different styles on the client and server, these aren't directly supported in React Native
// but can be achieved using a styling library like Nativewind.

import { useState, useEffect } from "react";

export function useColorScheme() {
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check if we're running in a browser environment
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      // Set initial value
      setColorScheme(mediaQuery.matches ? "dark" : "light");

      // Listen for changes
      const handleChange = (event: MediaQueryListEvent) => {
        setColorScheme(event.matches ? "dark" : "light");
      };

      mediaQuery.addEventListener("change", handleChange);

      // Cleanup listener on unmount
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  return colorScheme;
}
