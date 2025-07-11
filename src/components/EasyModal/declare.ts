export interface EasyModalState {
  id: string;
  args: Record<string, unknown>;
  open?: boolean;
  delayVisible?: boolean;
}

export interface EasyModalStore {
  [key: string]: EasyModalState;
}

export interface EasyModalAction {
  type: string;
  payload: {
    modalId: string;
    args?: Record<string, unknown>;
  };
}

export type Already = Record<string, boolean>;

type PromiseType = {
  resolve: (args: unknown) => void;
  reject: (args: unknown) => void;
  promise: Promise<unknown>;
};

export type EasyModalCallbacks = Record<string, PromiseType>;

export interface anyProps {
  [key: string]: any;
}
