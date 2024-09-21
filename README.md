# LLM Classifier (Node)

# Introduction

This project is inspired by [lamini-ai/llm-classifier](https://github.com/lamini-ai/llm-classifier). I wanted an LLM-classifier with a similar interface and larger support for LLMs in Go.

This is a reusable LLM Classifier module designed to perform classification tasks using large language models (LLMs). The module is lightweight, highly efficient, and can be easily integrated into any application.

I forsee uses for this in cases where training an ML model for classification is not possible because of lack of data, expertise, costs, or no resources. Good for general-purpose and ambiguous classification tasks where training data is unavailable. Prompts in, structured data out.

[I first wrote this in Go and then decided to support Node JS and other platforms.](https://www.github/com/AdiPat/llm-classifier-go)

**NOTE:** This project is work-in-progress and is under active development.

# Features

1. **LLM Integration:** Supports the use of various large language models.
2. **Reusable and Modular:** Can be easily plugged into any Go application with minimal configuration.
3. **Customizable:** Supports customization of classification models to do specific tasks.
4. **Scalable:** Designed to handle both small and large datasets with high throughput.
5. **Natural Language Training:** Train your classifier with natural language prompts which is useful incase training data is unavailable or complex human reasoning is required for classification.

# Examples

The examples are given within `examples/`. If you want to run a particular example, uncomment it in `index.ts` and run the example using:

```bash
npm run build
node dist/examples/index.js
```

# Run Tests

```bash
npm run test
```

# Contribution

Contributors are welcome. Reach out to me at my [work email](mailto:contact.adityapatange@gmail.com). Alternatively, feel free to fork the repo, make your changes and submit a PR.
