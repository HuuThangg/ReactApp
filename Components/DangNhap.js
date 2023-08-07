import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native"
//import api from '../api.services'
const URL_server = `http://mqsoft.ddns.net:6767`
class DangNhap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tendangnhap: '',
            matkhau: '',
            error: ''
        }
    }

    KiemTraDangNhap() {
        // debugger
        // if (this.state.tendangnhap == '' || this.state.matkhau == '') {
        //     this.setState({ "error": "Dữ liệu không hợp lệ" })
        //     return false;
        // }
        fetch(`${URL_server}/EmrUseridLogin/GetEmrUseridLogin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid: this.state.tendangnhap,
                password: this.state.matkhau
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                //debugger
                //console.log(responseData)
                if (responseData.userid != this.state.tendangnhap) {
                    this.setState({ "error": "Đăng nhập thất bại" })
                } else {
                    this.setState({ "error": "Đăng nhập thành công" })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    alignItems: 'center'
                }}>
                    <Image source={require("../Images/user.png")} />
                </View>
                <View style={{
                    flex: 1,
                    alignContent: "flex-start",

                }}>
                    <TextInput placeholder="Tên đăng nhập"
                        style={{
                            height: 44,
                            borderWidth: 0.5,
                            borderRadius: 5,
                            marginHorizontal: 10,
                            marginBottom: 10
                        }}
                        value={this.state.tendangnhap}
                        onChangeText={(tendangnhap) => this.setState({ tendangnhap })}
                    />
                    <TextInput placeholder="Mật khẩu" secureTextEntry
                        style={{
                            height: 44,
                            borderWidth: 0.5,
                            borderRadius: 5,
                            marginHorizontal: 10,
                            marginBottom: 10
                        }}
                        value={this.state.matkhau}
                        onChangeText={(matkhau) => this.setState({ matkhau })}
                    />
                    <TouchableOpacity activeOpacity={0.5}
                        style={{
                            height: 44,
                            borderWidth: 0.5,
                            borderRadius: 5,
                            marginHorizontal: 10,
                            marginTop: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'blue'
                        }}>
                        <Text style={{
                            fontSize: 20,
                            color: 'white',
                        }}>Đăng nhập</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.KiemTraDangNhap()}
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