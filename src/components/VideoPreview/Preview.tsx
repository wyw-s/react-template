import React, { useEffect, useCallback, useContext } from 'react';
import type { DialogProps as IDialogPropTypes } from 'rc-dialog';
import Dialog from 'rc-dialog';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import KeyCode from 'rc-util/lib/KeyCode';
import Operations from './Operations';
import { context } from './Context';

export interface PreviewProps extends Omit<IDialogPropTypes, 'onClose'> {
  onClose?: (e: React.SyntheticEvent<Element>) => void;
  src?: string;
  alt?: string;
  rootClassName?: string;
  countRender?: (current: number, total: number) => string;
}

const Preview: React.FC<PreviewProps> = (props) => {
  const {
    prefixCls,
    src,
    alt,
    onClose,
    visible,
    rootClassName,
    getContainer,
    countRender,
    transitionName = 'zoom',
    maskTransitionName = 'fade',
    ...restProps
  } = props;

  const { previewUrls, current, setCurrent } = useContext(context);
  const previewGroupCount = previewUrls.size;
  const previewUrlsKeys = Array.from(previewUrls.keys());
  const currentPreviewIndex = previewUrlsKeys.indexOf(current);
  const combinationSrc = src;

  const onAfterClose = () => {};

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!visible) return;

      if (event.keyCode === KeyCode.LEFT) {
        if (currentPreviewIndex > 0) {
          setCurrent(previewUrlsKeys[currentPreviewIndex - 1]);
        }
      } else if (event.keyCode === KeyCode.RIGHT) {
        if (currentPreviewIndex < previewGroupCount - 1) {
          setCurrent(previewUrlsKeys[currentPreviewIndex + 1]);
        }
      }
    },
    [currentPreviewIndex, previewGroupCount, previewUrlsKeys, setCurrent, visible]
  );

  useEffect(() => {
    let onTopMouseUpListener: { remove: () => void };
    let onTopMouseMoveListener: { remove: () => void };

    const onKeyDownListener = addEventListener(window, 'keydown', onKeyDown, false);

    return () => {
      onKeyDownListener.remove();
      onTopMouseUpListener?.remove();
      onTopMouseMoveListener?.remove();
    };
  }, [visible, onKeyDown]);

  return (
    <>
      <Dialog
        transitionName={transitionName}
        maskTransitionName={maskTransitionName}
        closable={false}
        keyboard
        prefixCls={prefixCls}
        onClose={onClose}
        visible={visible}
        rootClassName={rootClassName}
        getContainer={getContainer}
        {...restProps}
        destroyOnClose
        afterClose={onAfterClose}
      >
        <div className={`${prefixCls}-img-wrapper`}>
          <video width={props.width} height={props.height} className={`${prefixCls}-img`} controls>
            <source src={combinationSrc} />
          </video>
        </div>
      </Dialog>
      <Operations
        visible={visible}
        maskTransitionName={maskTransitionName}
        getContainer={getContainer}
        prefixCls={prefixCls}
        rootClassName={rootClassName}
        onClose={onClose}
      />
    </>
  );
};

export default Preview;
