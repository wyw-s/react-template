import * as React from 'react';
import { Typography } from 'antd';

export type HighlightProps = {
  /** 源文本 */
  sourceText: string;
  /** 高亮文本 */
  highlightText?: string;
};

const Highlight: React.FC<HighlightProps> = ({ sourceText, highlightText }) => {
  if (!highlightText) {
    return (
      <Typography.Text key="001" ellipsis title={sourceText}>
        {sourceText}
      </Typography.Text>
    );
  }

  let startIndex: string[] = [];
  if (sourceText && sourceText.indexOf(highlightText) > -1) {
    startIndex = sourceText.split(highlightText);
  }
  return startIndex.length > 0 ? (
    <Typography.Text key="002" ellipsis title={sourceText}>
      {startIndex.map((text, index) => {
        const hText = <span style={{ color: '#c00' }}>{highlightText}</span>;

        if (!text) {
          if (index === 0) return <React.Fragment key={index}>{hText}</React.Fragment>;
          return null;
        }

        if (startIndex.length - 1 === index) {
          return <React.Fragment key={index}>{text}</React.Fragment>;
        }

        return (
          <React.Fragment key={index}>
            {text}
            {hText}
          </React.Fragment>
        );
      })}
    </Typography.Text>
  ) : (
    <Typography.Text key="003" ellipsis title={sourceText}>
      {sourceText}
    </Typography.Text>
  );
};

export default Highlight;
