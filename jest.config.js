module.exports = {
  preset: '@react-native/jest-preset',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/ContadorDeTrucoNative/'],
  testPathIgnorePatterns: ['<rootDir>/ContadorDeTrucoNative/'],
};
