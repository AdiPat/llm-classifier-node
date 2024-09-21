import { Constants } from "./constants";
import { autogenerateId, extractClasses, readCSV } from "./utils";
import { Label, LabelDescription, RowItem } from "../models";

export interface TaoClassifierOptions {
  modelId?: string;
  trainingDatasetPath?: string;
  targetColumn?: string;
  temperature?: number;
  promptSampleSize?: number;
  verbose?: boolean;
}

export class TaoClassifier {
  private modelId: string;
  private prompts: Map<Label, LabelDescription[]>;
  private dataset: RowItem[];
  private temperature: number;
  private promptSampleSize: number;
  private trainingDatasetPath: string;
  private targetColumn: string;
  private verbose: boolean;
  private initialized: boolean;

  constructor(options?: TaoClassifierOptions) {
    options = options || {};

    this.modelId = options.modelId;
    this.prompts = new Map();
    this.dataset = [];
    this.targetColumn = options.targetColumn || "";
    this.temperature =
      options.temperature || Constants.DEFAULT_CLASSIFIER_TEMPERATURE;
    this.promptSampleSize =
      options.promptSampleSize || Constants.DEFAULT_PROMPT_SAMPLE_SIZE;
    this.verbose = options.verbose || false;
    this.trainingDatasetPath = options.trainingDatasetPath || "";

    if (this.verbose) {
      console.log("TaoClassifier initialized with options:", options);
    }

    if (!this.modelId) {
      if (this.verbose) {
        console.log("No modelId provided. Autogenerating.");
      }

      this.modelId = autogenerateId();
    }

    if (this.trainingDatasetPath && !this.targetColumn) {
      throw new Error(
        "TaoClassifier: targetColumn is required for training the model on the dataset."
      );
    }

    // no better way to do this right now
    this.init().then(() => {
      if (this.verbose) {
        console.log("TaoClassifier initialized successfully.");
      }
    });
  }

  // needs to be called after the constructor
  public async init(): Promise<void> {
    try {
      if (this.initialized) {
        if (this.verbose) {
          console.log("TaoClassifier already initialized. Skipping init.");
        }
        return;
      }

      if (this.trainingDatasetPath && this.targetColumn) {
        this.dataset = await readCSV(this.trainingDatasetPath);
        const classes = extractClasses(this.dataset, this.targetColumn);

        classes.forEach((label) => {
          if (!this.prompts.has(label)) {
            this.prompts.set(label, []);
          }
        });
      }
      this.initialized = true;
    } catch (error) {
      console.error("TaoClassifier: Error initializing classifier:", error);
      this.initialized = false;
    }
  }

  private async initPromptsFromDataset(): Promise<void> {
    if (!this.trainingDatasetPath) {
      throw new Error(
        "TaoClassifier: trainingDatasetPath is required to initialize prompts from the dataset."
      );
    }

    if (!this.targetColumn) {
      throw new Error(
        "TaoClassifier: targetColumn is required to initialize prompts from the dataset."
      );
    }

    if (!this.dataset) {
      if (this.verbose) {
        console.log(
          "initPromptsFromDataset: Reading dataset from path:",
          this.trainingDatasetPath
        );
      }

      this.dataset = await readCSV(this.trainingDatasetPath);
    }

    const classes = extractClasses(this.dataset, this.targetColumn);

    if (classes.length === 0 && this.verbose) {
      console.warn("initPromptsFromDataset: No classes found in dataset.");
    }

    classes.forEach((label) => {
      if (!this.prompts.has(label)) {
        this.prompts.set(label, []);
      }
    });
  }

  public isInitialized(): boolean {
    return this.initialized;
  }

  public getModelId(): string {
    return this.modelId;
  }

  public getPrompts(): Map<Label, LabelDescription[]> {
    return this.prompts;
  }
}
