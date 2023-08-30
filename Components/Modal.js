/* 
import React, { Component } from 'react';
import { Text, TextInput, Dimensions, Platform, View, Button, FlatList } from 'react-native';
import Modal from 'react-native-modalbox';
import api from '../api.services';
const URL_server = `http://mqsoft.ddns.net:6767`
const { width, height } = Dimensions.get('window');
export default class modal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dsKhoa: []
        }
    }
    Mo_Hop_thoai() {
        this.refs.Th_Hop_thoai.open();
    }
    Xu_ly_Them() {
        this.refs.Th_Hop_thoai.close();
    }
    componentDidMount() {
        api.get(`${URL_server}/EmrKhoaphong`)
            .then(result => {
                this.setState({
                    dsKhoa: result
                })
            }).catch(err => {
                console.log(err)
            })
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "gray" }}>
                <View>
                    <Button title='ShowModal' onPress={() => this.Mo_Hop_thoai()} />
                </View>

                <Modal ref={'Th_Hop_thoai'} style={{
                    borderRadius: Platform.OS === 'ios' ? 20 : 6,
                    shadowRadius: 10,
                    width: width - 80,
                    height: '100%'
                }}
                    position='center'
                    backdrop={true}
                    animationType={'none'}
                    transparent={true}
                    backdropColor='black'
                >
                    <View>
                        <Text>sdfsdfsdgs</Text>
                        <FlatList
                            data={this.state.dsKhoa}
                            keyExtractor={(item) => item.makp}
                            renderItem={({ item, index }) => {
                                return (
                                    <View>
                                        <Text>{item.tenkp}</Text>
                                    </View>
                                )
                            }
                            }
                        />
                    </View>
                </Modal>
            </View>
        );
    }
}

*/


