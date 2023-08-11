import React from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Alert
} from "react-native";
import api from '../api.services'
import ThemBacSi from "./ThemBacSi";
import SuaBacSi from "./SuaBacSi";
import { data } from "../Data/data";
const URL_server = `http://mqsoft.ddns.net:8182/mq`

export default class DanhSachBacSi extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bacsi: [],
            key: ''
        }
    }

    ThemBacSi() {
        this.refs.Th_Them.mo_hop_thoai();
    }

    refresh_Danh_sach_Bac_Si(ma) {
        this.setState({ key: ma });
        this.refs.Th_Danh_sach.scrollToEnd();
    }

    componentDidMount() {
        api.get(`${URL_server}/getbacsi`)
            .then(result => {
                //gán danh sách result cho mảng dsBacSi
                data.dsBacSi = result
                this.setState({
                    bacsi: result
                })
            })
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.title}>
                    <Text style={{
                        fontSize: 20,
                        color: 'white',
                        marginLeft: 80
                    }}>DANH SÁCH BÁC SĨ</Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => { this.ThemBacSi() }}>
                        <Image source={require('../Images/plus-32.png')}
                            style={[styles.img, { tintColor: 'white', height: 26 }]} />
                    </TouchableOpacity>
                </View>

                {/* this.state.bacsi.map(item => { */}
                <FlatList
                    ref={'Th_Danh_sach'}
                    data={this.state.bacsi}
                    keyExtractor={item => item.ma}
                    renderItem={({ item, index }) => {
                        return (
                            <ItemBacSi item={item} index={index} parentFlatList={this}></ItemBacSi>
                        )
                    }}
                ></FlatList>
                <ThemBacSi ref={'Th_Them'} parentFlatList={this}></ThemBacSi>
                <SuaBacSi ref={'Th_CapNhat'} parentFlatList={this}></SuaBacSi>
                {/* }) */}
            </View>
        )
    }
}

class ItemBacSi extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bacsi: [],
            So: 0
        }
    }
    refresh_BacSi() {
        this.setState({ So: this.state.So + 1 });
    }

    CapNhatBacSi() {
        this.props.parentFlatList.refs.Th_CapNhat.mo_hop_thoai(this.props.item, this)
    }

    XoaBacSi() {
        Alert.alert(
            "Thông báo",
            "Bạn có chắc xóa không?",
            [
                { text: "Bỏ qua", onPress: () => { console.log("Chọn No") }, style: "cancel" },
                {
                    text: "Đồng ý", onPress: () => {
                        //debugger
                        let ma = parseInt(this.props.item.ma)
                        fetch(`${URL_server}/DelBacSi?ma=${ma}`
                            , {
                                method: 'Delete',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                },
                            })
                            .then((response) => response.json())
                            .then((responseData) => {
                                //console.log(responseData)
                                if (responseData.successful == true) {
                                    data.dsBacSi.splice(this.props.index, 1);
                                    this.props.parentFlatList.refresh_Danh_sach_Bac_Si(this.props.item.ma);
                                    console.log(responseData)
                                    Alert.alert("xóa thành công")
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    }
                }
            ],
            { cancelable: true }
        );
    }

    render() {
        return (
            <View style={styles.container}
                key={this.props.item.ma}>
                <View style={styles.col_10}>
                    <Image source={require('../Images/avatar-40.png')}
                        style={{ width: 20, height: 20 }} />
                </View>
                <View style={styles.col_80}>
                    <Text style={{ fontSize: 16 }}>{this.props.item.hoTen}</Text>
                </View>
                <View style={styles.col_5}>
                    <TouchableOpacity activeOpacity={0.5}
                        onPress={() => this.CapNhatBacSi()}>
                        <Image source={require('../Images/edit-32.png')}
                            style={styles.img} />
                    </TouchableOpacity>
                </View>
                <View style={styles.col_5}>
                    <TouchableOpacity activeOpacity={0.5}
                        onPress={() => this.XoaBacSi()}>
                        <Image source={require('../Images/trash-32.png')}
                            style={styles.img} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        backgroundColor: 'blue',
        marginBottom: 10,
        flexDirection: 'row',
    },
    img: {
        width: 22,
        height: 22,
        tintColor: '#A7A7A7',
        marginRight: 5,
        justifyContent: 'center',
    },
    container: {
        flexDirection: "row",
        paddingHorizontal: 5,
        marginVertical: 7,
    },
    col_10: {
        flexDirection: 'column',
        width: '10%'
    },
    col_80: {
        flexDirection: 'column',
        width: '80%'
    },
    col_5: {
        flexDirection: 'column',
        width: '5%'
    }
})