import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View, Button, FlatList } from 'react-native';
import { styles } from './styles';
import { router } from 'expo-router';

import { useAppDispatch } from '../store/store'; 
import { selectDog } from '../store/slices/counter'; 

export interface iList {
    image: string[];
    id: number;
    name: string;
    description: string;
    years: number;
    contact: string;
    address: string;
    gender: any;
    size: any;
}

export const Home = () => {
    const [valueApi, setValueApi] = useState<iList[]>([])
    const [match, setMatch] = useState<iList[]>([])
    const [showMatchs, setShowMatchs] = useState(false)

    const dispatch = useAppDispatch();

    const requestAPI = async () => {
        await axios.get("http://localhost:3000/dogs/getAllDogs").then((resp) => {
            setValueApi(resp.data)
        })
    }

    useEffect(() => {
        requestAPI()
    }, [])

    const handlePressNo = () =>  {
        setValueApi((prevState) => prevState.slice(1) )
    }

    const handlePressYes = () =>  {
        setMatch((prevState) => [...prevState, valueApi[0]] )
        setValueApi((prevState) => prevState.slice(1) )
    }

    const handleViewDetails = () => {
        if (valueApi.length > 0) {
            // 1. Salva o cachorro atual na Store do Redux
            dispatch(selectDog(valueApi[0]));
            // 2. Navega para a tela de detalhes
            router.navigate('/details');
        }
    }

    return (
        <View style={styles.container}>
            {
                showMatchs ? 
                    <>
                        <FlatList
                            data={match}
                            renderItem={({item}) => {
                                return(
                                    <Image
                                        source={{uri: item?.image[0]}}
                                        style={{
                                            height:200,
                                            width:200
                                        }}
                                        resizeMode='contain'
                                    />
                                )
                            }}
                            />
                    </>
                    :
                    <>
            <TouchableOpacity onPress={handleViewDetails} style={styles.content}>
                <Image
                    source={{uri: valueApi[0]?.image[0] }}
                    style={{
                        height: '90%',
                        width: '90%'
                    }}
                />
            </TouchableOpacity>
        
            <View style={styles.contentButtons}>
                <TouchableOpacity onPress={handlePressNo} style={styles.buttonNo}>
                    <AntDesign name="close" size={32} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity onPress={handlePressYes} style={styles.buttonYes}>
                    <AntDesign name="heart" size={32} color="#fff" />
                </TouchableOpacity>
            </View>
                </>
            }

            <Button
                title={!showMatchs?'Ver Matchs': 'Dar likes'}
                onPress={() => setShowMatchs(!showMatchs)}
            />

        </View>
    )
}