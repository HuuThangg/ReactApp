import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import api from '../api.services'

const URL_server = `http://mqsoft.ddns.net:8182/mq`

export default class DanhSachBacSi extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bacsi: []
        }

    }

    componentDidMount() {
        api.get(`${URL_server}/getbacsi`)
            .then(result => {
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
                    <TouchableOpacity activeOpacity={0.5}>
                        <Image source={require('../Images/plus-32.png')}
                            style={[styles.img, { tintColor: 'white', fontSize: 28 }]} />
                    </TouchableOpacity>
                </View>

                {/* this.state.bacsi.map(item => { */}
                <FlatList
                    data={this.state.bacsi}
                    keyExtractor={item => item.ma}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.container}
                                key={item.ma}>
                                <View style={styles.col_10}>
                                    <Image source={require('../Images/avatar-40.png')}
                                        style={{ width: 20, height: 20 }} />
                                </View>
                                <View style={styles.col_80}>
                                    <Text style={{ fontSize: 16 }}>{item.hoTen}</Text>
                                </View>
                                <View style={styles.col_5}>
                                    <TouchableOpacity activeOpacity={0.5}>
                                        <Image source={require('../Images/edit-32.png')}
                                            style={styles.img} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.col_5}>
                                    <TouchableOpacity activeOpacity={0.5}>
                                        <Image source={require('../Images/trash-32.png')}
                                            style={styles.img} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}
                />
                {/* }) */}
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