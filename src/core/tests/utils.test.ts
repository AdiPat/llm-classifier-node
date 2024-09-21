import { autogenerateId, extractClasses, readCSV } from "../utils";

describe("Utils", () => {
  it("autogenerates a valid ID", () => {
    const id = autogenerateId();

    expect(id).not.toBeNull();
  });

  it("autogenerates unique IDs", () => {
    const id1 = autogenerateId();
    const id2 = autogenerateId();

    expect(id1).not.toEqual(id2);
  });

  it("reads CSV file from valid path", async () => {
    const filePath = "datasets/mobile_price_test.csv";

    const dataset = await readCSV(filePath);

    expect(dataset).not.toBeNull();
    expect(dataset.length).toBe(1000);
  });

  it("throws error when reading CSV file from invalid path", async () => {
    const filePath = "datasets/invalid.csv";

    try {
      await readCSV(filePath);
    } catch (error) {
      expect(error).not.toBeNull();
    }
  });

  it("extracts classes from dataset", async () => {
    const dataset = await readCSV("datasets/mobile_price_train.csv");

    const classes = extractClasses(dataset, "price_range");

    expect(classes.length).toBe(4);
    expect(classes.includes("0")).toBe(true);
    expect(classes.includes("1")).toBe(true);
    expect(classes.includes("2")).toBe(true);
    expect(classes.includes("3")).toBe(true);
  });
});
