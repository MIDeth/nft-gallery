import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { NFTCard } from "../components/nftCard";

const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);

  const fetchNFTs = async () => {
    let nfts;
    console.log("fetching nfts");
    const api_key = "A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM";
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;

    if (!collection.length) {
      var requestOptions = {
        method: "GET",
      };

      const fetchURL = `${baseURL}?owner=${wallet}`;

      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    } else {
      console.log("fetching nfts for collection owned by address");
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    }

    if (nfts) {
      console.log("nfts:", nfts);
      setNFTs(nfts.ownedNfts);
    }
  };

  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: "GET",
      };
      const api_key = "A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM";
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      );
      if (nfts) {
        console.log("NFTs in collection:", nfts);
        setNFTs(nfts.nfts);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pb-8 ">
      <Head>
        <title>MID NFTs gallery</title>
        <link rel="icon" type="image/x-icon" href="./favicon.ico" />
      </Head>
      <div className="mb-10 flex w-full flex-col justify-start bg-[#4477CE] md:py-12 py-0 pl-12 relative">
        <div className="flex flex-col justify-start">
          <input
            disabled={fetchForCollection}
            className="font-second my-1.5 h-12  w-[70%] rounded-[12px] border-2 md:w-[32%] md border-blue-700 bg-slate-200 px-2 py-2 pl-4 text-black placeholder-[#727272] focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
            onChange={(e) => {
              setWalletAddress(e.target.value);
            }}
            value={wallet}
            type={"text"}
            placeholder="Add your wallet address"
          ></input>
          <input
            className="font-second my-1.5 h-12  w-[70%] rounded-[12px] border-2 md:w-[32%] md border-blue-700 bg-slate-200 px-2 py-2 pl-4 text-black placeholder-[#727272] focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
            onChange={(e) => {
              setCollectionAddress(e.target.value);
            }}
            value={collection}
            type={"text"}
            placeholder="Add the collection address"
          ></input>
          <label className="mt-3 ml-5 text-black active:ring-2">
            <input
              onChange={(e) => {
                setFetchForCollection(e.target.checked);
              }}
              type={"checkbox"}
              className="mr-2 -mt-1 bg-white rounded-[5px] w-[15px] h-[15px] cursor-pointer"
            ></input>
            Fetch for collection
          </label>
          <button
            className={
              "mt-3 md:w-[12%] w-[50%] rounded-[9px] ml-[10%] bg-[#A5D7E8] px-4 py-2 text-white disabled:bg-slate-500"
            }
            onClick={() => {
              if (fetchForCollection) {
                fetchNFTsForCollection();
              } else fetchNFTs();
            }}
          >
            Submit
          </button>
        </div>
        <div className="md:absolute md:right-20 block md:mt-0 mt-10">
          <img src="/logo.svg" className=" md:h-64 h-28 " />
        </div>
      </div>
      <div className="flex flex-wrap justify-center md:justify-between w-full mt-4">
        {NFTs.length &&
          NFTs.map((nft) => {
            return <NFTCard nft={nft}></NFTCard>;
          })}
      </div>
    </div>
  );
};

export default Home;
