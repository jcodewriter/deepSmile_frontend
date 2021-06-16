const ignores = ['/node_modules/", "/__tests__/helpers/", "/__tests__/utils/'];

module.exports = {
  testMatch: ["**/__tests__/**/*.+(js|jsx)"],
  testPathIgnorePatterns: [...ignores],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleDirectories: ["node_modules", "<rootDir>/node_modules", "."],
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1",
    "tests/(.*)": "<rootDir>/__tests__/$1",
    "^types/(.*)$": "<rootDir>/src/shared/types/$1",
  },
  modulePathIgnorePatterns: [".next/"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
