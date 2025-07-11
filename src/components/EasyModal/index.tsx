import React, { useReducer, useContext, useEffect, useCallback } from 'react';
import { EasyModalStore, Already, EasyModalCallbacks, EasyModalAction } from './declare';
import { SHOW_MODAL, HIDE_MODAL, REMOVE_MODAL } from './config';
import { getUid, createAction, createPromiseInstance } from './util';

const symModalId = Symbol('EasyModalId');
const EasyModalIdContext = React.createContext<string>('');
const initialState: EasyModalStore = {};
const EasyModalContext = React.createContext<EasyModalStore>(initialState);
const ALREADY_MOUNTED: Already = {};
const MODAL_REGISTRY: {
  [id: string]: {
    comp: React.FC<any>;
    props?: Record<string, unknown>;
  };
} = {};
const modalCallbacks: EasyModalCallbacks = {};
const hideModalCallbacks: EasyModalCallbacks = {};
let dispatch: React.Dispatch<EasyModalAction> = () => {};

// eslint-disable-next-line default-param-last
const reducer = (state: EasyModalStore = initialState, action?: EasyModalAction) => {
  switch (action?.type) {
    case SHOW_MODAL: {
      const { modalId, args } = action.payload;
      return {
        ...state,
        [modalId]: {
          ...state[modalId],
          id: modalId,
          args,
          open: !!ALREADY_MOUNTED[modalId],
          delayVisible: !ALREADY_MOUNTED[modalId]
        }
      };
    }
    case HIDE_MODAL: {
      const { modalId } = action.payload;
      if (!state[modalId]) return state;
      return {
        ...state,
        [modalId]: {
          ...state[modalId],
          open: false
        }
      };
    }
    case REMOVE_MODAL: {
      const { modalId } = action.payload;
      const newState = { ...state };
      delete newState[modalId];
      return newState;
    }
    default:
      return state;
  }
};

export const register = <T extends React.FC<any>>(id: string, comp: T, props?: any): void => {
  if (!MODAL_REGISTRY[id]) {
    MODAL_REGISTRY[id] = { comp, props };
  } else {
    MODAL_REGISTRY[id].props = props;
  }
};

export const unregister = (id: string): void => {
  delete MODAL_REGISTRY[id];
};

const getModalId = (modal: string | React.FC<any>): string => {
  if (typeof modal === 'string') return modal as string;
  // @ts-ignore
  if (!modal[symModalId]) {
    // @ts-ignore
    modal[symModalId] = getUid();
  }
  // @ts-ignore
  return modal[symModalId];
};

export const show = <T extends React.FC<any>>(
  modal: T,
  args?: Omit<React.ComponentProps<T>, 'defaultVisible' | 'id'>
) => {
  const modalId = getModalId(modal);
  if (typeof modal !== 'string' && !MODAL_REGISTRY[modalId]) {
    register(modalId, modal);
  }
  dispatch(createAction.showModal(modalId, args));
  if (!modalCallbacks[modalId]) {
    const [theResolve, theReject, promise] = createPromiseInstance();
    modalCallbacks[modalId] = {
      resolve: theResolve,
      reject: theReject,
      promise
    };
  }
  return modalCallbacks[modalId].promise;
};

export function hide(modal: string | React.FC<any>) {
  const modalId = getModalId(modal);
  dispatch(createAction.hideModal(modalId));
  delete modalCallbacks[modalId];
  if (!hideModalCallbacks[modalId]) {
    const [theResolve, theReject, promise] = createPromiseInstance();
    hideModalCallbacks[modalId] = {
      resolve: theResolve,
      reject: theReject,
      promise
    };
  }
  return hideModalCallbacks[modalId].promise;
}
export const remove = (modalId: string): void => {
  dispatch(createAction.removeModal(modalId));
  delete modalCallbacks[modalId];
  delete hideModalCallbacks[modalId];
};

