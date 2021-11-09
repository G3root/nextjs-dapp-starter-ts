import type { NextPage } from "next";
import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { Storage__factory } from "@/typechain";
import { Button, Box, Text, Container, Input } from "@/components/primitives";
import { hasEthereum } from "@/utils";
import Head from "next/head";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const Home: NextPage = () => {
  const [currentStore, setCurrentStore] = useState("");
  const [inputState, setInputState] = useState("");
  const [status, setStatus] = useState<"loading..." | "complete">("complete");
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const setStore = async () => {
    if (hasEthereum()) {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const storageContract = Storage__factory.connect(contractAddress, signer);
      const tx = await storageContract.set(inputState);
      setStatus("loading...");
      const receipt = await tx.wait();
      if (receipt.status === 1) {
        setCurrentStore(inputState);
        setInputState("");
      }
      setStatus("complete");
    }
  };
  async function fetchStore() {
    if (hasEthereum()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const storageContract = Storage__factory.connect(
        contractAddress,
        provider
      );
      try {
        const data = await storageContract.retrieve();
        setCurrentStore(data);
      } catch (err) {
        console.log("EfetchStorerror: ", err);
      }
    }
  }
  const memoizedFetchStore = useCallback(async () => {
    let response = await fetchStore();
  }, []);

  useEffect(() => {
    memoizedFetchStore();
  }, [memoizedFetchStore]);

  return (
    <Box
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10rem",
      }}
    >
      <Head>
        <title>Solidity Full-Stack Dapp Starter</title>
      </Head>
      <Container size={{ "@initial": "1", "@bp1": "2" }}>
        <Text as="h1">Solidity Full-Stack Dapp Starter</Text>
        <Box css={{ textAlign: "center" }}>
          <Text>Store Value : {currentStore} </Text>
          <Text>transaction status : {status} </Text>
          <Box
            as="label"
            css={{
              position: "absolute",
              width: "1px",
              height: "1px",
              padding: 0,
              margin: "-1px",
              overflow: "hidden",
              clip: "rect(0, 0, 0, 0)",
              whiteSpace: "nowrap",
              borderWidth: 0,
            }}
            htmlFor="store-input"
          >
            Input text
          </Box>
          <Input
            id="store-input"
            name="store-input"
            value={inputState}
            type="text"
            onChange={(e) => setInputState(e.target.value)}
          />
          <Box css={{ marginTop: "$2" }}>
            <Button type="button" onClick={setStore} color="purple">
              Set new value to store
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
