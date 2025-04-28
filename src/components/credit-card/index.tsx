import { View, Text, StyleSheet, Image } from "react-native";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import {
  Gesture,
  GestureDetector,
  Directions,
} from "react-native-gesture-handler";
import { getCardFlag } from "@/utils/getCardFlag";

export enum CARD_SIDE {
  front = 0,
  back = 1,
}

type CreditCardProps = {
  cardSide: SharedValue<number>;
  data: {
    name: string;
    number: string;
    date: string;
    code: string;
  };
};

export function CreditCard({ cardSide, data }: CreditCardProps) {
  const flag = getCardFlag(data.number);

  const cardColors = {
    visa: "rgba(26, 31, 113, 0.3)",
    mastercard: "rgba(235, 0, 27, 0.3)",
    amex: "rgba(78, 155, 110, 0.3)",
    elo: "rgba(0, 114, 187, 0.3)",
    diners: "rgba(255, 114, 0, 0.3)",
    discover: "rgba(255, 111, 50, 0.3)",
    jcb: "rgba(43, 97, 167, 0.3)",
    unknown: "rgba(211, 211, 211, 0.3)",
  };

  const cardColor = cardColors[flag] || cardColors.unknown;

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

  const flingRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onStart(() => {
      cardSide.value = CARD_SIDE.back;
    });

  const flingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onStart(() => {
      cardSide.value = CARD_SIDE.front;
    });

  const gesture = Gesture.Simultaneous(flingLeft, flingRight);

  return (
    <GestureDetector gesture={gesture}>
      <View className="relative h-[200px] w-[345px]">
        <Animated.View
          className="absolute h-[200px] w-[345px] justify-between overflow-hidden rounded-xl border-2 p-6"
          style={[
            frontAnimatedStyles,
            {
              backgroundColor: cardColor,
              borderColor: cardColor,
            },
          ]}
        >
          <BlurView
            tint="light"
            intensity={20}
            style={StyleSheet.absoluteFill}
          />

          <View className="flex-row items-center gap-3">
            <View className="h-[24px] w-[24px] rounded-full bg-[#8795A0]" />
            <Text className="text-white shadow">Meu cartão</Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-bold text-white shadow">
              {data.name || "Nome igual ao do cartão"}
            </Text>

            <View className="flex-row items-center">
              {flag !== "unknown" && (
                <Image
                  source={
                    flag === "visa"
                      ? require("@/assets/visa.png")
                      : flag === "mastercard"
                      ? require("@/assets/mastercard.png")
                      : flag === "amex"
                      ? require("@/assets/amex.png")
                      : flag === "elo"
                      ? require("@/assets/elo.png")
                      : flag === "diners"
                      ? require("@/assets/diners.png")
                      : flag === "discover"
                      ? require("@/assets/discover.png")
                      : flag === "jcb"
                      ? require("@/assets/jcb.png")
                      : null
                  }
                  className="w-14 h-8"
                  resizeMode="contain"
                />
              )}
            </View>
          </View>
        </Animated.View>

        <Animated.View
          className="absolute h-[200px] w-[345px] overflow-hidden rounded-xl"
          style={[
            backAnimatedStyles,
            {
              backgroundColor: cardColor,
            },
          ]}
        >
          <View className="mt-4 h-12 bg-black/75" />
          <View className="justify-between px-6 pt-6">
            <View>
              <Text className="text-base text-white shadow">
                Número do cartão
              </Text>
              <Text className="text-lg font-bold text-white shadow">
                {data.number || "0000 0000 0000 0000"}
              </Text>
            </View>

            <View className="mt-2 flex-row justify-between">
              <View>
                <Text className="leading-1 text-base text-white shadow">
                  Validade
                </Text>
                <Text className="text-lg font-bold leading-none text-white shadow">
                  {data.date || "00/00"}
                </Text>
              </View>

              <View>
                <Text className="leading-1 text-base text-white shadow">
                  CVV
                </Text>
                <Text className="text-lg font-bold leading-none text-white shadow">
                  {data.code || "000"}
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </View>
    </GestureDetector>
  );
}
