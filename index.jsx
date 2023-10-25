<div className="flex flex-col items-center justify-center pb-8 page gap-y-3">
<div className="mb-10 flex w-full flex-col justify-start bg-[#4477CE] py-12 pl-12">
  <input
    disabled={fetchForCollection}
    className="font-second my-1.5 h-12  w-[32%] rounded-[12px] border-2 border-blue-700 bg-slate-200 px-2 py-2 pl-4 text-black placeholder-[#727272] focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
    onChange={(e) => {
      setWalletAddress(e.target.value)
    }}
    value={wallet}
    type={'text'}
    placeholder="Add your wallet address"
  ></input>
  <input
    className="font-second my-1.5 h-12  w-[32%] rounded-[12px] border-2 border-blue-700 bg-slate-200 px-2 py-2 pl-4 text-black placeholder-[#727272] focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
    onChange={(e) => {
      setCollectionAddress(e.target.value)
    }}
    value={collection}
    type={'text'}
    placeholder="Add the collection address"
  ></input>
  <label className="mt-3 ml-5 text-black active:ring-2">
    <input
      onChange={(e) => {
        setFetchForCollection(e.target.checked)
      }}
      type={'checkbox'}
      className="mr-2 -mt-1 bg-white rounded-[5px] w-[15px] h-[15px] cursor-pointer"
    ></input>
    Fetch for collection
  </label>
  <button
    className={
      'mt-3 w-[12%] rounded-[9px] ml-[10%] bg-[#A5D7E8] px-4 py-2 text-white disabled:bg-slate-500'
    }
    onClick={() => {
      if (fetchForCollection) {
        fetchNFTsForCollection()
      } else fetchNFTs()
    }}
  >
    Submit
  </button>
</div>
<div class Name="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center maindiv">
  {NFTs &&
    NFTs.map((nft) => {
      return <NFTCard nft={nft}></NFTCard>
    })}
</div>
</div>