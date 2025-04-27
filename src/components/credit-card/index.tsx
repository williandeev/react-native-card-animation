import { View, Text, StyleSheet } from "react-native";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";

export enum CARD_SIDE {
  front = 0,
  back = 1,
}

type CreditCardProps = {
  cardSide: SharedValue<number>;
  data: {
    apelido: string;
    name: string;
    number: string;
    date: string;
    code: string;
  };
};

export function CreditCard({ cardSide, data }: CreditCardProps) {
  const frontAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      cardSide.value,
      [CARD_SIDE.front, CARD_SIDE.back],
      [0, 180]
    );

    return {
      backfaceVisibility: "hidden",
      shadowOpacity: 0,
      transform: [
        { perspective: 900 },
        {
          rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }),
        },
      ],
    };
  });

  const backAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      cardSide.value,
      [CARD_SIDE.front, CARD_SIDE.back],
      [180, 360]
    );

    return {
      backfaceVisibility: "hidden",
      shadowOpacity: 0,
      transform: [
        { perspective: 900 },
        {
          rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }),
        },
      ],
    };
  });

  return (
    <View className="relative h-[200px] w-[345px]">
      <Animated.View
        className="absolute h-[200px] w-[345px] justify-between overflow-hidden rounded-xl border-2 p-6"
        style={[
          frontAnimatedStyles,
          {
            backgroundColor: "rgba(225, 225, 255, 0.6)",
            borderColor: "rgba(225, 225, 255, 0.6)",
          },
        ]}
      >
        <BlurView tint="light" intensity={20} style={StyleSheet.absoluteFill} />

        <View className="flex-row items-center gap-3">
          <View className="h-[24px] w-[24px] rounded-full bg-[#8795A0]" />
          <Text>{data.apelido || "Meu cartão"}</Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-bold">
            {data.name || "Nome igual ao do cartão"}
          </Text>

          <View className="flex-row items-center">{/* Colocar ícone */}</View>
        </View>
      </Animated.View>

      <Animated.View
        className="absolute h-[200px] w-[345px] overflow-hidden rounded-xl"
        style={[
          backAnimatedStyles,
          {
            backgroundColor: "rgba(225, 225, 255, 0.5)",
          },
        ]}
      >
        <View className="mt-4 h-12 bg-black/75" />
        <View className="justify-between px-6 pt-6">
          <View>
            <Text className="text-base text-[#4F5F64]">Número do cartão</Text>
            <Text className="text-lg font-bold">
              {data.number || "0000 0000 0000 0000"}
            </Text>
          </View>

          <View className="mt-2 flex-row justify-between">
            <View>
              <Text className="leading-1 text-base text-[#4F5F64]">
                Validade
              </Text>
              <Text className="text-lg font-bold leading-none">
                {data.date || "00/00"}
              </Text>
            </View>

            <View>
              <Text className="leading-1 text-base text-[#4F5F64]">CVV</Text>
              <Text className="text-lg font-bold leading-none">
                {data.code || "000"}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}
