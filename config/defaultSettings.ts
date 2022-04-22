import { Settings as LayoutSettings } from '@ant-design/pro-layout';
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#722ED1',
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: false,
  colorWeak: false,
  title: '师资管理系统',
  pwa: false,
  logo: 'logo.png',
  iconfontUrl: '',
  headerHeight: 48,
  splitMenus: false
};

export default Settings;

