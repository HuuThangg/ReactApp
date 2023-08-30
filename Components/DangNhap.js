import React from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from "react-native"
import api from '../api.services'
import md5 from 'md5';
const URL_server = `http://mqsoft.ddns.net:6767`
const URL = `https://react-native-test.onrender.com`
class DangNhap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tendangnhap: '',
            pass: '',
            error: '',
        }
    }
    KiemTraDangNhap() {
        //debugger
        if (this.state.tendangnhap == '' || this.state.pass == '') {
            Alert.alert("Thông báo", "Tên đăng nhập hoặc mật khẩu không được để trống")
        } else
            //     // debugger
            //     fetch(`${URL_server}/EmrUseridLogin/GetEmrUseridLogin`, {
            //         method: 'POST',
            //         headers: {
            //             'Accept': 'application/json',
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify({
            //             userid: this.state.tendangnhap,
            //             password: this.HasPass(this.state.pass)
            //         })
            //     })
            //         .then((response) => response.json())
            //         .then((responseData) => {
            //             //debugger
            //             //console.log(responseData)
            //             if (responseData.userid != this.state.tendangnhap) {
            //                 this.setState({ "error": "Đăng nhập thất bại" })
            //             } else {
            //                 this.setState({ "error": "Đăng nhập thành công" })
            //             }
            //         })
            //         .catch((error) => {
            //             console.log(error);
            //         })

            fetch(`${URL}/FindUser`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tendangnhap: this.state.tendangnhap,
                    pass: md5(this.state.pass)
                })
            })
                .then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData)
                    if (responseData.ket_qua == true) {
                        this.setState({ "error": "Đăng nhập thành công" })
                    } else {
                        this.setState({ "error": "Đăng nhập thất bại" })
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    {/* image logo */}
                    <Image source={require("../Images/user.png")} />
                </View>
                <View style={styles.container}>
                    <Text style={styles.text}>Tên đăng nhập</Text>
                    <View style={{ flexDirection: 'row', }}>
                        <Image source={require('../Images/avatar.png')}
                            style={styles.img_icon} />
                        <TextInput placeholder="Tên đăng nhập"
                            style={styles.textinput}
                            value={this.state.tendangnhap}
                            onChangeText={(tendangnhap) => this.setState({ tendangnhap })}
                        />
                    </View>
                    <Text style={styles.text}>Mật khẩu</Text>
                    <View style={{ flexDirection: 'row', }}>
                        <Image source={require('../Images/lock.png')}
                            style={styles.img_icon} />
                        <TextInput placeholder="Mật khẩu" secureTextEntry
                            style={styles.textinput}
                            value={this.state.pass}
                            onChangeText={(pass) => this.setState({ pass })}
                        />
                    </View>

                    <TouchableOpacity activeOpacity={0.5}
                        onPress={() => this.KiemTraDangNhap()}
                        style={styles.dangnhap}>
                        <Text style={{
                            fontSize: 20,
                            color: 'white',
                        }}>Đăng nhập</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                            marginTop: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{ color: 'red', fontStyle: 'italic' }}>Quên mật khẩu ?</Text>
                    </TouchableOpacity>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 20
                    }}>
                        <Text>{this.state.error}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default DangNhap;

const styles = StyleSheet.create({
    header: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'center'
    },
    container: {
        flex: 1,
        alignContent: "flex-start",
    },
    text: {
        marginHorizontal: 20,
        marginBottom: 10,
        color: 'black'
    },
    img_icon: {
        position: 'absolute',
        left: 25,
        top: 12,
        width: 20,
        height: 20
    },
    textinput: {
        height: 44,
        borderWidth: 1,
        borderRadius: 10,
        width: '95%',
        marginHorizontal: 10,
        marginBottom: 10,
        borderColor: 'gray',
        paddingLeft: 45
    },
    dangnhap: {
        height: 44,
        borderWidth: 0.5,
        borderRadius: 5,
        marginHorizontal: 10,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue'
    }
})