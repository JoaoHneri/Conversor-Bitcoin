import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [cotacaoBit, setCotacaoBit] = useState();
  const [quantidadeBit, setQuantidadeBit] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [valorBit, setValorBit] = useState('');
  const valores = [
    { label: "Real", value: "Real" },
    { label: "Dolar", value: "Dolar" },
  ];
  const [ValorConverter, setValorConverter] = useState(0);
  const [Txt, setTxt] = useState('');

  function converter() {
    if (valorBit === "Real") {
        const amountInBRL = parseFloat(cotacaoBit) * parseFloat(quantidadeBit);
        setValorConverter(amountInBRL.toFixed(2));
            setTxt('Reais');
            
    }else{
        const amountInUSD = parseFloat(cotacaoBit) * parseFloat(quantidadeBit) / 4.84;
        setValorConverter(amountInUSD.toFixed(2));
        setTxt('Dolares')
    }
    }

    const clearFields = () => {
        setCotacaoBit('');
        setQuantidadeBit('');
      };
      const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      <Text>Conversor De Bitcoins</Text>

      <Text>Digite A cotação do Bitcoin</Text>

      <TextInput
        placeholder="Digite a Cotação do Bitcoin"
        keyboardType="numeric"
        onChangeText={setCotacaoBit}
        value={cotacaoBit}
      />
      <Text>Digite A quantidade de Bitcoins que você possui</Text>
      <TextInput
        placeholder="Digite a quantidade de Bitcoins que você possui"
        keyboardType="numeric"
        onChangeText={setQuantidadeBit}
        value={quantidadeBit}
      />
     <DropDownPicker
        items={valores}
        open={isOpen}
        setOpen={() => setIsOpen(!isOpen)}
        value={valorBit}
        setValue={(value) => setValorBit(value)}
        maxHeight={200}
        autoScroll
        placeholder="Escolha a moeda"
      />
      <Button
        onPress={() => {
          converter();
        }}
        title="Calcule"
        color="#28a745"
      />
      {ValorConverter !== 0 && <Text>Valor convertido: {ValorConverter} {Txt}</Text>}
      
     {cotacaoBit || quantidadeBit ?  <Button
        onPress={() => {
          clearFields();
          navigation.navigate('WebViewPage') 
        }}
        title="Limpar Campos"
        color="#28a745"
      />: null}
    </View>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Home;
