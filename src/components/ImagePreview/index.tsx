import { Image } from 'antd';

interface ImagePreviewProps {
  value?: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = (props) => {
  const { value } = props;
  return (
    <Image
      width={80}
      src={value}
      preview={{
        src: value
      }}
    />
  );
};

export default ImagePreview;
