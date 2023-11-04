import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '兆中出品',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'bili_id',
          title: 'b站主页',
          href: 'https://space.bilibili.com/66863730?spm_id_from=333.1007.0.0',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined /> zhaozhong github</>,
          href: 'https://github.com/zhaozhong1',
          blankTarget: true,
        },
        
      ]}
    />
  );
};

export default Footer;
