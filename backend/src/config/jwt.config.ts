export const jwtConfig = () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '7d',
  },
});
