import { TaoClassifier } from "../classifier";

describe("TaoClassifier", () => {
  it("initializes successfully", async () => {
    const classifier = new TaoClassifier({
      modelId: "test-model",
      trainingDatasetPath: "datasets/mobile_price_train.csv",
      targetColumn: "price_range",
      verbose: false, // set to true to see logs
    });

    await classifier.init();

    expect(classifier.isInitialized()).toBe(true);
  });
});
