# Electron Clipboard Listener

Electron helper to listen for when user copies new text to clipboard

## Usage

#### Install

```ts
yarn add -D electron-clipboard-listener
```

#### Basic Setup

```ts
import {
  ListeningClipboard,
  ListeningClipboardEvents,
} from "electron-clipboard-listener";

ListeningClipboard.startWatching();
ListeningClipboard.on(ListeningClipboardEvents.TEXT_UPDATED, (newText) => {
  console.log("Here you will get the new copied text", newText);
});
```

#### Start listening for new clipboard events

```ts
ListeningClipboard.startWatching();
```

| Parameter  | Type     | Description                                                                         |
| :--------- | :------- | :---------------------------------------------------------------------------------- |
| `interval` | `number` | **Optional**. Interval between polling for new text in clipboard. Defaults to 750ms |

#### Get updated clipboard text

```ts
ListeningClipboard.startWatching(event, callback);
```

| Parameter  | Type                       | Description                                                               |
| :--------- | :------------------------- | :------------------------------------------------------------------------ |
| `event`    | `ListeningClipboardEvents` | **Required**. Type of event to listen for, currently supports 'text' only |
| `callback` | `(newText:string) => void` | **Required**. Callback function to get the new copied text                |

## Contributing

Contributions are of course welcome.

## Optimizations

This currently works by simply polling and comparing previous clipboard text with current, it would be so much better if this could tap into a native event.

## Acknowledgements

- [Inspired by](https://github.com/arjun-g/electron-clipboard-extended)
- Main Motivation for creating this: Better performance, less 'extra' data/processing, fixing a critical bug where if a user copys more than 1 image the old package crashes.
