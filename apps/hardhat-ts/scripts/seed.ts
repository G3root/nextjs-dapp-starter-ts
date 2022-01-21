import { getUnnamedAccounts, ethers } from "hardhat";

const messages = [
  "Hello",
  "你好",
  "سلام",
  "здравствуйте",
  "Habari",
  "Bonjour",
  "नमस्ते",
];

async function main() {
  const others = await getUnnamedAccounts();
  for (let i = 0; i < messages.length; i++) {
    const sender = others[i];
    if (sender) {
      const greetingsRegistryContract = await ethers.getContract(
        "GreetingsRegistry",
        sender
      );
      const tx = await greetingsRegistryContract.setMessage(messages[i]);
      console.log(tx.hash);
      await tx.wait();
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
