import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { useAppSelector } from '../store/store';

export const Details = () => {
  const currentDog = useAppSelector((state) => state.currentDog.currentDog);

  if (!currentDog) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Nenhum cachorro selecionado!</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      <Image 
        source={{ uri: currentDog.image[0] }} 
        style={styles.image} 
        resizeMode="cover"
      />

      <View style={styles.infoContainer}>

        <View style={styles.card}>
            <Text style={styles.label}>Nome</Text>
            <Text style={styles.text}>{currentDog.name}</Text>
        </View>

        <View style={styles.card}>
            <Text style={styles.label}>Tamanho</Text>
            <Text style={styles.text}>{currentDog.size}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Descrição</Text>
          <Text style={styles.text}>{currentDog.description}</Text>
        </View>

        <View style={styles.card}>
            <Text style={styles.label}>Idade</Text>
            <Text style={styles.text}>{currentDog.years}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Endereço</Text>
          <Text style={styles.text}>{currentDog.address}</Text>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '90%',
    width: '80%',
    backgroundColor: '#FFA500',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginTop: 100,
  },
  backText: {
    fontSize: 16,
    color: 'blue',
    marginTop: 20,
  },
  image: {
    width: '30%',
    height: '60%',
    borderRadius: '50%'
  },
  infoContainer: {
    width: '90%',
    marginTop: 20,
    
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  badge: {
    backgroundColor: '#ff4757',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 12,
    color: '#888',
    fontWeight: 'bold',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  text: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    marginTop: 'auto', 
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});