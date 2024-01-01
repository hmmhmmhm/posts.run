export type SelectableColor =
  | "blue"
  | "black"
  | "pink"
  | "red"
  | "purple"
  | "yellow";

export type SelectableStyle =
  | "Van Gogh"
  | "Keith Haring"
  | "Pablo Picasso"
  | "Yayoi Kusama"
  | "Andy Warhol"
  | "Henri Matisse";

export const modifyColors: {
  name: string;
  value: SelectableColor;
  bgRgba?: string;
}[] = [
  {
    name: "파란색",
    value: "blue",
    bgRgba: "rgba(0,0,255,0.5)",
  },
  {
    name: "검정색",
    value: "black",
    bgRgba: "rgba(0,0,0,0.5)",
  },
  {
    name: "분홍색",
    value: "pink",
    bgRgba: "rgba(255,192,203,0.5)",
  },
  {
    name: "빨간색",
    value: "red",
    bgRgba: "rgba(255,0,0,0.5)",
  },
  {
    name: "보라색",
    value: "purple",
    bgRgba: "rgba(128,0,128,0.5)",
  },
  {
    name: "노란색",
    value: "yellow",
    bgRgba: "rgba(255,255,0,0.5)",
  },
];

export const modifyStyles: {
  name: string;
  value: SelectableStyle;
}[] = [
  {
    name: "반 고흐",
    value: "Van Gogh",
  },
  {
    name: "키스 해링",
    value: "Keith Haring",
  },
  {
    name: "피카소",
    value: "Pablo Picasso",
  },
  {
    name: "구사마 야요이",
    value: "Yayoi Kusama",
  },
  {
    name: "앤디 워홀",
    value: "Andy Warhol",
  },
  {
    name: "앙리 마티스",
    value: "Henri Matisse",
  },
];
