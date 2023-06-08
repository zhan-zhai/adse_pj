import type { MenuDataItem } from '@ant-design/pro-layout';
import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import type { ConnectProps } from 'umi';
import { Link, SelectLang, useIntl, connect, FormattedMessage } from 'umi';
import React from 'react';
import type { ConnectState } from '@/models/connect';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';
export type UserLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
} & Partial<ConnectProps>;

const UserLayout: React.FC<UserLayoutProps> = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    ...props,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        {/*<div className={styles.lang}>*/}
        {/*  <SelectLang />*/}
        {/*</div>*/}
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>SuperMar</span>
              </Link>
            </div>
            <div className={styles.desc}>SuperMar 是邯郸路最具影响力的 购物APP</div>
          </div>
          {children}
        </div>
        <DefaultFooter
          copyright={`${new Date().getFullYear()} Produced by FDU Advanced Software Engineering Group 13`}
          links={
            [
              // {
              //   key: 'Ant Design Pro',
              //   title: 'Ant Design Pro',
              //   href: 'https://pro.ant.design',
              //   blankTarget: true,
              // },
              // {
              //   key: 'github',
              //   title: <GithubOutlined />,
              //   href: 'https://github.com/ant-design/ant-design-pro',
              //   blankTarget: true,
              // },
              // {
              //   key: 'Ant Design',
              //   title: 'Ant Design',
              //   href: 'https://ant.design',
              //   blankTarget: true,
              // },
            ]
          }
        />
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }: ConnectState) => ({ ...settings }))(UserLayout);
