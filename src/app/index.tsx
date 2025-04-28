import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Input } from "@/components/input";
import { useState } from "react";
import { CARD_SIDE, CreditCard } from "@/components/credit-card";
import { useSharedValue } from "react-native-reanimated";
import { ArrowLeftRight } from "lucide-react-native";

export default function NewCreditCard() {
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
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View className="flex-1 gap-6 px-6 justify-center">
        <View className="items-center justify-center gap-2 mb-4">
          <CreditCard
            cardSide={cardSide}
            data={{
              name,
              number,
              date,
              code,
            }}
          />

          <TouchableOpacity
            onPress={handleFlipCard}
            className="mt-4 flex-row items-center gap-3"
          >
            <Text className="text-white font-semibold">Virar cartão</Text>
            <ArrowLeftRight color={"#fff"} size={19} />
          </TouchableOpacity>
        </View>

        <Input
          placeholder="Nome do Titular"
          onFocus={showFrontCard}
          onChangeText={setName}
        />

        <Input
          placeholder="Número do Cartão"
          keyboardType="numeric"
          maxLength={16}
          onFocus={showBackCard}
          onChangeText={setNumber}
        />

        <View className="flex-row gap-4">
          <Input
            placeholder="MM/AA"
            keyboardType="numeric"
            maxLength={5}
            style={{ width: 74 }}
            onFocus={showBackCard}
            onChangeText={setDate}
          />

          <Input
            placeholder="CVV"
            keyboardType="numeric"
            maxLength={3}
            style={{ width: 74 }}
            onFocus={showBackCard}
            onChangeText={setCode}
          />
        </View>
      </View>
    </ScrollView>
  );
}
