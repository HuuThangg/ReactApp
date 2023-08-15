import React from "react";
import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Alert,
    StyleSheet,
    TextInput,
    Image
} from "react-native"
import api from "../api.services";
import { data } from "../Data/data";
const URL_server = `http://mqsoft.ddns.net:8182/danhmuc`
export default class DanhSachNoiGioiThieu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dmNoiGioiThieu: [],
            id: '',
            ten: '',
            diachi: '',
            gtTim: '',
            So: 0
        }
    }
    Tim() {
        let gt = this.state.gtTim
        let ds = data.dsNoiGioiThieu.filter(x => x.ten.toLowerCase().includes(gt.toLowerCase()));
        if (ds != '')
            this.setState({
                dmNoiGioiThieu: ds
            })
        else
            Alert.alert("Thông báo", "Không tìm thấy thông tin")
    }

    refresh_Danh_sach_gioi_thieu() {
        this.setState({ key: id })
        this.refs.Th_Danh_sach.scrollToEnd();
    }
    them() {
        if (this.state.ma == '' || this.state.ten == '' || this.state.diachi == '') {
            Alert.alert("Thông báo", "Vui lòng nhập đủ thông tin")
            return;
        }
        let noigioithieu = {
            id: this.state.id,
            ten: this.state.ma,
            diaChi: this.state.diachi
        }
        fetch(`${URL_server}/postnoigioithieu`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: parseInt(this.state.id),
                ten: this.state.ten,
                diaChi: this.state.diachi
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.successful == true) {
                    //debugger
                    data.dsNoiGioiThieu.unshift(noigioithieu)
                    console.log(responseData)
                    //this.parentFlatList.refresh_Danh_sach_gioi_thieu()
                    Alert.alert('Thông báo', 'Thêm thành công')
                }
            })
            .catch((err) => {
                console.log("Error", err);
            })
    }

    componentDidMount() {
        api.get(`${URL_server}/GetNoigioithieu`)
            .then(result => {
                data.dsNoiGioiThieu = result
                this.setState({
                    dmNoiGioiThieu: result
                })
            })
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                {/* <View style={styles.title}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 25
                    }}>Thông tin nơi giới thiệu</Text>
                </View> */}
                {/* thông tin tìm trên FlatList */}
                <View style={[styles.containerRow, { backgroundColor: "#4387fd" }]}>
                    <View style={[styles.contentColumn, { width: '90%', borderBottomWidth: 0 }]}>
                        <TextInput
                            placeholder="Nhập giá trị tìm"
                            onChangeText={(gtTim) => this.setState({ gtTim })}
                            value={this.state.gtTim}
                            onSubmitEditing={() => this.Tim()}
                            placeholderTextColor="#ffffff"
                        />
                    </View>
                    <View style={[styles.contentColumn, { width: '10%', borderBottomWidth: 0, paddingTop: 15 }]}>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => this.Tim()}>
                            <Image source={require("../Images/search.png")} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.header}>
                    <TextInput placeholder="thông tin mã người giới thiệu"
                        style={styles.textinput}
                        value={this.state.id}
                        onChangeText={(id) => this.setState({ id })}
                    ></TextInput>
                    <TextInput placeholder="thông tin người giới thiệu"
                        style={styles.textinput}
                        value={this.state.ten}
                        onChangeText={(ten) => this.setState({ ten })}
                    ></TextInput>
                    <TextInput placeholder="địa chỉ người giới thiệu"
                        style={styles.textinput}
                        value={this.state.diachi}
                        onChangeText={(diachi) => this.setState({ diachi })}
                    ></TextInput>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.them()}
                            activeOpacity={0.5}
                            style={styles.thuc_thi}>
                            <Text style={{
                                color: '#fff',
                                fontSize: 20
                            }}>Insert</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity activeOpacity={0.5}
                            style={styles.thuc_thi}>
                            <Text style={{
                                color: '#fff',
                                fontSize: 20
                            }}>Delete</Text>
                        </TouchableOpacity> */}
                    </View>

                </View>
                <FlatList ref={'Th_Danh_sach'}
                    data={this.state.dmNoiGioiThieu}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => {
                        return (
                            <ItemFlatList item={item} index={index}></ItemFlatList>
                        )
                    }}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        )
    }
}

export class ItemFlatList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    Xu_Ly_Goi() {
        Alert.alert("Thông báo", `Tên người giới thiệu: ${this.props.item.ten} - địa chỉ: ${this.props.item.diachi}`)
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.Xu_Ly_Goi()}
                    activeOpacity={0.5}
                    style={styles.input}>
                    <Text style={{
                        fontSize: 20,
                        color: '#fff'
                    }}>{this.props.item.ten}</Text>
                    <Text style={{
                        fontSize: 16,
                        color: '#fff'
                    }}>{this.props.item.diachi}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#4387fd'
    },
    header: {
        alignItems: "center",
        marginTop: '5%',
        marginBottom: '10%',

    },
    textinput: {
        borderWidth: 1,
        width: '95%',
        borderRadius: 6,
        borderColor: '#e6e5e5',
        marginBottom: 20
    },
    thuc_thi: {
        height: 45,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        backgroundColor: '#4387fd',
        marginHorizontal: 10
    },
    input: {
        marginHorizontal: 10,
        marginBottom: 15,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        backgroundColor: '#4387fd',
    },
    containerRow: {
        flexDirection: "row",
        paddingHorizontal: 10,
        //marginVertical: 10,


    },
    contentColumn: {
        flexDirection: "column",
        paddingVertical: 5,
        borderBottomColor: "#008000",
        borderBottomWidth: 1,
    },
})