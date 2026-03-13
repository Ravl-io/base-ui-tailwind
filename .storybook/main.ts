import { mergeConfig } from "vite";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: "@storybook/react-vite",
  viteFinal: async (storybookConfig) => {
    const { default: rootConfig } = await import("../vite.config.ts");

    return mergeConfig(storybookConfig, {
      resolve: {
        alias: {
          ...rootConfig.resolve?.alias,
          "@sb": fileURLToPath(new URL(".", import.meta.url)),
        },
      },
      build: rootConfig.build,
    });
  },
};

export default config;