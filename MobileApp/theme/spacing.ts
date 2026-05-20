export const SPACING = {
    none: 0,

    xxs: 2,
    xs: 4,

    sm: 8,
    md: 12,

    base: 16,
    lg: 20,
    xl: 24,

    "2xl": 32,
    "3xl": 40,
    "4xl": 48,

    "5xl": 56,
    "6xl": 64,

    screenHorizontal: 16,
    screenVertical: 24,

    cardPadding: 16,
    sectionGap: 24,
    itemGap: 12,

    buttonVertical: 14,
    buttonHorizontal: 20,

    inputVertical: 14,
    inputHorizontal: 16,

    headerTop: 60,
    headerBottom: 20,
} as const;

export type SpacingKey = keyof typeof SPACING;