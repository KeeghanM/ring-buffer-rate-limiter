// jest.config.ts
import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/default-esm", // tells ts-jest to handle ESM
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    // this lets you import with ".ts" or without extensions safely
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};

module.exports = config;
