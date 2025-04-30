export default {
    meta: {
      type: "suggestion",
      docs: {
        description: "Draudžia naudoti hardcoded (magiškus) skaičius JSX ir JS kode",
      },
      messages: {
        hardcodedNumber: "Rasta hardcoded reikšmė: {{number}}. Naudokite ją kaip konstantą.",
      },
    },
    create(context) {
      return {
        Literal(node) {
          if (
            typeof node.value === "number" &&
            node.value !== 0 &&
            !["test", "spec"].some((f) => context.getFilename().includes(f))
          ) {
            context.report({
              node,
              messageId: "hardcodedNumber",
              data: { number: node.value },
            });
          }
        },
      };
    },
  };
  