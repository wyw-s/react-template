import { SHOW_MODAL, HIDE_MODAL, REMOVE_MODAL } from './config';

export const createAction = {
  showModal: (modalId: string, args?: Record<string, unknown>) => ({
    type: SHOW_MODAL,
    payload: {
      modalId,
      args
    }
  }),
  removeModal: (modalId: string) => ({
    type: REMOVE_MODAL,
    payload: {
      modalId
    }
  }),
  hideModal: (modalId: string) => ({
    type: HIDE_MODAL,
    payload: {
      modalId
    }
  })
};

let uid = 0;
export const getUid = () => `_easy_modal_${uid++}`;

export const createPromiseInstance = () => {
  let theResolve!: (args?: unknown) => void;
  let theReject!: (args?: unknown) => void;
  const promise = new Promise((resolve, reject) => {
    theResolve = resolve;
    theReject = reject;
  });
  return [theResolve, theReject, promise] as any;
};
