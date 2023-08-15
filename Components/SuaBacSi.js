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
export default class SuaBacSi extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ma: "",
            hoTen: "",
            soChungChi: ""
        }
    }
    mo_hop_thoai(BacSi) {
        this.setState({
            ma: BacSi.ma,
            hoTen: BacSi.hoTen,
            soChungChi: BacSi.soChungChi
        });
        this.refs.hop_thoai.open();
    }
    CapNhat() {
        //debugger
        fetch(`${URL_server}/postbacsi`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                ma: this.state.ma,
                hoTen: this.state.hoTen,
                soChungChi: this.state.soChungChi
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)
                if (responseData.successful == true) {
                    let BacSi = data.dsBacSi.find(item => item.ma == this.state.ma);
                    BacSi.hoTen = this.state.hoTen;
                    BacSi.soChungChi = this.state.soChungChi;
                    Alert.alert('Sửa thành công')
                    this.refs.hop_thoai.close();
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <Modal ref={'hop_thoai'} style={styles.modal}>
                <Text style={[styles.title, { marginTop: 20, }]}>Thông tin bác sĩ</Text>
                <Text style={styles.input}
                    placeholder='Nhập mã'
                >{this.state.ma}</Text>
                <TextInput style={styles.input}
                    placeholder='Nhập họ tên'
                    value={this.state.hoTen}
                    onChangeText={(hoTen) => { this.setState({ hoTen }) }}></TextInput>
                <TextInput style={styles.input}
                    placeholder='Số CCHN'
                    value={this.state.soChungChi}
                    onChangeText={(soChungChi) => { this.setState({ soChungChi }) }}></TextInput>
                <TouchableOpacity style={styles.btn} onPress={() => this.CapNhat()}>
                    <Text style={[styles.title, { color: 'white' }]}>Đồng ý</Text>
                </TouchableOpacity>
            </Modal>
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