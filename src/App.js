import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Home from './components/Home';
import NFTs from './components/NFTs';
import { marketplace_abi } from "./Abi.js"
import Create from './components/Create';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import 'react-toastify/dist/ReactToastify.css';
import Info from './components/Info.jsx';

import { createWeb3Modal, defaultConfig, useWeb3ModalAccount, useSwitchNetwork } from '@web3modal/ethers5/react'
import contractData from './contract.json'
import Web3 from 'web3';

const projectId = '0218020fa3167daaf35f0cba433d97d4'
const alfajores = {
  chainId: 44787,
  name: 'Alfajores',
  currency: 'CELO',
  explorerUrl: 'https://explorer.celo.org/alfajores',
  rpcUrl: 'https://alfajores-forno.celo-testnet.org'
}
const metadata = {
  name: 'My Celo App',
  description: 'My Website description',
  url: 'https://mywebsite.com',
  icons: ['https://avatars.mywebsite.com/']
}
createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [alfajores],
  defaultChain: alfajores,
  projectId
})
const chainId = 44787

function ConnectButton() {
  console.log("inside connect button");
  const { switchNetwork } = useSwitchNetwork()
  switchNetwork(chainId)
}

function App() {

  const [loading, setLoading] = useState(true);
  const [marketplace, setMarketplace] = useState({});
  const [nftitem, setNFTitem] = useState({})
  const { address, isConnected } = useWeb3ModalAccount()
  // const address1 = "0x5DBDB8C0e459a86fb0dF9Db78e090eE9c7b48F25"
  useEffect(() => {
    console.log("inside useffect");
    ConnectButton();
    const provider = new Web3(window.ethereum)
    const marketplacecontract = new provider.eth.Contract(contractData.abi, contractData.address)
    setMarketplace(marketplacecontract)
    console.log("contract: ", marketplace);
  }, []);




  return (
    <BrowserRouter>
      <ToastContainer />
      <div className="App min-h-screen">
        {console.log("isconnected: ", isConnected)}
        {console.log("address: ", address)}
        {isConnected ? (
          <div className='gradient-bg-welcome h-screen w-screen'>
            <Nav account={address} />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/all-nft" element={<NFTs marketplace={marketplace} setNFTitem={setNFTitem} />}></Route>
              <Route path="/create" element={<Create marketplace={marketplace} account={address} />}></Route>
              <Route path="/info" element={<Info nftitem={nftitem} />}></Route>
            </Routes>
          </div>
        ) : <div className="flex justify-center items-center h-screen w-screen">
          <w3m-button />
        </div>}
      </div>

    </BrowserRouter>
  );
}

export default App;
