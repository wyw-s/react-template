import React from 'react';

/* istanbul ignore next */
export const context = React.createContext<any>({
  previewUrls: new Map(),
  setPreviewUrls: () => null,
  current: null,
  setCurrent: () => null,
  setShowPreview: () => null,
  setMousePosition: () => null,
  registerImage: () => () => null,
  rootClassName: ''
});
