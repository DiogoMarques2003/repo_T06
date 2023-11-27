type DecodedJWTToken = {
  header: {
    alg: string;
    typ: string;
  };
  payload: {
    id: string;
    iat: number;
  };
  signature: string;
  input: string;
};
