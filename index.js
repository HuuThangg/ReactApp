/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import DanhSachBacSi from "./Components/DanhSachBacSi";
import DangNhap from './Components/DangNhap';
import modal from './Components/Modal';
import ThemBacSi from './Components/ThemBacSi';
AppRegistry.registerComponent(appName, () => DanhSachBacSi);
