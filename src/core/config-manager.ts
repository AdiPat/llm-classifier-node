import os from "os";
import path from "path";
import fs from "fs";

interface TaoConfig {
  configFolder: string;
  modelsFolder: string;
}

class ConfigManager {
  private configFolder: string;
  private modelsFolder: string;

  constructor() {
    const homeDir = os.homedir();

    this.configFolder = path.join(homeDir, ".tao");
    this.modelsFolder = path.join(this.configFolder, "models");
  }

  public getConfig(): TaoConfig {
    return {
      configFolder: this.configFolder,
      modelsFolder: this.modelsFolder,
    };
  }

  public async init(): Promise<void> {
    if (!fs.existsSync(this.configFolder)) {
      fs.mkdirSync(this.configFolder);
    }

    if (!fs.existsSync(this.modelsFolder)) {
      fs.mkdirSync(this.modelsFolder);
    }
  }

  public deleteConfigFolder(): void {
    fs.rmdirSync(this.configFolder, { recursive: true });
    fs.rmdirSync(this.modelsFolder, { recursive: true });
  }
}

const TaoConfig = new ConfigManager();

export { TaoConfig };
