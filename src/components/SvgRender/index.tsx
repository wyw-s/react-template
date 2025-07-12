import Icon from '@ant-design/icons';
import { IconBaseProps } from '@ant-design/icons/lib/components/Icon';
import organ from '@/assets/svg/organ.svg';
import home from '@/assets/svg/home.svg';

// 然后可以通过components对象访问所有组件
const svgMap: any = { organ, home };

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
