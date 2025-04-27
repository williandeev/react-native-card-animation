import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Input } from "@/components/input";
import { useState } from "react";
import { CARD_SIDE, CreditCard } from "@/components/credit-card";
import { useSharedValue } from "react-native-reanimated";
import { ArrowLeftRight } from "lucide-react-native";

export default function NewCreditCard() {
  const [loading, setLoading] = useState(false);
  const [apelido, setApelido] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [code, setCode] = useState("");

  const cardSide = useSharedValue(CARD_SIDE.front);

  function handleFlipCard() {
    if (cardSide.value === CARD_SIDE.front) {
      showBackCard();
    } else {
      showFrontCard();
    }
  }

  function showFrontCard() {
    cardSide.value = CARD_SIDE.front;
  }

  function showBackCard() {
    cardSide.value = CARD_SIDE.back;
  }

  return (
    <View className="flex-1 gap-6 px-6">
      <Text className="mt-5 text-xs uppercase">NOVO CARTÃO DE CRÉDITO</Text>

      <View className="items-center justify-center gap-2">
        <CreditCard
          cardSide={cardSide}
          data={{
            apelido,
            name,
            number,
            date,
            code,
          }}
        />

        <TouchableOpacity style={styles.button} onPress={handleFlipCard}>
          <Text>
            Virar cartão
            <ArrowLeftRight />
          </Text>
        </TouchableOpacity>
      </View>

      <Input
        placeholder="Nome do titular"
        onFocus={showFrontCard}
        onChangeText={setName}
      />

      <Input
        placeholder="Número do cartão"
        keyboardType="numeric"
        maxLength={16}
        onFocus={showBackCard}
        onChangeText={setNumber}
      />

      <View style={styles.inputInLine}>
        <Input
          placeholder="01/02"
          keyboardType="numeric"
          maxLength={5}
          style={styles.inputSmall}
          onFocus={showBackCard}
          onChangeText={setDate}
        />

        <Input
          placeholder="123"
          keyboardType="numeric"
          maxLength={3}
          style={styles.inputSmall}
          onFocus={showBackCard}
          onChangeText={setCode}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    marginTop: 62,
  },
  button: {
    alignItems: "center",
    marginVertical: 32,
  },
  form: {
    gap: 12,
  },
  inputInLine: {
    flexDirection: "row",
    gap: 12,
  },
  inputSmall: {
    width: 74,
  },
});
