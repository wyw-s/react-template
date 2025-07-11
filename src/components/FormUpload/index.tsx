import { Form, message, Upload, Image as AntdImage } from 'antd';
import { PlusOutlined, LoadingOutlined, PictureOutlined } from '@ant-design/icons';
import { omit } from 'lodash-es';
import { useState, useCallback } from 'react';
import update from 'immutability-helper';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import DragableUploadListItem from './DragableUploadListItem';
import { uploadFile } from '@/apis/common';
import VideoPreview from '@/components/VideoPreview';
import getCePrefixCls from '@/utils/getCePrefixCls';
import './index.less';

const prefix = getCePrefixCls('form-upload');

interface FormUploadProps extends Omit<UploadProps, 'onChange' | 'beforeUpload'> {
  /**
   * 上传类型
   */
  uploadType?: 'image' | 'video';
  /**
   * 图片上传的尺寸大小
   */
  size?: number[];
  /**
   * 图片上传的尺寸比例
   */
  imageRatio?: number[];
  /**
   * 上传之前触发，返回false 阻止上传
   * @param file
   */
  beforeUpload?: (file: RcFile) => boolean;
  beforeCheckImageWH?: (width: number, height: number) => boolean;
}

const FormUpload: React.FC<FormUploadProps> = (props) => {
  const {
    maxCount,
    id,
    fileList,
    uploadType = 'image',
    size,
    imageRatio,
    beforeUpload,
    beforeCheckImageWH,
    ...rest
  } = props;
  const form = Form.useFormInstance();
  const [visible, setVisible] = useState<boolean>(false);
  const [videoVisible, setVideoVisible] = useState<boolean>(false);
  const [src, setSrc] = useState<string>('');
  const [videoSrc, setVideoSrc] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const updateKey = /_/.test(id as string) ? (id as string).split('_') : (id as string);

  const customRequest = (option: any) => {
    setLoading(true);
    uploadFile(option.file).then((res: any) => {
      setLoading(false);
      if (res.success) {
        message.success('上传成功');
        const fileObj: UploadFile = {
          uid: `-${new Date().getTime()}`,
          url: res.data,
          name: option.file.name, // 文件名
          status: 'done',
          type: option.file.type
        };
        const list: UploadFile[] = Array.isArray(fileList) ? [...fileList, fileObj] : [fileObj];
        form.setFieldValue(updateKey, list);
      }
    });
  };

  const onRemove = (file: any) => {
    const list = fileList ? [...fileList] : [];
    const index = list.findIndex((item) => item.uid === file.uid);
    list.splice(index, 1);
    form.setFieldValue(updateKey, list);
  };

  const handlePreview = async (file: UploadFile) => {
    if (uploadType === 'image') {
      setSrc(file.url || (file.preview as string));
      setVisible(true);
    } else {
      setVideoSrc(file.url || (file.preview as string));
      setVideoVisible(true);
    }
  };

  const checkImageWH = (file: RcFile): Promise<void> => {
    return new Promise((resolve, reject): void => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const image = new Image();
        image.src = fileReader.result as string;
        image.onload = () => {
          if (typeof beforeCheckImageWH === 'function') {
            if (beforeCheckImageWH(image.width, image.height)) {
              resolve();
            } else {
              reject();
            }
            return;
          }

          const [w, h] = size || [];
          const [wRatio, hRatio] = imageRatio || [];
          if (wRatio !== undefined && hRatio !== undefined && image.width / image.height !== wRatio / hRatio) {
            message.error(`图片比例必须是 ${wRatio}:${hRatio} 且尺寸大于或等于 ${w} * ${h}`);
            reject();
            return;
          }

          if ((w !== undefined && image.width < w) || (h !== undefined && image.height < h)) {
            message.error(`图片尺寸${image.width} x ${image.height}不符合要求!`);
            reject();
            return;
          }

          resolve();
        };
      };

      fileReader.readAsDataURL(file);
    });
  };

  const onBeforeUpload = async (file: RcFile) => {
    if (typeof beforeUpload === 'function') {
      if (!beforeUpload(file)) {
        return Upload.LIST_IGNORE;
      }
    }

    const acceptImage = ['image/png', 'image/jpg', 'image/jpeg'];
    const acceptVideo = ['video/mp4'];

    if (uploadType === 'image') {
      if (!acceptImage.includes(file.type)) {
        message.error('你只能上传 png、jpg、jpeg 文件!');
        return Upload.LIST_IGNORE;
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('文件大小不能超过5M！');
        return Upload.LIST_IGNORE;
      }

      try {
        await checkImageWH(file);
      } catch (e) {
        return Upload.LIST_IGNORE;
      }
    } else if (uploadType === 'video') {
      if (!acceptVideo.includes(file.type)) {
        message.error('你只能上传 mp4 文件!');
        return Upload.LIST_IGNORE;
      }
      const isLt5M = file.size / 1024 / 1024 < 10;
      if (!isLt5M) {
        message.error('文件大小不能超过10M！');
        return Upload.LIST_IGNORE;
      }
    }

    return true;
  };

  const moveRow = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      if (fileList) {
        const dragRow = fileList[dragIndex];
        form.setFieldValue(
          updateKey,
          update(fileList, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragRow]
            ]
          })
        );
      }
    },
    [fileList]
  );

  const renderBtn = () => {
    if (maxCount !== undefined && Number(fileList?.length) >= maxCount) return null;

    return (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>上传</div>
      </div>
    );
  };

  return (
    <div className={prefix}>
      <Upload
        {...omit(rest, 'onChange')}
        maxCount={maxCount}
        listType="picture-card"
        fileList={props.fileList}
        onRemove={onRemove}
        customRequest={customRequest}
        onPreview={handlePreview}
        beforeUpload={onBeforeUpload}
        itemRender={(originNode, file, currFileList) => (
          <DragableUploadListItem originNode={originNode} file={file} fileList={currFileList} moveRow={moveRow} />
        )}
        iconRender={(file) => {
          if (!file.type && uploadType !== 'video') {
            return <PictureOutlined />;
          }

          if (/^image\/\w+/.test(file.type as string)) {
            return (
              <img
                src={file.thumbUrl || file.url}
                alt={file.name}
                className={'ant-upload-list-item-image'}
                crossOrigin={file.crossOrigin}
              />
            );
          }

          return <VideoPreview src={file.url as string} />;
        }}
      >
        {renderBtn()}
      </Upload>

      <AntdImage style={{ display: 'none' }} preview={{ visible }} src={src} onPreviewClose={() => setVisible(false)} />
      <VideoPreview
        wrapperStyle={{ display: 'none' }}
        preview={{ visible: videoVisible }}
        src={videoSrc}
        onPreviewClose={() => setVideoVisible(false)}
      />
    </div>
  );
};

export default FormUpload;
