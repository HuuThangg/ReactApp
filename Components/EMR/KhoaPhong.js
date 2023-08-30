import React from "react";
import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'

export default class KhoaPhong extends React.Component {
    render() {
        return (
            <SafeAreaView>
                <View style={{ marginTop: 15 }}>
                    <Text style={{ marginBottom: 8, fontSize: 15 }}>Xin chào Nguyễn Văn A</Text>
                    <Text style={{ marginBottom: 8, fontSize: 15 }}>Vui lòng chọn thông tin bên dưới để tiếp tục thông tin</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={{
                        marginLeft: 20,
                        fontSize: 15,
                        color: 'black'
                    }}>Chọn phòng ban</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Image source={require('../EMR/Images/lock.png')}
                            style={{
                                position: 'absolute',
                                top: 13,
                                left: 25,
                                width: 20,
                                height: 20
                            }} />
                        <TextInput placeholder="Chọn phòng ban"
                            style={{
                                borderWidth: 0.7,
                                marginHorizontal: 15,
                                borderRadius: 13,
                                width: '92%',
                                paddingLeft: 43
                            }} />
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={{
                        marginLeft: 20,
                        fontSize: 15,
                        color: 'black'
                    }}>Chọn mẫu bệnh án</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Image source={require('../EMR/Images/lock.png')}
                            style={{
                                position: 'absolute',
                                top: 13,
                                left: 25,
                                width: 20,
                                height: 20
                            }} />
                        <TextInput placeholder="Chọn mẫu bệnh án"
                            style={{
                                borderWidth: 0.7,
                                marginHorizontal: 15,
                                borderRadius: 13,
                                width: '92%',
                                paddingLeft: 43,
                            }} />
                    </View>
                    <TouchableOpacity style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 50,
                        marginHorizontal: 15,
                        borderRadius: 8,
                        marginTop: 30,
                        backgroundColor: '#4387fd',

                    }}>
                        <Text style={{ color: 'white', fontSize: 16 }}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}