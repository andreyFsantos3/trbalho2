import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function App() {
  // Exemplo de estado para mensagem do dia
  const [mensagem, setMensagem] = useState("Mal posso esperar pelo nosso próximo reencontro! ❤️");

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Seção 1: Header e Contador */}
      <View style={styles.cardHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarEmoji}>👩‍❤️‍👨</Text>
        </View>
        <Text style={styles.titulo}>saudades de vc girassol</Text>
        <Text style={styles.subtitulo}>quero vc</Text>
      </View>

      {/* Seção 2: Contador de Dias */}
      <View style={styles.cardContador}>
        <Text style={styles.cardTitulo}>Próximo Reencontro ✈️</Text>
        <Text style={styles.diasTexto}>15</Text>
        <Text style={styles.diasSubtexto}>dias restantes</Text>
      </View>

      {/* Seção 3: Recado do Dia */}
      <View style={styles.cardMensagem}>
        <Text style={styles.cardTitulo}>Recado Especial 💌</Text>
        <Text style={styles.mensagemTexto}>"{mensagem}"</Text>
      </View>

      {/* Seção 4: Botão de Interação */}
      <TouchableOpacity 
        style={styles.botao}
        onPress={() => alert("Mensagem enviada com sucesso!")}
      >
        <Text style={styles.botaoTexto}>Mandar um "Pensei em você" 💕</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
  },
  content: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFE3E3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarEmoji: {
    fontSize: 40,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#D24E68',
  },
  subtitulo: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  cardContador: {
    width: '100%',
    backgroundColor: '#FF6B81',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  cardMensagem: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFE3E3',
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 8,
  },
  diasTexto: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  diasSubtexto: {
    fontSize: 14,
    color: '#FFE3E3',
    fontWeight: '600',
  },
  mensagemTexto: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#555',
    lineHeight: 22,
  },
  botao: {
    width: '100%',
    backgroundColor: '#D24E68',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});