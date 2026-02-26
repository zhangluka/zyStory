"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

interface TypewriterSoundContextValue {
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  toggleSound: () => void;
}

const TypewriterSoundContext =
  createContext<TypewriterSoundContextValue | null>(null);

export function TypewriterSoundProvider({ children }: { children: ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const toggleSound = useCallback(() => {
    setSoundEnabled((v) => !v);
  }, []);

  return (
    <TypewriterSoundContext.Provider
      value={{ soundEnabled, setSoundEnabled, toggleSound }}
    >
      {children}
    </TypewriterSoundContext.Provider>
  );
}

export function useTypewriterSound() {
  const ctx = useContext(TypewriterSoundContext);
  return (
    ctx ?? {
      soundEnabled: false,
      setSoundEnabled: () => {},
      toggleSound: () => {},
    }
  );
}
