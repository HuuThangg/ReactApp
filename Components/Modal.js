import React, { Component } from 'react';
import { Text, TextInput, Dimensions, Platform, View, Button } from 'react-native';
import Modal from 'react-native-modalbox';


const { width, height } = Dimensions.get('window');
export default class modal extends Component {
    constructor(props) {
        super(props);
    }

    Mo_Hop_thoai() {
        this.refs.Th_Hop_thoai.open();
    }
    Xu_ly_Them() {
        this.refs.Th_Hop_thoai.close();
    }
    render() {
        {/*Animation can be slide, slide, none*/ }
        return (
            <View style={{ flex: 1, backgroundColor: "gray" }}>
                <View>
                    <Button title='ShowModal' onPress={() => this.Mo_Hop_thoai()} />
                </View>

                <Modal ref={'Th_Hop_thoai'} style={{
                    borderRadius: Platform.OS === 'ios' ? 20 : 6,
                    shadowRadius: 10,
                    width: width - 80,
                    height: 220
                }}
                    position='center'
                    //false bấm 2 lần hk tắt modal
                    backdrop={true}
                    animationType={'none'}
                    transparent={true}
                    backdropColor='white'
                >
                    <Text style={{
                        fontSize: 20, textAlign: 'center',
                        marginTop: 25, marginBottom: 20, color: '#4387fd'
                    }}>
                        Thông tin người dùng
                    </Text>
                    <TextInput style={{
                        height: 40, borderBottomColor: '#e6e5e5',
                        fontSize: 14, borderBottomWidth: 1,
                        marginBottom: 10, marginLeft: 20, marginRight: 20
                    }}
                        placeholder='Mã số'

                    >
                    </TextInput>
                    <TextInput style={{
                        height: 40, borderBottomColor: '#e6e5e5',
                        fontSize: 14, borderBottomWidth: 1,
                        marginBottom: 10, marginLeft: 20, marginRight: 20
                    }}
                        placeholder='Họ tên'

                    >
                    </TextInput>
                    <Button title='Đồng ý' onPress={() => this.Xu_ly_Them()} />
                </Modal>

            </View>

        );
    }
}