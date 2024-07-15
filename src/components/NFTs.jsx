import React, { useEffect, useState } from 'react'
import Cards from './Cards'
import { toast } from 'react-toastify';

function NFTs({ marketplace, setNFTitem }) {
  useEffect(() => {
    document.title = "NFT Museum ETH"
  }, []);

  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const loadMarketplaceItems = async () => {
    try {
      const itemCount = Number(await marketplace.methods.tokensCount().call());
      console.log("count: ", itemCount);
      const tokens = await marketplace.methods.viewTokens().call();
      console.log(tokens);
      let displayItems = []
      for (let i = 0; i < itemCount; i++) {
        const item = tokens[i];
        const hash = item.ipfsHash;
        const res = await fetch(hash)
        const metadata = await res.json()
        displayItems.push({
          owner: metadata.owner,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
        })
      }
      setLoading(false)
      setItems(displayItems)
    } catch (error) {
      console.log(error);
    }

  }

  const buyMarketItem = async (item) => {
    const tx = await (await marketplace.methods.viewitem(item.itemId, { value: 0 }))

    toast.info("Wait till transaction Confirms....", {
      position: "top-center"
    })

    await tx.wait();

    setNFTitem(item)
    item.viewitem = true;
  }

  useEffect(() => {
    loadMarketplaceItems()
  }, [])

  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2 className='text-white font-bold pt-24 text-2xl text-center'>Loading...</h2>
    </main>
  )

  return (
    <div className='flex flex-wrap gradient-bg-welcome   gap-10 justify-center pt-24 pb-5 px-16'>
      {
        (items.length > 0 ?

          items.map((item, idx) => (

            <Cards item={item} setNftItem={setNFTitem} />


          ))

          : (
            <main style={{ padding: "1rem 0" }}>
              <h2 className='text-white'>No listed assets</h2>
            </main>
          ))}
    </div>
  )
}

export default NFTs