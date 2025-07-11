import React, { useRef } from 'react';
import { Tooltip } from 'antd';
import { useDrag, useDrop } from 'react-dnd';
import type { UploadFile } from 'antd/es/upload/interface';
import getCePrefixCls from '@/utils/getCePrefixCls';

const type = 'DragableUploadList';
const prefix = getCePrefixCls('form-upload');

interface DragableUploadListItemProps {
  originNode: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  file: UploadFile;
  fileList: UploadFile[];
  moveRow: (dragIndex: any, hoverIndex: any) => void;
}

const DragableUploadListItem = ({ originNode, moveRow, file, fileList }: DragableUploadListItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const index = fileList.indexOf(file);

  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward'
      };
    },
    drop: (item: any) => {
      moveRow(item.index, index);
    }
  });

  const [, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  drop(drag(ref));

  const errorNode = <Tooltip title="Upload Error">{originNode.props.children}</Tooltip>;

  return (
    <div
      ref={ref}
      className={`${prefix}-draggable-list-item ${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move' }}
    >
      {file.status === 'error' ? errorNode : originNode}
    </div>
  );
};

export default DragableUploadListItem;
