import { CloseOutlined, EyeOutlined } from '@ant-design/icons';
import React from 'react';
import { ImageProps } from 'rc-image';
import Video from './Video';
import './index.less';

export const icons = {
  close: <CloseOutlined />
};

interface VideoPreviewProsp extends Omit<ImageProps, 'src'> {
  /**
   * 视频封面
   */
  poster?: string;
  /**
   * 视频链接
   */
  src: string;
  width?: string;
  height?: string;
}

const VideoPreview: React.FC<VideoPreviewProsp> = ({
  preview,
  src,
  poster,
  width = '100%',
  height = '100%',
  ...otherProps
}) => {
  const prefixCls = 'video-preview';
  const mergedPreview = React.useMemo(() => {
    if (preview === false) {
      return preview;
    }
    const _preview = typeof preview === 'object' ? preview : {};
    const { getContainer, ...restPreviewProps } = _preview;
    return {
      mask: (
        <div className={`${prefixCls}-mask-info`}>
          <EyeOutlined />
        </div>
      ),
      icons,
      src,
      ...restPreviewProps,
      getContainer
    };
  }, [preview, src]);

  return <Video preview={mergedPreview} poster={poster} width={width} height={height} {...otherProps} />;
};

export default VideoPreview;
