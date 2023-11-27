import { FastifyInstance } from 'fastify';
import { readdirSync } from 'fs';
import { resolve } from 'path';

import { DecoratersInterface } from 'src/@types/DecoratersInterface';

class RegisterDecoraters {
  private readonly server: FastifyInstance;

  private readonly decoratersDir: string;

  private readonly decoratersData: DecoratersInterface;

  private counter = 0;

  constructor(server: FastifyInstance) {
    this.server = server;
    this.decoratersDir = resolve(__dirname, '..', 'decoraters');
    this.decoratersData = {
      server,
    };
  }

  async handle(): Promise<void> {
    const decoratersFiles = readdirSync(this.decoratersDir);

    if (!decoratersFiles || decoratersFiles.length <= 0) return;

    for (let i = 0; i <= decoratersFiles.length; i++) {
      const decoraterFile = decoratersFiles[i];
      if (!decoraterFile) continue;

      const decorator = (await import(`${this.decoratersDir}/${decoraterFile}`)) as DecoratersFuncion;
      if (!decorator) continue;

      decorator.default(this.decoratersData);

      this.counter++;
    }

    this.server.log.info(`[RegisterDecoraters] ${this.counter} decoraters registados`);
  }
}

export default RegisterDecoraters;