export const useModal = (modal?: any, args?: any) => {
  const modals = useContext(EasyModalContext);
  const contextModalId = useContext(EasyModalIdContext);
  let modalId: string;
  const isUseComponent = modal && typeof modal !== 'string';
  if (!modal) {
    modalId = contextModalId;
  } else {
    modalId = getModalId(modal);
  }
  const mid = modalId;

  useEffect(() => {
    if (isUseComponent && !MODAL_REGISTRY[mid]) {
      register(mid, modal, args);
    }
  }, [isUseComponent, mid, modal, args]);

  const modalInfo = modals[mid];

  const showCallback = useCallback((_args?: Record<string, any>) => show(mid as any, _args), [mid]);
  const hideCallback = useCallback(() => hide(mid), [mid]);
  const removeCallback = useCallback(() => remove(mid), [mid]);
  const resolveCallback = useCallback(
    (_args?: unknown) => {
      modalCallbacks[mid]?.resolve(_args);
      delete modalCallbacks[mid];
    },
    [mid]
  );
  const rejectCallback = useCallback(
    (_args?: unknown) => {
      modalCallbacks[mid]?.reject(_args);
      delete modalCallbacks[mid];
    },
    [mid]
  );
  const resolveHide = useCallback(
    (_args?: unknown) => {
      hideModalCallbacks[mid]?.resolve(_args);
      delete hideModalCallbacks[mid];
    },
    [mid]
  );

  return {
    id: mid,
    args: modalInfo?.args,
    open: !!modalInfo?.open,
    show: showCallback,
    hide: hideCallback,
    remove: removeCallback,
    resolve: resolveCallback,
    reject: rejectCallback,
    resolveHide
  };
};
export const create = <P,>(Com: React.FC<P>): React.FC<P & { defaultVisible: string; id: string }> => {
  return ({ defaultVisible, id, ...props }) => {
    const { args, show: _show } = useModal(id);
    const modals = useContext(EasyModalContext);
    const shouldMount = !!modals[id];

    useEffect(() => {
      if (defaultVisible) {
        _show();
      }
      ALREADY_MOUNTED[id] = true;
      return () => {
        delete ALREADY_MOUNTED[id];
      };
    }, [id, _show, defaultVisible]);

    const delayVisible = modals[id]?.delayVisible;
    useEffect(() => {
      if (delayVisible) {
        _show(args);
      }
    }, [delayVisible, args, _show]);

    if (!shouldMount) return null;

    return (
      <EasyModalIdContext.Provider value={id}>
        <Com {...(props as P)} {...args} />
      </EasyModalIdContext.Provider>
    );
  };
};

const EasyModalPlaceholder: React.FC<any> = () => {
  const modals = useContext(EasyModalContext);
  const visibleModalIds = Object.keys(modals).filter((id) => !!modals[id]);
  visibleModalIds.forEach((id) => {
    if (!MODAL_REGISTRY[id] && !ALREADY_MOUNTED[id]) {
      // eslint-disable-next-line no-console
      console.warn(`modal 未注册 ${id}`);
      return '';
    }
  });
  const toRender = visibleModalIds.map((id) => ({
    id,
    ...MODAL_REGISTRY[id]
  }));

  return (
    <>
      {toRender.map((t) => (
        <t.comp key={t.id} id={t.id} {...t.props} />
      ))}
    </>
  );
};

const EasyModalProvider: React.FC<React.PropsWithChildren<any>> = ({ children }) => {
  // @ts-ignore
  const [modals, _dispatch] = useReducer(reducer, initialState);
  dispatch = _dispatch;
  return (
    <EasyModalContext.Provider value={modals}>
      {children}
      <EasyModalPlaceholder />
    </EasyModalContext.Provider>
  );
};

const EasyModal = {
  Provider: EasyModalProvider,
  register,
  create,
  show,
  hide,
  useModal,
  remove
};

export default EasyModal;
