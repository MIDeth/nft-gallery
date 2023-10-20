import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { NFTCard } from './components/nftCard'

const Home = () => {
  const [wallet, setWalletAddress] = useState('')
  const [collection, setCollectionAddress] = useState('')
  const [NFTs, setNFTs] = useState([])
  const [fetchForCollection, setFetchForCollection] = useState(false)

  const fetchNFTs = async () => {
    let nfts
    console.log('fetching nfts')
    const api_key = 'A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM'
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`

    if (!collection.length) {
      var requestOptions = {
        method: 'GET',
      }

      const fetchURL = `${baseURL}?owner=${wallet}`

      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json())
    } else {
      console.log('fetching nfts for collection owned by address')
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json())
    }

    if (nfts) {
      console.log('nfts:', nfts)
      setNFTs(nfts.ownedNfts)
    }
  }

  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: 'GET',
      }
      const api_key = 'A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM'
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${'true'}`
      const nfts = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      )
      if (nfts) {
        console.log('NFTs in collection:', nfts)
        setNFTs(nfts.nfts)
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col items-center justify-center w-full gap-y-2">
        <input
          disabled={fetchForCollection}
          className="w-2/5 px-2 py-2 text-gray-800 rounded-lg bg-slate-100 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
          onChange={(e) => {
            setWalletAddress(e.target.value)
          }}
          value={wallet}
          type={'text'}
          placeholder="Add your wallet address"
        ></input>
        <input
          className="w-2/5 px-2 py-2 text-gray-800 rounded-lg bg-slate-100 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
          onChange={(e) => {
            setCollectionAddress(e.target.value)
          }}
          value={collection}
          type={'text'}
          placeholder="Add the collection address"
        ></input>
        <label className="text-gray-600 ">
          <input
            onChange={(e) => {
              setFetchForCollection(e.target.checked)
            }}
            type={'checkbox'}
            className="mr-2"
          ></input>
          Fetch for collection
        </label>
        <button
          className={
            'mt-3 w-1/5 rounded-sm bg-blue-400 px-4 py-2 text-white disabled:bg-slate-500'
          }
          onClick={() => {
            if (fetchForCollection) {
              fetchNFTsForCollection()
            } else fetchNFTs()
          }}
        >
          Let's go!{' '}
        </button>
      </div>
      <div className="flex flex-wrap justify-center w-5/6 mt-4 gap-y-12 gap-x-2">
        {NFTs.length &&
          NFTs.map((nft) => {
            return <NFTCard nft={nft}></NFTCard>
          })}
      </div>
    </div>
  )
}

export default Home
