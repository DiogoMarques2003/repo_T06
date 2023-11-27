type FastifyEnvSchemaPropsTypes = 'string' | 'number' | 'boolean';

interface FastifyEnvSchemaProps {
  PORT: { type: FastifyEnvSchemaPropsTypes; default?: number };
  HOST: { type: FastifyEnvSchemaPropsTypes; default?: string };
  JWT: { type: FastifyEnvSchemaPropsTypes; default?: string };
}

interface FastifyEnvSchema {
  type: string;
  required: string[];
  properties: FastifyEnvSchemaProps;
  additionalProperties: boolean;
}
