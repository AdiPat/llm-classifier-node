import { TaoConfig } from "../config-manager";

describe("Config Manager", () => {
  it("initializes successfully", async () => {
    try {
      await TaoConfig.init();
    } catch (error) {
      expect(error).toBeNull();
    }
  });
});
