import React from 'react';
import { Button } from 'antd';
import styles from './App.module.less';

function App() {
  return (
    <div className="App">
      <Button type="primary">主页</Button>
      <span className={styles.test}>哈哈</span>
    </div>
  );
}

export default App;
