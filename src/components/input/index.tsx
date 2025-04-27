import { TextInput, TextInputProps } from "react-native";

export function Input({ style, ...rest }: TextInputProps) {
  return <TextInput className="bg-[#E4ECF3] h-14 rounded-lg px-4" {...rest} />;
}
