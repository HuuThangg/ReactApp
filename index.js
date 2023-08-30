/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import DanhSachBacSi from "./Components/DanhSachBacSi";
import DangNhap from './Components/DangNhap';
import DanhSachNoiGioiThieu from './Components/DanhSachNoiGioiThieu';
import modal from './Components/Modal'
import KhoaPhong from './Components/EMR/KhoaPhong'
import DangKy from './Components/DangKy';
AppRegistry.registerComponent(appName, () => DangNhap);
