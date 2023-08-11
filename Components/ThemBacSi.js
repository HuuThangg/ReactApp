import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Dimensions,
    Platform,
    TouchableOpacity,
    Button,
    StyleSheet,
    Alert
} from 'react-native';
import Modal from 'react-native-modalbox';
import { data } from '../Data/data';

const URL_server = `http://mqsoft.ddns.net:8182/mq`
const { width, height } = Dimensions.get('window');
export default class ThemBacSi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ma: '',
            hoTen: '',
            soChungChi: '',
            dsBacSi: []
        }
    }

    mo_hop_thoai() {
        this.setState(
            {
                ma: '',
                hoTen: '',
                soChungChi: ''
            }
        )
        this.refs.hop_thoai.open();
    }
    them() {
        //this.refs.hop_thoai.close();
        if (this.state.ma == '' || this.state.hoTen == '') {
            Alert.alert('bạn chưa nhập đủ thông tin !')
            return;
        }
        let bacsi = {
            ma: this.state.ma,
            hoTen: this.state.hoTen,
            soChungChi: this.state.soChungChi
        }
        fetch(`${URL_server}/postbacsi`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ma: this.state.ma,
                hoTen: this.state.hoTen,
                soChungChi: this.state.soChungChi
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.successful == true) {
                    // thêm bs vừa tạo vào dsBacSi sau đó load lại dữ liệu từ dsBacSi
                    data.dsBacSi.push(bacsi) // unshift thêm đầu, push thêm cuối
                    this.props.parentFlatList.refresh_Danh_sach_Bac_Si(this.state.ma)
                    console.log(responseData)
                    Alert.alert('Thêm thành công')
                    this.refs.hop_thoai.close();
                }
            })
            .catch((err) => {
                console.log("Error", err);
            })
    }
    render() {
        return (
            // <View style={{ flex: 1, backgroundColor: "gray" }}>
            //     <View>
            //         <Button title='ShowModal' onPress={() => this.mo_hop_thoai()} />
            //     </View>
            <Modal ref={'hop_thoai'} style={styles.modal}>
                <Text style={[styles.title, { marginTop: 20, }]}>Thông tin bác sĩ</Text>
                <TextInput style={styles.input}
                    placeholder='Nhập mã'
                    value={this.state.ma}
                    onChangeText={(ma) => { this.setState({ ma }) }}></TextInput>
                <TextInput style={styles.input}
                    placeholder='Nhập họ tên'
                    value={this.state.hoTen}
                    onChangeText={(hoTen) => { this.setState({ hoTen }) }}></TextInput>
                <TextInput style={styles.input}
                    placeholder='Số CCHN'
                    value={this.state.soChungChi}
                    onChangeText={(soChungChi) => { this.setState({ soChungChi }) }}></TextInput>
                <TouchableOpacity style={styles.btn} onPress={() => this.them()}>
                    <Text style={[styles.title, { color: 'white' }]}>Đồng ý</Text>
                </TouchableOpacity>
            </Modal>
            // </View>
        )
    }
}
const styles = StyleSheet.create({
    modal: {
        // chiều rộng màn hinh - 80
        width: width - 80,
        height: 260,
        // nếu màn hinh là ios độ bo là 20 ngược lại là 7
        borderRadius: Platform.OS === 'ios' ? 20 : 7,
        // độ bóng
        shadowRadius: 10
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        color: '#4387fd'
    },
    input: {
        height: 40,
        fontSize: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#e6e5e5',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 38,
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 4,
        backgroundColor: '#4387fd'
    }
})
