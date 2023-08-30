import React from "react";
import { View, Text, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Platform } from 'react-native'
import { data } from "../Data/data";
const URL_server = `https://services-react.onrender.com`
class DangKy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hoten: '',
            sodt: '',
            pass: ''
        }
    }
    them() {
        if (this.state.hoten == '') {
            Alert.alert('Thông báo', 'Họ tên không được để trống')
            return false;
        } else
            if (this.state.sodt == '') {
                Alert.alert('Thông báo', 'Số điện thoại không được để trống')
                return false;
            } else
                if (this.state.pass == '') {
                    Alert.alert('Thông báo', 'PassWord không được để trống')
                    return false;
                } else {
                    let user = {
                        hoten: this.state.hoten,
                        sodt: this.state.sodt,
                        pass: this.state.pass
                    }
                    fetch(`${URL_server}/insertUser`, {
                        method: 'POST',
                        headers: {
                            Accept: "application/json",
                            'Content-Type': "application/json",
                        },
                        body: JSON.stringify({
                            hoten: this.state.hoten,
                            sodt: this.state.sodt,
                            pass: this.state.pass
                        })
                    })
                        .then((response) => response.json())
                        .then((responseData) => {
                            console.log(responseData)
                            if (responseData.noi_dung == 1) {
                                data.dsUser.push(user)
                                Alert.alert("Thông báo", "Thêm thành công")
                            }
                        })
                        .catch((err) => {
                            console.log('error');
                        })
                }
    }

    render() {
        return (
            <KeyboardAvoidingView
            //behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../Images/user.png')} />
                    </View>
                    <View>
                        <Text style={styles.text}>Họ tên</Text>
                        <TextInput placeholder="VD: NGUYỄN VĂN A" autoCapitalize="characters" // viết hoa tất cả ký tự
                            style={styles.input}
                            value={this.state.hoten}
                            onChangeText={(hoten) => this.setState({ hoten })} />
                        <Text style={styles.text}>Số điện thoại</Text>
                        <TextInput placeholder="VD: 0912345678" inputMode="numeric" //bàn phím số
                            style={styles.input}
                            value={this.state.sodt}
                            onChangeText={(sodt) => this.setState({ sodt })} />
                        <Text style={styles.text}>Password</Text>
                        <TextInput placeholder="Password" secureTextEntry //ký tự * khi nhập pass
                            style={styles.input}
                            value={this.state.pass}
                            onChangeText={(pass => this.setState({ pass }))} />
                        <TouchableOpacity activeOpacity={0.5}
                            onPress={() => this.them()}
                            style={styles.button}>
                            <Text style={{
                                fontSize: 15,
                                color: '#ffffff',
                                fontWeight: 'bold'
                            }}>Đăng ký</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black' }}>
                                Bạn đã có tài khoản?
                            </Text>
                            <TouchableOpacity activeOpacity={0.5}>
                                <Text style={{ color: '#05a408', fontWeight: 'bold' }}> Đăng nhập</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 15
                        }}>
                            <TouchableOpacity activeOpacity={0.5}>
                                <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/800px-Facebook_f_logo_%282021%29.svg.png' }}
                                    style={{ width: 25, height: 25, marginRight: 15 }} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.5}>
                                <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdt7NQ4KqIwCtkrcJbarmUo0KvDQcHmjKHDA&usqp=CAU' }}
                                    style={{ width: 25, height: 25, marginRight: 15 }} />
                            </TouchableOpacity>

                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

export default DangKy;

const styles = StyleSheet.create({
    text: {
        marginLeft: 30,
        marginBottom: 5,
        fontSize: 15,
        color: 'black'
    },
    input: {
        borderWidth: 0.5,
        marginHorizontal: 20,
        borderRadius: 8,
        marginBottom: 10
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        marginHorizontal: 20,
        borderRadius: 8,
        marginTop: 30,
        backgroundColor: '#fd0a0b'
    }
})