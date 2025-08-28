type Alt = {
  emit: (event: string, ...args: any[]) => void;
  on: (event: string, cb: (...args: any[]) => void) => void;
};

declare global {
  interface Window {
    alt?: Alt;
  }
}

export const alt = window.alt ?? {
  emit: (event: string, ...args: any[]) => {
    console.log("alt.emit", event, args);
  },
  on: (event: string, cb: (...args: any[]) => void) => {
    console.log("alt.on", event, cb);
  }
};
