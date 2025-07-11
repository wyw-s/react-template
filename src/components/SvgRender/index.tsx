import Icon from '@ant-design/icons';
import { IconBaseProps } from '@ant-design/icons/lib/components/Icon';
import organ from '@/assets/svg/organ.svg';

const svgMap: any = { organ };

interface SvgRenderProps extends IconBaseProps {
  name: string;
}

const SvgRender = (props: SvgRenderProps) => {
  const { name, ...rest } = props;
  return (
    // @ts-ignore
    <Icon component={svgMap[name]} style={{ fontSize: 16 }} {...rest} />
  );
};

export default SvgRender;
