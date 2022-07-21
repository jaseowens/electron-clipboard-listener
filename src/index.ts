import { EventEmitter } from "events";
import { clipboard, Clipboard } from "electron";

//Types
type ListeningClipboardEvents = "new-text";

interface WatchClipboard extends Clipboard {
  startWatching?: (interval?: number) => void;
  on?: (event: ListeningClipboardEvents, cb: (newText: string) => void) => void;
}

//Globals
export const ListeningClipboard: WatchClipboard = clipboard;
let intervalId: NodeJS.Timer;
let currentText: string = clipboard.readText();
const clipboardEvents = new EventEmitter();

//Functions
ListeningClipboard.on = (event, cb) => {
  clipboardEvents.on(event, cb);
};

ListeningClipboard.startWatching = (checkInterval: number = 750) => {
  if (!intervalId)
    intervalId = setInterval(() => {
      let newText = clipboard.readText();
      if (compareText(currentText, newText)) {
        currentText = newText;
        clipboardEvents.emit("new-text", newText);
      }
    }, checkInterval);
};

//Helpers
const compareText = (inputA?: string, inputB?: string) => {
  if (!inputA || !inputB) return false;
  return inputA !== inputB;
};
