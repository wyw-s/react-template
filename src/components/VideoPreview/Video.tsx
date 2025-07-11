import * as React from 'react';
import { useState } from 'react';
import cn from 'classnames';
import { getOffset } from 'rc-util/lib/Dom/css';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import type { GetContainer } from 'rc-util/lib/PortalWrapper';
import type { IDialogPropTypes } from 'rc-dialog/lib/IDialogPropTypes';
import Preview from './Preview';
import { context } from './Context';

type discardField = 'mask' | 'visible' | 'closable' | 'prefixCls' | 'onClose' | 'afterClose' | 'wrapClassName';

export interface ImagePreviewType extends Omit<IDialogPropTypes, discardField> {
  src?: string;
  visible?: boolean;
  onVisibleChange?: (value: boolean, prevValue: boolean, currentIndex?: number) => void;
  getContainer?: GetContainer | false;
  mask?: React.ReactNode;
  maskClassName?: string;
  scaleStep?: number;
}

let uuid = 0;

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'placeholder' | 'onClick'> {
  // Original
  src?: string;
  poster?: string;
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
  prefixCls?: string;
  previewPrefixCls?: string;
  placeholder?: React.ReactNode;
  fallback?: string;
  rootClassName?: string;
  preview?: boolean | ImagePreviewType;
  /**
   * @deprecated since version 3.2.1
   */
  onPreviewClose?: (value: boolean, prevValue: boolean) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

type ImageStatus = 'normal' | 'error' | 'loading';

function isImageValid(poster: string | undefined) {
  return new Promise((resolve) => {
    const img = document.createElement('img');
    img.onerror = () => resolve(false);
    img.onload = () => resolve(true);
    if (typeof poster === 'string') {
      img.src = poster;
    }
  });
}

const ImageInternal: React.FC<ImageProps> = ({
  poster: imgSrc,
  alt,
  onPreviewClose: onInitialPreviewClose,
  prefixCls = 'video-preview',
  previewPrefixCls = `${prefixCls}-preview`,
  placeholder,
  fallback,
  width,
  height,
  style,
  preview = true,
  className,
  onClick,
  onError,
  wrapperClassName,
  wrapperStyle,
  rootClassName,

  // Img
  crossOrigin,
  decoding,
  loading,
  referrerPolicy,
  sizes,
  srcSet,
  useMap,
  draggable,
  ...otherProps
}) => {
  const isCustomPlaceholder = placeholder && placeholder !== true;
  const {
    src: previewSrc,
    visible: previewVisible = undefined,
    onVisibleChange: onPreviewVisibleChange = onInitialPreviewClose,
    getContainer: getPreviewContainer = undefined,
    mask: previewMask,
    maskClassName,
    scaleStep,
    ...dialogProps
  }: ImagePreviewType = typeof preview === 'object' ? preview : {};
  const src = previewSrc ?? imgSrc;
  const isControlled = previewVisible !== undefined;
  const [isShowPreview, setShowPreview] = useMergedState(!!previewVisible, {
    value: previewVisible,
    onChange: onPreviewVisibleChange
  });
  const [status, setStatus] = useState<ImageStatus>(isCustomPlaceholder ? 'loading' : 'normal');
  const [mousePosition, setMousePosition] = useState<null | { x: number; y: number }>(null);
  const isError = status === 'error';
  const {
    isPreviewGroup,
    setCurrent,
    setShowPreview: setGroupShowPreview,
    setMousePosition: setGroupMousePosition,
    registerImage
  } = React.useContext(context);
  const [currentId] = React.useState<number>(() => {
    uuid += 1;
    return uuid;
  });
  const canPreview = !!preview;

  const isLoaded = React.useRef(false);

  const onLoad = () => {
    setStatus('normal');
  };

  const onPreview: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!isControlled) {
      const { left, top } = getOffset(e.target);

      if (isPreviewGroup) {
        setCurrent(currentId);
        setGroupMousePosition({
          x: left,
          y: top
        });
      } else {
        setMousePosition({
          x: left,
          y: top
        });
      }
    }

    if (isPreviewGroup) {
      setGroupShowPreview(true);
    } else {
      setShowPreview(true);
    }

    onClick?.(e);
  };

  const onPreviewClose = (e: React.SyntheticEvent<Element>) => {
    e.stopPropagation();
    setShowPreview(false);
    if (!isControlled) {
      setMousePosition(null);
    }
  };

  React.useEffect(() => {
    isImageValid(imgSrc).then((isValid) => {
      if (!isValid) {
        setStatus('error');
      }
    });
  }, [imgSrc]);

  React.useEffect(() => {
    const unRegister = registerImage(currentId, imgSrc);

    return unRegister;
  }, []);

  React.useEffect(() => {
    registerImage(currentId, imgSrc, canPreview);
  }, [imgSrc, canPreview]);

  React.useEffect(() => {
    if (isError) {
      setStatus('normal');
    }
    if (isCustomPlaceholder && !isLoaded.current) {
      setStatus('loading');
    }
  }, [imgSrc]);

  const wrapperClass = cn(prefixCls, wrapperClassName, rootClassName, {
    [`${prefixCls}-error`]: isError
  });

  const mergedSrc = isError && fallback ? fallback : src;
  const imgCommonProps = {
    crossOrigin,
    decoding,
    draggable,
    loading,
    referrerPolicy,
    sizes,
    srcSet,
    useMap,
    onError,
    alt,
    className: cn(
      `${prefixCls}-img`,
      {
        [`${prefixCls}-img-placeholder`]: placeholder === true
      },
      className
    ),
    style: {
      height,
      ...style
    }
  };

  return (
    <>
      <div
        {...otherProps}
        className={wrapperClass}
        onClick={canPreview ? onPreview : onClick}
        style={{
          width,
          height,
          ...wrapperStyle
        }}
      >
        <video {...(isError && fallback ? { src: fallback } : { onLoad })} width={width} height={height}>
          <source src={src} />
        </video>
        {/* <img */}
        {/*   {...imgCommonProps} */}
        {/*   {...(isError && fallback ? { src: fallback } : { onLoad, src: imgSrc })} */}
        {/*   width={width} */}
        {/*   height={height} */}
        {/* /> */}

        {/* Preview Click Mask */}
        {previewMask && canPreview && (
          <div
            className={cn(`${prefixCls}-mask`, maskClassName)}
            style={{
              display: imgCommonProps.style?.display === 'none' ? 'none' : undefined
            }}
          >
            {previewMask}
          </div>
        )}
      </div>
      {!isPreviewGroup && canPreview && (
        <Preview
          aria-hidden={!isShowPreview}
          visible={isShowPreview}
          prefixCls={previewPrefixCls}
          onClose={onPreviewClose}
          mousePosition={mousePosition}
          src={mergedSrc}
          alt={alt}
          getContainer={getPreviewContainer}
          rootClassName={rootClassName}
          {...dialogProps}
        />
      )}
    </>
  );
};

export default ImageInternal;
