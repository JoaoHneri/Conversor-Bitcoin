import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const Home = () => {
  const [cotacaoBit, setCotacaoBit] = useState(0);
  const [quantidadeBit, setQuantidadeBit] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [valorBit, setValorBit] = useState("");
  const valores = [
    { label: "Real", value: "Real" },
    { label: "Dolar", value: "Dolar" },
  ];
  const [ValorConverter, setValorConverter] = useState(0);
  const [Txt, setTxt] = useState("");

  function converter() {
    if (valorBit === "") {
      Toast.show({
        type: "error",
        text1: "Probleminha",
        text2: "Selecione o tipo de moeda para conversão",
      });
      return;
    }
    if (valorBit === "Real") {
      const amountInBRL = parseFloat(cotacaoBit) * parseFloat(quantidadeBit);
      setValorConverter(amountInBRL.toFixed(2));
      setTxt("Reais");
      return;
    } else {
      const amountInUSD =
        (parseFloat(cotacaoBit) * parseFloat(quantidadeBit));
      setValorConverter(amountInUSD.toFixed(2));
      setTxt("Dolares");
    }
  }

  const clearFields = () => {
    setCotacaoBit("");
    setQuantidadeBit("");
  };
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.TextTop}>Conversor De Bitcoins</Text>

      <Text style={styles.TextLabels}>Digite A cotação do Bitcoin</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite a Cotação do Bitcoin"
        keyboardType="numeric"
        onChangeText={setCotacaoBit}
        value={cotacaoBit.toString()}
        type="Numeric"
      />
      <Text style={styles.TextLabels}>
        Digite A quantidade de Bitcoins que você possui
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a quantidade de Bitcoins que você possui"
        keyboardType="numeric"
        onChangeText={setQuantidadeBit}
        value={quantidadeBit.toString()}
        type="Numeric"
      />
      <DropDownPicker
        style={styles.select}
        items={valores}
        open={isOpen}
        setOpen={() => setIsOpen(!isOpen)}
        value={valorBit}
        setValue={(value) => setValorBit(value)}
        maxWidth={10}
        placeholder="Escolha a moeda"
        bottomOffset={100}
      />
      {!isOpen ? (
        <View>
          <View style={styles.spacing}>
            <Button
              style={styles.button}
              onPress={() => {
                converter();
              }}
              title="Calcule"
              color="#28a745"
            />
          </View>
          {ValorConverter !== 0 && (
            <Text style={styles.TextResults}>
              Valor convertido: {ValorConverter} {Txt}
            </Text>
          )}

          {cotacaoBit || quantidadeBit ? (
            <View style={styles.spacing}>
              <Button
                style={styles.button_bottom}
                onPress={() => {
                  clearFields();
                }}
                title="Limpar Campos"
                color="#28a745"
              />
            </View>
          ) : null}
          <Button
            style={styles.button_page}
            onPress={() => {
              navigation.navigate("WebViewPage");
            }}
            title="deseja ver a cotação do bitcoin?"
            color="grey"
          />
        </View>
      ) : null}
      <Toast position="center" bottomOffset={20} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#17a2b8",
    alignItems: "center",
    justifyContent: "center",
  },
  TextTop: {
    fontSize: 35,
    color: "#f8f9fa",
    marginBottom: 20,
  },
  TextLabels: {
    fontSize: 15,
    color: "white",
    marginBottom: 10,
  },
  button: {
    width: 100,
    borderRadius: 10,
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    backgroundColor: "#f8f9fa",
    textAlign: "center",
    height: 50,
    width: 400,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  select: {
    textAlign: "center",
    width: 400,
    left: 5,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
  },
  TextResults: {
    fontSize: 22,
    color: "#f8f9fa",
    marginTop: 15,
    backgroundColor: "grey",
    padding: 15,
    marginBottom: 20,
    margin: 10,
  },
  button_bottom: {
    width: 100,
    borderRadius: 10,
    textAlign: "center",
    marginBottom: 15,
  },
  buttonPage: {
    paddingTop: 20,
  },
  spacing: {
    marginBottom: 20,
  },
});
export default Home;
